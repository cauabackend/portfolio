"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { ProjectSchematic, SCHEMATIC_CAPTION } from "@/components/ProjectSchematic";
import type { Project } from "@/lib/projects";

// Card dedicado do projeto (CONTEXTO.md §5.5): abre no clique da placa central
// do carrossel. Diálogo de verdade — Esc, trap de Tab, scroll-lock e foco
// devolvido ao palco pelo `onExitComplete` de quem monta.
//
// Redesign 2026-09-04: a placa escura genérica saiu daqui. O card virou uma
// FICHA DE INSTRUMENTO — janela de esquema à esquerda, com a moldura de cantos
// e o rótulo em mono que o Contato já usa, e datasheet à direita. O esquema é
// próprio de cada projeto (ProjectSchematic), na mesma linguagem de blueprint
// do KinematicArm. A lombada escura é o que costura o card à placa do
// carrossel de onde ele abriu.
export function ProjectDetail({
  project,
  index,
  onClose,
}: {
  project: Project;
  index: number;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden"; // scrollbar-gutter: stable no globals.css evita o salto

    const focusables = () =>
      Array.from(el.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // sem trap, o Tab vaza pra página atrás do painel
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      // as duas pontas precisam do `!contains`: clicar num trecho não focável
      // do painel deixa o foco no <body>, e sem essa guarda o Tab seguinte cai
      // na página atrás do diálogo
      if (e.shiftKey && (current === first || !el.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (current === last || !el.contains(current))) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const links = [
    project.repo && { href: project.repo, label: "Ver repositório" },
    project.site && { href: project.site, label: "Abrir site" },
  ].filter(Boolean) as { href: string; label: string }[];

  const serial = `P.${String(index + 1).padStart(2, "0")}`;
  const fields = [
    { k: "Escopo", v: project.org },
    { k: "Período", v: project.period || "—" },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-60 grid place-items-center overflow-y-auto p-[max(16px,4vw)]"
      // pointerdown com alvo == backdrop, e não click: com click, começar uma
      // seleção de texto dentro do painel e soltar fora fecha o card
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ background: "rgba(231,232,231,0.78)", backdropFilter: "blur(6px)" }}
    >
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
        transition={reduced ? { duration: 0.15 } : { type: "spring", stiffness: 240, damping: 26 }}
        className="elevated relative grid w-full max-w-255 grid-cols-1 overflow-hidden rounded-[28px] border border-line bg-surface-2 min-[861px]:grid-cols-[44px_minmax(0,1.02fr)_minmax(0,1fr)]"
      >
        {/* lombada: o escuro da placa do carrossel reduzido a um filete de
            arquivo. Decorativa — número e nome estão no título ao lado. */}
        <div
          aria-hidden
          className="relative flex items-center justify-between gap-3 bg-[#0a0b0b] px-5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] min-[861px]:justify-center min-[861px]:px-0 min-[861px]:py-8"
        >
          <span className="font-mono text-[10px] tracking-[0.22em] text-white/50 uppercase min-[861px]:rotate-180 min-[861px]:[writing-mode:vertical-rl]">
            {serial} — {project.name}
          </span>
          <span className="h-1 w-1 rounded-full bg-white/35 min-[861px]:absolute min-[861px]:top-5" />
        </div>

        {/* janela de esquema: a mesma moldura de instrumento do Contato (cantos
            + rótulo em mono), sobre --surface para ler como recesso na placa */}
        <div className="relative flex items-center justify-center border-b border-line bg-surface px-6 pt-12 pb-8 min-[861px]:border-r min-[861px]:border-b-0">
          {[
            "top-4 left-4 border-t border-l",
            "top-4 right-4 border-t border-r",
            "bottom-4 left-4 border-b border-l",
            "bottom-4 right-4 border-b border-r",
          ].map((pos) => (
            <span key={pos} aria-hidden className={`absolute h-3 w-3 border-ink-faint ${pos}`} />
          ))}
          <span
            aria-hidden
            className="absolute top-6 left-7 font-mono text-[10px] tracking-[0.14em] text-ink-muted uppercase"
          >
            {SCHEMATIC_CAPTION[project.id] ?? "Esquema"}
          </span>
          <ProjectSchematic id={project.id} className="w-full max-w-110" />
        </div>

        <div className="p-[clamp(24px,3vw,40px)]">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-4 right-4 z-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line bg-surface-2 text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
          >
            <X size={16} strokeWidth={1.6} />
          </button>

          <p className="m-0 font-mono text-[10px] tracking-[0.2em] text-ink-muted uppercase">
            Projeto {serial}
          </p>
          <h3
            id="project-detail-title"
            className="m-0 mt-2 font-display text-[clamp(26px,3vw,40px)] leading-[1.03] font-bold tracking-[-0.03em] text-balance"
          >
            {project.name}
          </h3>

          {/* faixa de campos: filete em cima e embaixo, como linha de ficha */}
          <dl className="m-0 mt-5 grid grid-cols-2 gap-x-6 border-y border-line py-3">
            {fields.map((f) => (
              <div key={f.k}>
                <dt className="font-mono text-[9.5px] tracking-[0.18em] text-ink-muted uppercase">
                  {f.k}
                </dt>
                <dd className="m-0 mt-1 text-[13px] leading-[1.35] text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>

          <p className="m-0 mt-5 max-w-[62ch] text-[15px] leading-[1.6] text-pretty text-ink-muted">
            {project.summary}
          </p>

          <ul className="m-0 mt-5 list-none p-0">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-3 border-t border-line py-2.5 text-[13.5px] leading-[1.45] text-ink first:border-t-0 first:pt-0"
              >
                <span aria-hidden className="mt-2 h-px w-3 flex-none bg-ink-faint" />
                {h}
              </li>
            ))}
          </ul>

          {/* stack como carimbos: a mesma leitura de peça marcada que os
              rótulos em mono do resto do site */}
          <ul className="m-0 mt-6 flex list-none flex-wrap gap-1.5 p-0">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-[5px] border border-line bg-surface px-2 py-1 font-mono text-[10px] tracking-widest text-ink-muted uppercase"
              >
                {t}
              </li>
            ))}
          </ul>

          {links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="elevated inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-4 py-2 font-mono text-[12px] tracking-[0.06em] text-ink transition-colors duration-200 hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-ink"
                >
                  {l.label}
                  <ArrowUpRight size={14} strokeWidth={1.6} />
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
