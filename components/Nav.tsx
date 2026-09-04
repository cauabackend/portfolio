"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Briefcase, Cpu, House, Layers, Mail, User } from "lucide-react";
import { sections } from "@/lib/resume";

// Navbar flutuante superior (2026-09-04): pill cinza-chumbo encostada no topo,
// só com os links de seção — sem marca e sem CTA (pedido do usuário). Substitui
// o dock inferior de ícones. Os ícones ficam: no mobile eles são a versão
// compacta dos links, sem menu/estado extra.
const ICONS = { hero: House, sobre: User, expertise: Cpu, experiencia: Briefcase, projetos: Layers, contato: Mail };

export function Nav() {
  const [current, setCurrent] = useState<string>(sections[0].id);
  // a marca ativa desliza entre os itens; com reduced motion ela só troca de
  // lugar (o bloco global de CSS não alcança animação de layout em JS)
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    // A seção "ativa" é a que ocupa a faixa central da viewport — a mais visível
    // entre as que cruzam essa faixa vence, evitando troca dupla em transições.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) => (a.intersectionRatio >= b.intersectionRatio ? a : b));
        setCurrent(top.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Seções"
      // Pill fina encostada no topo + as "pontas" côncavas dos lados (nav-wing).
      // A sombra é `drop-shadow` no conjunto, não `box-shadow` na pill: box-shadow
      // desenharia a borda de cada peça e era isso que aparecia como linha na
      // emenda com as pontas.
      className="nav-bar fixed top-0 left-1/2 z-50 flex max-w-[calc(100vw-16px)] -translate-x-1/2 items-center gap-[2px] rounded-b-[18px] bg-[var(--nav)] px-[10px] py-[6px]"
    >
      <span aria-hidden className="nav-wing nav-wing-left" />
      <span aria-hidden className="nav-wing nav-wing-right" />

      {/* A marca do item ativo é UMA só, que desliza de um link para o outro
          (layoutId) em vez de aparecer/sumir em cada um. Ela é bem fraca
          (white/10) porque a pílula chapada que existia antes pesava demais —
          aqui quem informa é o movimento, não o contraste. Como ela acompanha
          a seção visível, a barra vira um indicador de progresso discreto. */}
      {sections.map((s) => {
        const Icon = ICONS[s.id];
        const active = current === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={active ? "true" : undefined}
            className={`relative flex h-[30px] items-center justify-center rounded-[10px] px-[11px] text-[13px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white max-[860px]:w-[30px] max-[860px]:px-0 ${
              active ? "text-white" : "text-white/50 hover:bg-white/6 hover:text-white/85"
            }`}
          >
            {active && (
              <motion.span
                aria-hidden
                layoutId="nav-active"
                className="absolute inset-0 rounded-[10px] bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,.12)]"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 520, damping: 40, mass: 0.6 }
                }
              />
            )}
            <span className="relative max-[860px]:sr-only">{s.label}</span>
            <Icon
              size={17}
              strokeWidth={1.8}
              aria-hidden
              className="relative min-[861px]:hidden"
            />
          </a>
        );
      })}
    </nav>
  );
}
