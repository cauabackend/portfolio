"use client";

import dynamic from "next/dynamic";
import { useProgress } from "@react-three/drei";

// Three.js precisa de WebGL: nada de SSR (CLAUDE.md §5.1, item 4 do checklist).
const HeadScene = dynamic(() => import("./HeadScene"), { ssr: false });

export function HeadStage() {
  const { active } = useProgress();

  return (
    <div className="absolute inset-0">
      {active && (
        <p className="absolute inset-0 flex items-center justify-center font-mono text-[11px] tracking-[0.14em] text-[var(--ink-faint)]">
          BOOTING SYSTEM…
        </p>
      )}
      <HeadScene />
    </div>
  );
}
