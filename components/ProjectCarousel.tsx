"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import { useInViewport } from "@/lib/useInViewport";

// Carrossel 3D dos projetos (CONTEXTO.md §5.5): as faces vivem num anel com
// perspectiva real e o clique abre o card dedicado.
//
// O giro segue o mesmo modelo dos objetos 3D do site (§5.8): velocidade angular
// com atrito exponencial, derivada do tempo real entre eventos de ponteiro —
// derivar só do delta em pixels faz o mesmo gesto render menos impulso num
// mouse de alta taxa. Sem giro por scroll, sem legenda: o cursor é a affordance.

const STEP = 360 / projects.length;
const BASE_SPIN = 4.5; // deg/s
const DRAG_K = 0.3; // deg por pixel arrastado
const CLICK_SLOP = 6; // px: acima disso o gesto foi arrasto, não clique

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Placa técnica no lugar de screenshot: o site não usa foto de banco em
 *  lugar nenhum, e não existe print real dos projetos. Determinística por id —
 *  varia o desenho sem sugerir nenhuma quantidade (nada de gráfico que leia
 *  como métrica). */
function Dial({ seed, className = "" }: { seed: string; className?: string }) {
  const { ticks, arc, offset } = useMemo(() => {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
    }
    const n = Math.abs(h);
    return { ticks: 20 + (n % 3) * 6, arc: 90 + ((n >> 3) % 5) * 30, offset: (n >> 7) % 360 };
  }, [seed]);

  const r = 34;
  const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const end = offset + arc;
  const large = arc > 180 ? 1 : 0;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <circle cx="50" cy="50" r="44" fill="none" stroke="var(--line)" strokeWidth="0.7" />
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--ink-faint)" strokeWidth="0.7" strokeDasharray="1.5 4" />
      <circle cx="50" cy="50" r="20" fill="none" stroke="var(--line)" strokeWidth="0.7" />
      {Array.from({ length: ticks }, (_, i) => {
        const a = rad((360 / ticks) * i);
        const long = i % 5 === 0;
        const r0 = long ? 39 : 41.5;
        return (
          <line
            key={i}
            x1={50 + Math.cos(a) * r0}
            y1={50 + Math.sin(a) * r0}
            x2={50 + Math.cos(a) * 44}
            y2={50 + Math.sin(a) * 44}
            stroke="var(--ink-faint)"
            strokeWidth={long ? 0.9 : 0.5}
          />
        );
      })}
      <path
        d={`M ${50 + Math.cos(rad(offset)) * r} ${50 + Math.sin(rad(offset)) * r} A ${r} ${r} 0 ${large} 1 ${
          50 + Math.cos(rad(end)) * r
        } ${50 + Math.sin(rad(end)) * r}`}
        fill="none"
        stroke="var(--accent-ink)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line x1="50" y1="6" x2="50" y2="16" stroke="var(--ink-muted)" strokeWidth="0.7" />
      <line x1="6" y1="50" x2="16" y2="50" stroke="var(--ink-muted)" strokeWidth="0.7" />
      <line x1="84" y1="50" x2="94" y2="50" stroke="var(--ink-muted)" strokeWidth="0.7" />
      <line x1="50" y1="84" x2="50" y2="94" stroke="var(--ink-muted)" strokeWidth="0.7" />
      <circle cx="50" cy="50" r="3.2" fill="var(--accent-ink)" />
      <circle
        cx={50 + Math.cos(rad(end)) * r}
        cy={50 + Math.sin(rad(end)) * r}
        r="2.4"
        fill="var(--surface-2)"
        stroke="var(--accent-ink)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function Face({
  project,
  index,
  rotation,
  radius,
  width,
  onOpen,
  onFocusFront,
}: {
  project: Project;
  index: number;
  rotation: MotionValue<number>;
  radius: number;
  width: number;
  onOpen: (p: Project, el: HTMLButtonElement) => void;
  onFocusFront: (index: number) => void;
}) {
  const angle = index * STEP;
  // 1 = de frente pra câmera, -1 = de costas. É o que dá o esmaecimento por
  // profundidade — sem ele as faces de trás apareceriam espelhadas e legíveis.
  const depth = useTransform(rotation, (r) => clamp01((Math.cos(((r + angle) * Math.PI) / 180) + 0.35) / 1.15));
  const opacity = useTransform(depth, (t) => 0.05 + 0.95 * t ** 1.5);
  const filter = useTransform(depth, (t) => `blur(${((1 - t) * 3.2).toFixed(2)}px)`);

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        width,
        opacity,
        filter,
        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
      }}
    >
      <button
        type="button"
        onClick={(e) => onOpen(project, e.currentTarget)}
        // teclado: a face focada vem pra frente do anel, senão o usuário abre
        // um card que ele não consegue ver
        onFocus={(e) => {
          if (e.currentTarget.matches(":focus-visible")) onFocusFront(index);
        }}
        className="elevated group flex aspect-4/5 w-full cursor-pointer flex-col rounded-[20px] border border-line bg-surface-2 p-[7%] text-left transition-colors duration-200 hover:border-ink-faint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ink"
      >
        <span className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-ink" />
        </span>

        <Dial seed={project.id} className="my-[6%] w-full flex-1" />

        <span className="block font-display text-[clamp(17px,1.5vw,22px)] leading-[1.1] font-bold tracking-[-0.02em] text-ink">
          {project.name}
        </span>
        <span className="mt-1.5 block text-[12.5px] leading-[1.35] text-ink-muted">{project.tagline}</span>
        <span className="mt-3 block border-t border-line pt-2.5 font-mono text-[9.5px] tracking-[0.12em] text-ink-faint uppercase">
          {project.tags.slice(0, 3).join(" · ")}
        </span>
      </button>
    </motion.div>
  );
}

function Detail({ project, onClose }: { project: Project; onClose: () => void }) {
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
        className="elevated relative grid w-full max-w-[980px] grid-cols-1 overflow-hidden rounded-[26px] border border-line bg-surface-2 min-[801px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 z-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line bg-surface-2 text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
        >
          <X size={16} strokeWidth={1.6} />
        </button>

        {/* a "imagem" expandida: a mesma placa da face, em tamanho grande */}
        <div className="relative flex items-center justify-center border-b border-line bg-surface p-[8%] min-[801px]:border-r min-[801px]:border-b-0">
          <Dial seed={project.id} className="w-full max-w-[320px]" />
          <span
            aria-hidden
            className="absolute top-5 left-6 font-mono text-[10px] tracking-[0.14em] text-ink-faint uppercase"
          >
            {project.id}
          </span>
        </div>

        <div className="p-[max(24px,6%)]">
          <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] tracking-[0.16em] text-ink-muted uppercase">
            <span>{project.org}</span>
            {project.period && (
              <>
                <span aria-hidden className="h-3 w-px bg-line" />
                <span>{project.period}</span>
              </>
            )}
          </p>
          <h3
            id="project-detail-title"
            className="m-0 mt-3 font-display text-[clamp(26px,3vw,38px)] leading-[1.05] font-bold tracking-[-0.02em]"
          >
            {project.name}
          </h3>
          <p className="m-0 mt-4 text-[15px] leading-[1.6] text-ink-muted">{project.summary}</p>

          <ul className="m-0 mt-5 list-none space-y-2.5 p-0">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[14px] leading-[1.5] text-ink">
                <span aria-hidden className="mt-2.5 h-px w-3 flex-none bg-ink-faint" />
                {h}
              </li>
            ))}
          </ul>

          <p className="m-0 mt-6 border-t border-line pt-4 font-mono text-[10px] tracking-[0.14em] text-ink-faint uppercase">
            {project.tags.join(" · ")}
          </p>

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

export function ProjectCarousel() {
  const reduced = useReducedMotion() ?? false;
  const { setNode, inView } = useInViewport({ rootMargin: "100px" });
  const [active, setActive] = useState<Project | null>(null);
  const [cardWidth, setCardWidth] = useState(260);
  const rotation = useMotionValue(0);
  const velocity = useRef(0);
  const dragging = useRef(false);
  const travelled = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const trigger = useRef<HTMLButtonElement | null>(null);

  const stageRef = useCallback(
    (node: HTMLDivElement | null) => {
      setNode(node);
      if (!node) return;
      const ro = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        // a face é limitada pela altura também: com aspect 4/5 uma faixa baixa
        // cortaria o card pelo topo
        setCardWidth(Math.max(150, Math.min(300, width * 0.3, height * 0.62)));
      });
      ro.observe(node);
      return () => ro.disconnect();
    },
    [setNode],
  );

  // raio grande o bastante pra nenhuma face cruzar a vizinha: com poucos
  // projetos o passo angular é largo e a fórmula do cilindro sozinha deixaria
  // as placas se atravessando
  const radius = useMemo(
    () => Math.max(cardWidth / (2 * Math.tan(Math.PI / projects.length)), cardWidth * 0.95),
    [cardWidth],
  );

  useAnimationFrame((_, deltaMs) => {
    if (reduced || !inView || active || dragging.current) return;
    const d = Math.min(deltaMs, 50) / 1000; // um frame perdido não deve dar tranco
    rotation.set(rotation.get() + (BASE_SPIN + velocity.current) * d);
    velocity.current *= Math.exp(-2.4 * d);
  });

  // move/up no window, e não com setPointerCapture: capturado, o click passa a
  // ser entregue ao palco e os botões das faces nunca abririam o card
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastX.current;
      const dt = Math.max(e.timeStamp - lastT.current, 8) / 1000;
      lastX.current = e.clientX;
      lastT.current = e.timeStamp;
      travelled.current += Math.abs(dx);
      rotation.set(rotation.get() + dx * DRAG_K);
      velocity.current = (dx * DRAG_K) / dt;
    };
    const up = (e: PointerEvent) => {
      dragging.current = false;
      // mão parada antes de soltar não é arremesso: sem isso o anel dispara
      // com a velocidade do último movimento, de um segundo atrás
      if (e.timeStamp - lastT.current > 60) velocity.current = 0;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [rotation]);

  const bringToFront = useCallback(
    (index: number) => {
      const current = rotation.get();
      // caminho mais curto: sem normalizar, o anel dá voltas inteiras
      const delta = ((((-index * STEP - current) % 360) + 540) % 360) - 180;
      velocity.current = 0;
      animate(rotation, current + delta, { type: "spring", stiffness: 90, damping: 20 });
    },
    [rotation],
  );

  const open = useCallback((project: Project, el: HTMLButtonElement) => {
    trigger.current = el;
    setActive(project);
  }, []);

  // identidade estável: uma arrow inline aqui remontaria o efeito do diálogo a
  // cada render do carrossel (o ResizeObserver dispara em qualquer resize), e
  // o efeito devolve o foco ao "Fechar" toda vez que roda
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <div
        ref={stageRef}
        className="relative h-full w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
        style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        onPointerDown={(e) => {
          // o spring de bringToFront segue escrevendo na rotação a cada frame:
          // sem parar, o arrasto é ignorado até ele assentar
          rotation.stop();
          dragging.current = true;
          travelled.current = 0;
          lastX.current = e.clientX;
          lastT.current = e.timeStamp;
          velocity.current = 0;
        }}
        // arrasto não é clique: sem isso, girar o anel abre o card por acidente.
        // A medida é CONSUMIDA aqui: um clique de teclado (Enter/Espaço) não
        // passa por pointerdown e herdaria a distância do último arrasto.
        onClickCapture={(e) => {
          const dragged = travelled.current > CLICK_SLOP;
          travelled.current = 0;
          if (dragged) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ rotateY: rotation, transformStyle: "preserve-3d" }}
        >
          {projects.map((project, i) => (
            <Face
              key={project.id}
              project={project}
              index={i}
              rotation={rotation}
              radius={radius}
              width={cardWidth}
              onOpen={open}
              onFocusFront={bringToFront}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence
        mode="wait"
        // devolve o foco só depois do painel sair: refocar com ele ainda
        // visível confunde leitor de tela
        onExitComplete={() => trigger.current?.focus()}
      >
        {active && <Detail key={active.id} project={active} onClose={close} />}
      </AnimatePresence>
    </>
  );
}
