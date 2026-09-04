"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CoverArt } from "@/components/CoverArt";
import { CoverflowCarousel } from "@/components/CoverflowCarousel";
import { ProjectDetail } from "@/components/ProjectDetail";
import { projects } from "@/lib/projects";

// Galeria de projetos (CONTEXTO.md §5.5): coverflow com as placas + o card
// dedicado que abre no clique da placa central.
//
// As placas estão PRETAS e sem imagem de propósito, a pedido do usuário
// (2026-09-04), para avaliar a forma do carrossel antes de existir print real
// de cada projeto. Quando houver, a arte entra dentro do cartão, aqui.

// ⚠️ PROVISÓRIO — apagar quando houver projetos de verdade para preencher a
// fila. São vagas ROTULADAS, não projetos inventados: o coverflow só mostra o
// leque cheio com muitos cartões (a referência do usuário tinha 12), e com três
// não dá pra avaliar a forma. Zerar esta constante devolve a fila só aos reais.
const PREVIEW_SLOTS = 6;

type Slot = { kind: "slot"; index: number };
type Card = { kind: "project"; index: number } | Slot;

export function ProjectsGallery() {
  const [active, setActive] = useState<number | null>(null);
  const [selected, setSelected] = useState(0);
  const wrapper = useRef<HTMLDivElement>(null);

  const cards = useMemo<Card[]>(
    () => [
      ...projects.map((_, index) => ({ kind: "project" as const, index })),
      ...Array.from({ length: PREVIEW_SLOTS }, (_, i) => ({
        kind: "slot" as const,
        index: projects.length + i,
      })),
    ],
    [],
  );

  const slides = useMemo(
    () =>
      cards.map((card) => {
        const number = String(card.index + 1).padStart(2, "0");
        const project = card.kind === "project" ? projects[card.index] : null;
        return {
          key: project ? project.id : `slot-${card.index}`,
          label: project ? project.name : `Vaga ${number}`,
          content: (
            <div className="elevated relative h-full w-full bg-[#0a0b0b]">
              <CoverArt seed={project ? project.id : `slot-${card.index}`} className="absolute inset-0 h-full w-full" />
              {/* véu escurecendo o pé da capa: sem ele o nome cai em cima de
                  uma região clara da arte e some */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(4,5,6,.88),transparent)]"
              />
              <div className="relative flex h-full w-full flex-col justify-between p-[8%] text-left">
                <span className="font-mono text-[10px] tracking-[0.18em] text-white/45 uppercase">
                  {number}
                </span>
                {project ? (
                  <span>
                    <span className="block font-display text-[clamp(15px,1.35vw,21px)] leading-[1.1] font-bold tracking-[-0.02em] text-white">
                      {project.name}
                    </span>
                    <span className="mt-1.5 block text-[11.5px] leading-[1.35] text-white/55">
                      {project.tagline}
                    </span>
                  </span>
                ) : (
                  <span className="font-mono text-[11px] tracking-[0.14em] text-white/40 uppercase">
                    Vaga
                  </span>
                )}
              </div>
            </div>
          ),
        };
      }),
    [cards],
  );

  // devolve o foco ao palco só depois do painel sair: refocar com ele ainda
  // visível confunde leitor de tela
  const restoreFocus = useCallback(() => {
    wrapper.current?.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
  }, []);

  // vaga não abre nada: não há projeto por trás dela
  const open = useCallback((index: number) => {
    if (index < projects.length) setActive(index);
  }, []);

  const current = cards[selected]?.kind === "project" ? projects[cards[selected].index] : null;

  return (
    <div ref={wrapper} className="flex h-full w-full flex-col justify-center">
      <CoverflowCarousel
        slides={slides}
        onActivate={open}
        onSelect={setSelected}
        // os mesmos números da referência do usuário — é o leque dela
        rotate={44}
        depth={0.6}
        perspective={3}
        falloff={0.56}
        // 0.16 e não os 0.1 da referência: ela tinha 12 cartões num palco
        // largo e escuro, onde o mais distante ainda cabia. Aqui o cartão da
        // ponta chega quase de perfil e vira uma lasca clara — apagar mais
        // cedo faz a fila terminar em vez de acabar em cacos.
        fade={0.16}
        gap={0.05}
        cardWidth="clamp(132px, 17vw, 236px)"
        // O loop apaga o cartão a meia volta do anel para esconder o
        // teletransporte: abaixo de 5 cartões, meia volta cai em cima do
        // vizinho imediato e ele entraria a 50% de opacidade.
        loop={slides.length >= 5}
        label="Projetos de destaque"
        hint="Use as setas esquerda e direita para percorrer os projetos e Enter para abrir o projeto em foco."
        cardClassName="cursor-pointer"
      />

      {/* legenda da referência: título, subtítulo e as linhas de dados. O `key`
          remonta o bloco a cada troca de cartão, e o fade vem do motion — o
          projeto não tem `animate-in` (isso é do tailwindcss-animate, que não
          está instalado) */}
      <motion.div
        key={selected}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="mt-1 flex flex-col items-center px-6 text-center"
      >
        <p className="m-0 font-display text-[clamp(16px,1.5vw,20px)] leading-[1.1] font-bold tracking-[-0.02em] text-ink">
          {current ? current.name : "Vaga em aberto"}
        </p>
        <p className="m-0 mt-1.5 font-mono text-[11px] tracking-[0.12em] text-ink-muted uppercase">
          {current ? current.org : "a preencher"}
        </p>

        <dl className="m-0 mt-5 w-full max-w-62 text-[12px]">
          {(current
            ? [
                { k: "Período", v: current.period || "—" },
                { k: "Stack", v: current.tags.slice(0, 2).join(" · ") },
                // projeto com documento público troca a linha de repositório
                // pela do artigo: o código da Aletheia não vai abrir, o artigo sim
                current.paper
                  ? { k: "Documento", v: "Artigo público" }
                  : { k: "Repositório", v: current.repo ? "Público" : "—" },
              ]
            : [
                { k: "Período", v: "—" },
                { k: "Stack", v: "—" },
                { k: "Repositório", v: "—" },
              ]
          ).map((row) => (
            <div key={row.k} className="flex justify-between gap-4 py-1.25">
              <dt className="text-ink-faint">{row.k}</dt>
              <dd className="m-0 truncate font-medium text-ink">{row.v}</dd>
            </div>
          ))}
        </dl>
      </motion.div>

      <AnimatePresence mode="wait" onExitComplete={restoreFocus}>
        {active !== null && (
          <ProjectDetail
            key={projects[active].id}
            project={projects[active]}
            index={active}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
