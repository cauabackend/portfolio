"use client";

import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ChromaKeyVideo, type ChromaKeyOptions } from "./ChromaKeyVideo";

// O fundo deste arquivo ERA um verde esmeralda escuro (rgb(2,89,60)) e a peça é
// cristal TRANSLÚCIDO — o verde não ficava só na borda, atravessava o objeto.
// Como a distância de croma entre aquele verde e o cinza era de só 0,161, não
// existia limiar que separasse os dois, e o despill (que corta o verde no teto
// acromático, a média de R e B) trocava o verde por um resíduo CIANO: medidos
// 3.439 pixels com saturação > 25 e pico de 175 no composto sobre a página.
//
// Por isso o arquivo foi refeito (receita no CONTEXTO.md §5.4): figura
// dessaturada de vez e recomposta sobre verde PURO (0x00FF00). Duas
// consequências: a distância de croma até a figura triplicou (0,56), então o
// key sobra folga; e o verde novo tem R == B, então todo texel de borda que o
// mipmap mistura com o cinza sai NEUTRO depois do despill, não azulado.
// Medido no composto depois da troca: ZERO pixel com saturação > 25.
//
// `similarity` em 0,10 — e não nos 0,16 do Hero — porque aqui não há mais
// contaminação de cor a esconder: o que o limiar decide agora é só quanto do
// vidro mais fino sobrevive, e apertar mais come a cúpula de cristal.
const KEY: ChromaKeyOptions = {
  similarity: 0.1,
  smoothness: 0.1,
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
