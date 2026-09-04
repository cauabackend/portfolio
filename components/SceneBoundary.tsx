"use client";

import { Component, type ReactNode } from "react";

// WebGL decorativo nunca pode derrubar a rota: sem contexto WebGL, ou com um
// asset que falha ao carregar, a seção degrada pro texto que está do lado.
//
// Precisa ser boundary de classe: <Suspense> espera promessa, não captura erro,
// e o useLoader do R3F LANÇA quando uma textura não resolve. Vivia como cópia
// local no CoreStage; virou arquivo próprio quando a esfera do Stack passou a
// carregar 23 texturas (CONTEXTO.md §5.3) e ganhou a mesma superfície de falha.
export class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
