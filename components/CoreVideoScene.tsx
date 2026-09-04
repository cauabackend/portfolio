"use client";

import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ChromaKeyVideo, type ChromaKeyOptions } from "./ChromaKeyVideo";

// A cor do fundo é amostrada do próprio frame (ver ChromaKeyVideo). O fundo
// deste arquivo é um verde esmeralda ESCURO (~rgb(2,89,60)), não o verde chroma
// clássico — medido no vídeo, não presumido.
//
// `similarity` cobre a variação de iluminação do fundo; `smoothness` é a
// largura da transição (0 daria borda serrilhada).
const KEY: ChromaKeyOptions = {
  similarity: 0.072,
  smoothness: 0.07,
  // 1 = verde puxado até o teto acromático. O 2.4 daqui era da fórmula antiga
  // de despill; com a atual o `mix` extrapola, o canal verde cai abaixo dos
  // outros dois e o cristal ganha mancha magenta.
  spill: 1,
};

// A peça 3D era enquadrada por `0.94 * min(largura, altura)` do viewport. O
// vídeo é retrato (1792×2048), então a ALTURA é a dimensão limitante: casar a
// altura do plano com aquela medida põe a figura no lugar do objeto sem
// redesenhar a seção. O fator ficou em 0.9 (e não 0.98) a pedido do usuário:
// a figura preenchia demais a coluna do meio e sufocava o respiro em volta.
function Stage({ active }: { active: boolean }) {
  const viewport = useThree((s) => s.viewport);
  const fit = 0.9 * Math.min(viewport.width, viewport.height);
  return <ChromaKeyVideo src="/video/core-loop.mp4" options={KEY} fit={fit} playing={active} />;
}

export default function CoreVideoScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 3.6], fov: 32 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.NoToneMapping }}
      // O vídeo já vem com a iluminação renderizada: tone mapping aqui só
      // lavaria a imagem, e não há material PBR nenhum pra iluminar.
      //
      // Fora da tela o loop para: sem isso a página desenharia um quadro 2K a
      // cada frame para ninguém ver.
      frameloop={active ? "always" : "never"}
    >
      <Stage active={active} />
    </Canvas>
  );
}
