"use client";

import { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useInViewport } from "@/lib/useInViewport";

// Three.js precisa de WebGL: nada de SSR — mesmo padrão do HeadStage.
//
// A peça da Experiência é o vídeo com chroma key. A versão em geometria
// procedural continua em ./CoreScene, intacta: reverter é trocar o caminho
// desta linha.
const CoreScene = dynamic(() => import("./CoreVideoScene"), { ssr: false });

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
  // Duas margens, dois propósitos: a larga adianta o download do vídeo antes de
  // a seção entrar em cena; a estreita decide se a cena deve continuar
  // desenhando e decodificando — vídeo 2K decodificando fora da tela pesa na
  // rolagem tanto quanto um canvas girando.
  const { setNode: refCarga, inView: perto } = useInViewport({
    rootMargin: "400px",
    once: true,
  });
  const { setNode: refVisivel, inView: visivel } = useInViewport({ rootMargin: "100px" });

  return (
    <div ref={refCarga} className="absolute inset-0">
      <div ref={refVisivel} className="absolute inset-0" aria-hidden>
        {perto && (
          <SceneBoundary>
            <CoreScene active={visivel} />
          </SceneBoundary>
        )}
      </div>
    </div>
  );
}
