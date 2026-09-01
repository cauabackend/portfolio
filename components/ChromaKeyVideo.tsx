"use client";

import { useEffect, useMemo, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

// Chroma key em tempo real, num shader.
//
// Por que no shader e não no arquivo: um WebM com alpha assado seria mais
// simples de usar, mas Safari e iOS não tocam WebM com canal alpha — o formato
// que eles aceitam (HEVC com alpha) só se codifica no macOS. Fazendo o key aqui,
// o arquivo continua um MP4 H.264 comum, que toca em todo lugar, E o vídeo não
// passa por recompressão nenhuma: a qualidade é a do arquivo original.
//
// A distância é medida no espaço de CROMA (Cb/Cr), não em RGB. Em RGB, uma
// sombra sobre o fundo verde fica "longe" do verde puro só porque escureceu, e
// sobra sujeira; separando a luminância, o key pega o verde claro e o escuro
// pelo mesmo limiar. É a mesma matemática do filtro chromakey do ffmpeg.
const FRAGMENT = /* glsl */ `
  uniform sampler2D map;
  uniform float similarity;
  uniform float smoothness;
  uniform float spill;
  varying vec2 vUv;

  vec2 chroma(vec3 c) {
    return vec2(
      -0.168736 * c.r - 0.331264 * c.g + 0.5 * c.b,
       0.5 * c.r - 0.418688 * c.g - 0.081312 * c.b
    );
  }

  // A cor do fundo sai do PRÓPRIO frame, e não de um uniform vindo de fora.
  // Passar a cor por fora obriga os dois lados a estarem no mesmo espaço de cor,
  // e qualquer conversão que o three aplique na amostragem (sRGB→linear) quebra
  // a comparação em silêncio — o key simplesmente para de casar. Amostrando os
  // quatro cantos, referência e pixel vêm sempre da mesma imagem, no mesmo
  // espaço, e o filtro fica imune a isso. Os cantos são fundo por construção.
  vec3 sampleKey() {
    return 0.25 * (
      texture2D(map, vec2(0.01, 0.01)).rgb +
      texture2D(map, vec2(0.99, 0.01)).rgb +
      texture2D(map, vec2(0.01, 0.99)).rgb +
      texture2D(map, vec2(0.99, 0.99)).rgb
    );
  }

  void main() {
    vec4 texel = texture2D(map, vUv);
    float dist = distance(chroma(texel.rgb), chroma(sampleKey()));
    float alpha = smoothstep(similarity, similarity + smoothness, dist);

    // Despill: a borda de um objeto sobre fundo verde recebe verde refletido, e
    // o key sozinho não tira isso — sem despill sobra um contorno esverdeado.
    // Onde o verde supera os outros canais, puxa o pixel para o cinza de mesma
    // luminância.
    float excess = texel.g - max(texel.r, texel.b);
    if (excess > 0.0) {
      float luma = dot(texel.rgb, vec3(0.299, 0.587, 0.114));
      texel.rgb = mix(texel.rgb, vec3(luma), clamp(excess * spill, 0.0, 1.0));
    }

    if (alpha < 0.004) discard; // pixel totalmente vazado não escreve nada
    gl_FragColor = vec4(texel.rgb, alpha);
  }
`;

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export type ChromaKeyOptions = {
  /** distância de croma a partir da qual o pixel começa a aparecer */
  similarity: number;
  /** largura da transição — 0 dá borda serrilhada */
  smoothness: number;
  /** força da remoção do verde refletido na borda */
  spill: number;
};

/**
 * Plano com o vídeo, já sem o fundo. Dimensiona-se pela ALTURA disponível e
 * mantém a proporção real do arquivo (lida do próprio elemento de vídeo, não
 * chutada), então a figura nunca distorce.
 */
export function ChromaKeyVideo({
  src,
  options,
  fit,
  playing = true,
}: {
  src: string;
  options: ChromaKeyOptions;
  /** altura do plano em unidades do mundo */
  fit: number;
  /** false pausa a decodificação — vídeo 2K rodando fora da tela pesa na rolagem */
  playing?: boolean;
}) {
  const [aspect, setAspect] = useState(1);
  const maxAnisotropy = useThree((s) => s.gl.capabilities.getMaxAnisotropy());

  const video = useMemo(() => {
    const el = document.createElement("video");
    // sem `src` aqui: o arquivo é buscado uma vez e tocado de um blob (abaixo)
    el.loop = true;
    el.muted = true; // autoplay só é permitido sem áudio
    el.playsInline = true;
    el.crossOrigin = "anonymous";
    el.preload = "auto";
    // O elemento PRECISA estar no documento. Fora dele, o Chrome trata o vídeo
    // como invisível e suspende a decodificação — o loop trava e a figura some
    // por alguns segundos a cada volta. E não pode ser `display:none` nem
    // `visibility:hidden`, que disparam a mesma suspensão: fica 1px, opaco 0,
    // fora do fluxo e sem captar ponteiro.
    el.style.cssText =
      "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;";
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
    return el;
    // sem `src`: o elemento não muda quando a fonte muda — quem aplica o
    // src é o efeito do blob, mais abaixo
  }, []);

  const texture = useMemo(() => {
    const t = new THREE.VideoTexture(video);
    // NoColorSpace, e NÃO SRGBColorSpace: passthrough puro.
    //
    // Com SRGBColorSpace o three converte sRGB→linear ao amostrar, mas um
    // ShaderMaterial sem `#include <colorspace_fragment>` escreve o valor cru no
    // framebuffer — sem a volta pra sRGB a imagem clareia e estoura. Pior: o
    // key passaria a comparar valores lineares com uma cor medida em sRGB, e as
    // distâncias sairiam todas erradas.
    //
    // Sem conversão em ponta nenhuma, o pixel exibido é exatamente o pixel do
    // arquivo, e o shader compara no mesmo espaço em que a cor foi amostrada.
    t.colorSpace = THREE.NoColorSpace;

    // Mipmaps LIGADOS, apesar de a fonte mudar a cada frame. O padrão de
    // VideoTexture é desligado (regenerar mipmap por frame custa), mas aqui a
    // imagem é reduzida de 2048px de altura para ~600 na tela: sem mipmap, cada
    // pixel da tela amostra UM texel isolado no meio de 3, e o resultado
    // cintila e "mostra os pixels". Trilinear + anisotropia resolve isso — é o
    // custo certo a pagar, porque nenhuma taxa de bits conserta aliasing.
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.anisotropy = maxAnisotropy;
    return t;
  }, [video, maxAnisotropy]);

  // useMemo, e não useRef: o valor é lido durante o render (vai como prop do
  // material), e ler `ref.current` no render é leitura de estado mutável fora
  // do fluxo do React.
  const uniforms = useMemo(
    () => ({
      map: { value: texture },
      similarity: { value: options.similarity },
      smoothness: { value: options.smoothness },
      spill: { value: options.spill },
    }),
    // de propósito só `texture`: os parâmetros entram pelo efeito abaixo, senão
    // cada ajuste recompilaria o shader
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [texture],
  );

  // Mudança de parâmetro não recria o material: só escreve no uniform.
  // three é imperativo — o uniform só existe como objeto mutável.
  /* eslint-disable react-hooks/immutability */
  useEffect(() => {
    uniforms.similarity.value = options.similarity;
    uniforms.smoothness.value = options.smoothness;
    uniforms.spill.value = options.spill;
  }, [options, uniforms]);
  /* eslint-enable react-hooks/immutability */

  useEffect(() => {
    const onMeta = () => {
      if (video.videoWidth > 0) setAspect(video.videoWidth / video.videoHeight);
    };
    video.addEventListener("loadedmetadata", onMeta);

    // O arquivo é baixado UMA vez e tocado a partir de um blob em memória.
    //
    // Apontar o <video> direto para a URL parece equivalente, mas não é: ao
    // chegar no fim, o browser já descartou o buffer que reproduziu e a volta
    // ao início dispara nova busca na rede. Medido: o readyState cai de 4
    // (HAVE_ENOUGH_DATA) para 1 (HAVE_METADATA) na virada, e a figura some
    // até rebufferizar. Com o blob, o loop é local — não há rede envolvida, e
    // a emenda fica contínua.
    let objectUrl: string | undefined;
    let cancelled = false;
    const controller = new AbortController();

    fetch(src, { signal: controller.signal })
      .then((r) => r.blob())
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
        // play() rejeita se a política de autoplay barrar; o vídeo é
        // decorativo, então o catch silencioso basta — a seção segue de pé.
        return video.play().catch(() => {});
      })
      .catch(() => {}); // rede falhou: a seção fica sem a peça, sem quebrar

    return () => {
      cancelled = true;
      controller.abort();
      video.removeEventListener("loadedmetadata", onMeta);
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.remove();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      texture.dispose();
    };
  }, [video, texture, src]);

  // Pausa/retoma conforme a seção entra e sai da tela. Pausar mantém o
  // currentTime, então ao voltar a animação continua de onde parou — não
  // reinicia nem recarrega.
  useEffect(() => {
    if (playing) video.play().catch(() => {});
    else video.pause();
  }, [playing, video]);

  return (
    <mesh>
      <planeGeometry args={[fit * aspect, fit]} />
      <shaderMaterial
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
