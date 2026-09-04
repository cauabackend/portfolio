"use client";

import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ChromaKeyVideo, type ChromaKeyOptions } from "./ChromaKeyVideo";

// Mesmo shader da peça da Experiência (ver ChromaKeyVideo): o key roda em tempo
// real porque WebM com alpha não toca em Safari/iOS — assim o arquivo continua
// um MP4 H.264 comum e o vídeo não sofre recompressão extra.
//
// Fundo deste arquivo: verde chroma saturado, medido em rgb(42,208,40) e
// constante em toda a moldura (±3 níveis entre os cantos e a área colada na
// silhueta). O cinza da figura fica a ~0.36 de distância de croma do verde, e é
// essa folga que permite um limiar alto.
//
// E o limiar PRECISA ser alto por causa do mipmap: a figura é exibida com menos
// da metade dos texels do arquivo, então o que chega ao shader já é um nível
// minificado onde cada texel de borda é a MÉDIA de verde com metal. Meio a meio
// dá ~0.18 de distância — com um limiar baixo esse texel passa como opaco e
// vira o contorno verde ao redor da silhueta. Cortando em 0.16→0.30, a média
// some e sobra a borda que é de fato figura.
//
// `spill: 1` (remoção total do verde acima do teto acromático) é seguro aqui: a
// figura é metal cromado, não há verde legítimo nela — e sendo cromada ela
// REFLETE o fundo, então o resíduo aparece em rastros dentro do rosto, não só
// na silhueta. Meio termo deixava contorno esverdeado.
const KEY: ChromaKeyOptions = {
  similarity: 0.16,
  smoothness: 0.14,
  spill: 1,
};

// O vídeo é quase quadrado (1020×1040) e a coluna do Hero também, então a
// ALTURA manda: casar a altura do plano com a do viewport põe a figura no mesmo
// espaço que o modelo 3D ocupava.
function Stage({ active }: { active: boolean }) {
  const viewport = useThree((s) => s.viewport);
  const fit = 0.98 * Math.min(viewport.width, viewport.height);
  return (
    <ChromaKeyVideo
      src="/video/head-loop.mp4"
      options={KEY}
      fit={fit}
      playing={active}
      // o quadro corta os ombros numa linha reta; sem dissolver essa faixa a
      // figura termina em corte seco contra o fundo da página
      fadeBottom={0.06}
    />
  );
}

export default function HeadVideoScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 3.6], fov: 32 }}
      dpr={[1, 2]}
      // O vídeo já vem com a iluminação renderizada: tone mapping só lavaria a
      // imagem, e não há material PBR nenhum pra iluminar.
      gl={{ antialias: true, alpha: true, toneMapping: THREE.NoToneMapping }}
      // Fora da tela o loop para — desenhar um quadro por frame pra ninguém ver
      // pesa na rolagem do resto da página.
      frameloop={active ? "always" : "never"}
    >
      <Stage active={active} />
    </Canvas>
  );
}
