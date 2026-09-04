"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { ProjectSchematic } from "@/components/ProjectSchematic";
import { projects, type Project } from "@/lib/projects";

// Ficha do projeto (CONTEXTO.md §5.5) — abre no clique da placa do carrossel.
//
// ⛔ NÃO é mais um card/modal centralizado com fundo desfocado (rejeitado pelo
// usuário em 2026-09-04: "extremamente genérico... quero mudar por completo").
// A ficha TOMA A TELA INTEIRA e usa a composição do Hero (§5.1): figura grande
// à esquerda, nome em tipografia display gigante à direita, dados soltos nos
// cantos em mono. Sem moldura, sem caixa, sem sombra de modal — a página vira
// o projeto. Continua sendo um diálogo de verdade: Esc, trap de Tab,
// scroll-lock e foco devolvido pelo `onExitComplete` de quem monta.
const EASE = [0.16, 1, 0.3, 1] as const;

export function ProjectDetail({
  project,
  index,
  onClose,
}: {
  project: Project;
  index: number;
  onClose: () => void;
}) {
  const sheet = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const el = sheet.current;
    if (!el) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden"; // scrollbar-gutter: stable no globals.css evita o salto

    const focusables = () =>
      Array.from(el.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
    // o foco vai para a própria ficha, não para o X: focar o botão desenha o
    // anel de foco em volta dele toda vez que a ficha abre
    el.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // sem trap, o Tab vaza pra página atrás da ficha
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      // as duas pontas precisam do `!contains`: clicar num trecho não focável
      // deixa o foco no <body>, e sem essa guarda o Tab seguinte cai na página
      // atrás do diálogo
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
  // o nome vira duas linhas escalonadas quando tem por onde quebrar — o mesmo
  // stagger do Hero. Nome de uma palavra só fica em linha única, sem picotar.
  const words = project.name.split(" ");
  const lines = words.length > 1 ? [words[0], words.slice(1).join(" ")] : words;

  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { y: "110%" },
    animate: reduced ? { opacity: 1 } : { y: "0%" },
    transition: reduced ? { duration: 0.2 } : { duration: 0.8, delay, ease: EASE },
  });
  const fade = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: reduced ? { duration: 0.2 } : { duration: 0.55, delay, ease: EASE },
  });

  return (
    <motion.div
      className="fixed inset-0 z-60 overflow-y-auto bg-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.15 : 0.28, ease: EASE }}
    >
      <motion.div
        ref={sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        tabIndex={-1}
        initial={reduced ? undefined : { scale: 0.985 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative flex min-h-full flex-col px-[5vw] pt-[clamp(18px,3.5vh,36px)] pb-[clamp(20px,4vh,44px)]"
      >
        {/* trilho superior: identificação à esquerda, saída à direita */}
        <div className="flex items-start justify-between gap-6">
          <motion.p
            className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase"
            {...fade(0.1)}
          >
            <span className="text-ink">{serial}</span>
            <span aria-hidden className="h-3 w-px bg-line" />
            <span>{project.org}</span>
            {project.period && (
              <>
                <span aria-hidden className="h-3 w-px bg-line" />
                <span>{project.period}</span>
              </>
            )}
          </motion.p>

          {/* só o X, sem pílula: o botão não é conteúdo, é saída */}
          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="-m-2 flex flex-none cursor-pointer p-2 text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-ink"
            {...fade(0.1)}
          >
            <X size={22} strokeWidth={1.5} />
          </motion.button>
        </div>

        {/* corpo: figura + tipografia, na composição do Hero */}
        <div className="grid flex-1 items-center gap-[clamp(20px,3vw,56px)] py-[clamp(16px,3vh,40px)] min-[861px]:grid-cols-[minmax(0,1fr)_minmax(0,1.06fr)]">
          {/* sem legenda externa: o esquema já rotula cada nó e traz as siglas
              técnicas dentro do próprio desenho */}
          <motion.div className="flex justify-center" {...fade(0.22)}>
            <ProjectSchematic
              id={project.id}
              className="w-full max-w-[min(48vw,640px)] max-h-[42vh] min-[861px]:max-h-[54vh]"
            />
          </motion.div>

          <div>
            <h2
              id="project-detail-title"
              className="m-0 font-display leading-[0.92] font-bold tracking-[-0.035em] text-[clamp(40px,8.4vw,124px)]"
            >
              {lines.map((line, i) => (
                // a máscara é o que faz a linha SUBIR de dentro do papel em vez
                // de aparecer por cima dele
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className={`block ${i === 1 ? "pl-[8%]" : ""}`}
                    {...rise(0.16 + i * 0.09)}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.p
              className="m-0 mt-[clamp(12px,2vh,22px)] max-w-[34ch] font-mono text-[clamp(12px,1.1vw,14px)] leading-[1.5] tracking-[0.02em] text-accent-ink"
              {...fade(0.42)}
            >
              {project.tagline}
            </motion.p>

            {/* o documento do projeto fica AQUI, e não na fileira de links do
                rodapé: é a prova mais forte que a ficha tem, e no rodapé (mono
                de 12px, terceira coluna) ele passa despercebido. O chip reusa o
                mesmo tratamento do CTA do Contato — elevação + borda hairline. */}
            {project.paper && (
              <motion.a
                href={project.paper.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-[clamp(16px,2.6vh,28px)] inline-flex flex-col items-start font-mono text-[12px] tracking-[0.14em] text-ink uppercase transition-colors duration-200 hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ink"
                {...fade(0.5)}
              >
                <span>
                  {project.paper.label}
                  <span className="ml-2.5 text-ink-faint">PDF</span>
                </span>
                {/* o mesmo filete que cresce do CTA do Contato: é a forma que o
                    site já usa pra marcar link, sem pílula e sem ícone */}
                <span
                  aria-hidden
                  className="mt-2 block h-px w-full bg-ink-faint transition-colors duration-200 group-hover:bg-accent-ink"
                />
                <span className="sr-only">(abre em nova aba)</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* rodapé de dados: as três leituras lado a lado, sem caixa nenhuma */}
        <motion.div
          className="grid gap-[clamp(18px,3vw,48px)] border-t border-line pt-[clamp(16px,2.4vh,28px)] min-[861px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,auto)]"
          {...fade(0.5)}
        >
          <p className="m-0 max-w-[52ch] text-[clamp(13.5px,1.05vw,15px)] leading-[1.55] text-pretty text-ink-muted">
            {project.summary}
          </p>

          <ul className="m-0 list-none p-0">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-3 py-1.5 text-[clamp(12.5px,0.95vw,13.5px)] leading-[1.45] text-ink"
              >
                <span aria-hidden className="mt-2 h-px w-3 flex-none bg-ink-faint" />
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4">
            <ul className="m-0 flex list-none flex-wrap gap-x-3 gap-y-1.5 p-0 font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">
              {project.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            {links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.06em] text-ink transition-colors duration-200 hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-ink"
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className="elevated flex h-7 w-7 items-center justify-center rounded-full border border-line bg-surface-2"
                    >
                      <ArrowUpRight size={13} strokeWidth={1.8} />
                    </span>
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                ))}
              </div>
            )}

            <p className="m-0 font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
