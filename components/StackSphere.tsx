"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { GroundShadow } from "./GroundShadow";

// WebGL só existe no cliente (CLAUDE.md §5.3: componente client-only).
const StackSphereScene = dynamic(() => import("./StackSphereScene"), { ssr: false });

export function StackSphere() {
  // O nome da ferramenta vive no DOM, fora do canvas: como legenda 3D dentro
  // do grupo que gira, ela acompanhava a rotação e aparecia em qualquer canto.
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      {/* decorativo: a lista real das ferramentas vive em texto no Expertise */}
      <div
        aria-hidden
        className="relative min-h-0 flex-1 cursor-grab touch-pan-y active:cursor-grabbing"
      >
        {/* Sombra de contato em CSS, atrás do canvas transparente. A ContactShadows
            do three desenhava um plano quadrado cujo corte reto aparecia no fundo. */}
        <GroundShadow className="bottom-[7%] h-[26px] w-[30%]" />
        <StackSphereScene onHover={setHovered} />
      </div>

      {/* A altura fica reservada mesmo vazia pra o nome da ferramenta não empurrar
          a esfera ao aparecer. A legenda de "arraste para girar" saiu a pedido do
          usuário (2026-09-01) — o cursor de mão já é a affordance. */}
      {/* sem aria-live: o rótulo só aparece no hover de mouse, então anunciá-lo
          seria ruído para quem nunca consegue alcançá-lo */}
      <p
        aria-hidden
        className="mt-3 flex h-5 shrink-0 items-center justify-center font-mono text-[11px] tracking-[0.05em] uppercase"
      >
        {hovered && (
          <span className="rounded-md bg-[var(--ink)] px-2.5 py-[3px] text-[#f4f4f3]">
            {hovered}
          </span>
        )}
      </p>
    </div>
  );
}
