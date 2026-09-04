"use client";

import dynamic from "next/dynamic";
import { useInViewport } from "@/lib/useInViewport";

// Three.js precisa de WebGL: nada de SSR (CONTEXTO.md §5.1, item 4 do checklist).
//
// A figura do Hero é o vídeo com chroma key. O caminho em modelo 3D
// (HeadScene/RobotHead + public/models/head_final.glb) foi APAGADO em
// 2026-09-04 a pedido do usuário — nada no app o carregava. Para reabrir,
// regerar o componente com `npx gltfjsx` a partir do .glb.
const HeadScene = dynamic(() => import("./HeadVideoScene"), { ssr: false });

export function HeadStage() {
  // O Hero abre a página, então não há o que adiar no download — só a
  // decodificação, que deve parar quando a seção sai de cena.
  const { setNode, inView } = useInViewport({ rootMargin: "100px" });

  return (
    <div ref={setNode} className="absolute inset-0">
      <HeadScene active={inView} />
    </div>
  );
}
