"use client";

import { Component, type ReactNode, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Three.js precisa de WebGL: nada de SSR — mesmo padrão do HeadStage.
const CoreScene = dynamic(() => import("./CoreScene"), { ssr: false });

// WebGL decorativo nunca pode derrubar a rota: sem contexto WebGL a seção
// degrada pra texto puro — o significado mora nos blocos de texto.
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function CoreStage() {
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Só cria o contexto WebGL quando a seção se aproxima da viewport — senão a
  // cena disputaria GPU com o modelo do Hero já no load da página.
  // ponytail: monta uma vez e não desmonta; pausar o frameloop ao sair da
  // viewport fica pra quando isso medir custo real.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {seen && (
        <div className="absolute inset-0" aria-hidden>
          <SceneBoundary>
            <CoreScene />
          </SceneBoundary>
        </div>
      )}
    </div>
  );
}
