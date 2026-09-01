"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// WebGL só existe no cliente (CLAUDE.md §5.3: componente client-only).
const StackSphereScene = dynamic(() => import("./StackSphereScene"), { ssr: false });

export function StackSphere() {
  // O nome da ferramenta vive no DOM, fora do canvas: como legenda 3D dentro
  // do grupo que gira, ela acompanhava a rotação e aparecia em qualquer canto.
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative mt-6">
      <div className="relative h-[min(78vw,680px)] cursor-grab touch-pan-y active:cursor-grabbing">
        {/* Sombra de contato em CSS, atrás do canvas transparente. A ContactShadows
            do three desenhava um plano quadrado cujo corte reto aparecia no fundo. */}
        <span
          aria-hidden
          className="absolute bottom-[9%] left-1/2 h-[30px] w-[38%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(25,26,26,.17),transparent_70%)] blur-[3px]"
        />
        <StackSphereScene onHover={setHovered} />
      </div>

      <p
        aria-live="polite"
        className="mt-[14px] flex h-5 items-center justify-center gap-2 font-mono text-[11px] tracking-[0.05em] uppercase"
      >
        {hovered ? (
          <span className="rounded-md bg-[var(--ink)] px-2.5 py-[3px] text-[#f4f4f3]">{hovered}</span>
        ) : (
          <span className="text-[var(--ink-faint)]">◐ arraste para girar</span>
        )}
      </p>
    </div>
  );
}
