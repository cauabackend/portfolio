"use client";

import { useEffect, useState } from "react";

/**
 * Diz se o elemento está (perto de) visível.
 *
 * Serve a dois propósitos na página, e a diferença está no `rootMargin`:
 * uma margem grande adianta o CARREGAMENTO de um asset pesado antes de a seção
 * entrar em cena; uma margem pequena decide se a cena deve continuar
 * DESENHANDO. Canvas WebGL em `frameloop="always"` mantém a GPU ocupada a
 * página inteira mesmo quando ninguém o vê — é isso que deixa a rolagem pesada.
 *
 * `once` trava em true na primeira aparição: um asset já baixado não precisa
 * ser "descarregado" ao sair da tela.
 *
 * Devolve um callback ref (`setNode`), e não um objeto ref, porque o resultado
 * é usado durante o render — ler `.current` de um ref no render é leitura de
 * estado mutável fora do fluxo do React.
 */
export function useInViewport({
  rootMargin = "0px",
  once = false,
}: { rootMargin?: string; once?: boolean } = {}) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node, rootMargin, once]);

  return { setNode, inView };
}
