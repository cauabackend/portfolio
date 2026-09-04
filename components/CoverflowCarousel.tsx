"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Carrossel coverflow (CONTEXTO.md §5.5) — anel plano com perspectiva, no
// lugar do anel cilíndrico anterior. As faces são ReactNode: o carrossel só
// cuida da geometria e do gesto, o conteúdo do cartão é de quem usa.
//
// Diferença de convenção em relação ao componente de referência: aqui não há
// `cn`/`lib/utils` (o projeto não é shadcn) nem tokens `bg-muted`/`ring-ring`,
// então as classes usam os tokens do site.

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type CoverflowSlide = {
  key: string;
  /** rótulo acessível do slide (o nome do projeto) */
  label: string;
  content: ReactNode;
};

export function CoverflowCarousel({
  slides,
  onActivate,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = "clamp(150px, 20vw, 250px)",
  gap = 0.05,
  loop = true,
  edgeFade = 0.14,
  showNavigation = false,
  label = "Carrossel de projetos",
  hint,
  className = "",
  cardClassName = "",
  onSelect,
}: {
  slides: CoverflowSlide[];
  /** abrir o cartão central (clique nele, ou Enter/Espaço no palco) */
  onActivate?: (index: number) => void;
  onSelect?: (index: number) => void;
  /** graus que o primeiro vizinho inclina */
  rotate?: number;
  /** o quanto o primeiro vizinho recua, em fração da largura do cartão */
  depth?: number;
  /** distância do observador em múltiplos da largura — menor = lente mais aberta */
  perspective?: number;
  /** expoente da distância: abaixo de 1 a inclinação afrouxa conforme afasta */
  falloff?: number;
  /** opacidade perdida por passo a partir do centro */
  fade?: number;
  /** qualquer comprimento CSS; todo o resto deriva dele */
  cardWidth?: string;
  /** espaço entre cartões, em fração da largura */
  gap?: number;
  loop?: boolean;
  /** 0–0.5: fração de cada ponta onde os cartões dissolvem, para o corte do
   *  overflow não aparecer como linha reta */
  edgeFade?: number;
  showNavigation?: boolean;
  label?: string;
  /** texto só para leitor de tela dizendo como operar */
  hint?: string;
  className?: string;
  cardClassName?: string;
}) {
  const count = slides.length;
  // Sem loop a fila tem começo e fim: abrir no meio deixa cartão dos dois
  // lados, em vez de uma pilha só à direita. Com loop, tanto faz — 0 já tem
  // vizinho dos dois lados.
  const start = loop ? 0 : Math.floor(count / 2);

  const frameRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  /** índice fracionário no centro — é a única fonte de verdade */
  const posRef = useRef(start);
  /** para onde o assentamento está indo: partir de `pos` engoliria uma tecla
   *  apertada em pleno voo, antes de o arredondamento andar */
  const targetRef = useRef(start);
  const widthRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const dragRef = useRef<{ id: number; x: number; pos: number; v: number; t: number } | null>(null);
  /** de qual cartão o gesto partiu, para o clique abrir o certo */
  const pressedRef = useRef<number | null>(null);

  const [selected, setSelected] = useState(start);

  /** cartão inteiro mais próximo, dobrado de volta em 0..count-1 */
  const indexAt = useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  // Pinta direto no DOM: 60 atualizações de estado por segundo re-renderizariam
  // todos os cartões por números que o React nunca precisa ver.
  const paint = useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      // Dobra a distância pelo caminho mais curto do anel — é isso que faz o
      // loop, sem clonar nó nem remexer no DOM.
      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      // Inclinação e recuo afrouxam conforme o cartão se afasta: dobrar a
      // distância acrescenta só cerca de metade de cada um. Rampa linear fecha
      // o segundo cartão de vez; assim ele continua legível.
      const ramp = Math.pow(distance, falloff);
      // Travada antes do perfil exato para nenhum cartão virar de costas.
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      // O cartão é teletransportado para o outro lado do anel exatamente a meia
      // volta, então precisa ter sumido até lá ou o salto aparece.
      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const settle = useCallback(
    (target: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint],
  );

  const clamp = useCallback(
    (pos: number) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop],
  );

  const goTo = useCallback(
    (index: number) => {
      // pelo caminho mais curto, em vez de desenrolar o anel inteiro
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle],
  );

  const nudge = useCallback(
    (by: number) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle],
  );

  useEffect(() => {
    onSelect?.(selected);
  }, [selected, onSelect]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    // de qual cartão o dedo saiu: com pointer capture o `click` é entregue ao
    // palco, então o alvo precisa ser lido aqui, no início do gesto
    const from = (event.target as HTMLElement).closest<HTMLElement>("[data-slide]");
    pressedRef.current = from ? Number(from.dataset.slide) : null;

    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    // cartões por segundo, para o arremesso
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;

    const moved = Math.abs(event.clientX - drag.x);
    const pressed = pressedRef.current;
    pressedRef.current = null;

    // gesto curto = clique: no cartão central abre, num vizinho traz pro centro
    if (moved < 6 && pressed !== null && event.type === "pointerup") {
      if (pressed === indexAt(posRef.current)) onActivate?.(pressed);
      else goTo(pressed);
      return;
    }

    // deixa o arremesso correr, mas nunca mais que dois cartões
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  // A largura do cartão comanda passo, profundidade e perspectiva — é a única
  // coisa que vale medir, e só quando a caixa muda de fato.
  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  return (
    <div
      className={`flex h-full w-full flex-col justify-center ${className}`}
      style={{ ["--cf-card" as string]: cardWidth }}
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            } else if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onActivate?.(selected);
            }
          }}
          aria-describedby={hint ? "coverflow-hint" : undefined}
          // O respiro vertical mantém as sombras longe do corte do overflow.
          // Fixo, e não em %: padding percentual resolve contra a LARGURA do
          // elemento, e o palco é largo — daria ~70px de folga em cada ponta.
          className="cursor-grab overflow-hidden py-10 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            // o arrasto horizontal é nosso; a página continua rolando na vertical
            touchAction: "pan-y",
            // As pontas dissolvem em vez de serem cortadas em linha reta pelo
            // overflow. A máscara vai no palco, e não no wrapper: é ele que
            // recorta, então é nele que a borda precisa esmaecer.
            maskImage: `linear-gradient(to right, transparent 0%, #000 ${edgeFade * 100}%, #000 ${
              (1 - edgeFade) * 100
            }%, transparent 100%)`,
            WebkitMaskImage: `linear-gradient(to right, transparent 0%, #000 ${
              edgeFade * 100
            }%, #000 ${(1 - edgeFade) * 100}%, transparent 100%)`,
          }}
        >
          <div
            className="relative select-none"
            style={{ height: "var(--cf-card)", transformStyle: "preserve-3d" }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.key}
                data-slide={index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${slide.label} — ${index + 1} de ${count}`}
                className={`absolute top-0 left-1/2 aspect-square overflow-hidden rounded-[20px] will-change-transform ${cardClassName}`}
                style={{ width: "var(--cf-card)" }}
              >
                {slide.content}
              </div>
            ))}
          </div>
        </div>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Projeto anterior"
              onClick={() => nudge(-1)}
              className="elevated absolute top-1/2 left-0 z-200 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line bg-surface-2 text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
            >
              <ChevronLeft size={18} strokeWidth={1.6} />
            </button>
            <button
              type="button"
              aria-label="Próximo projeto"
              onClick={() => nudge(1)}
              className="elevated absolute top-1/2 right-0 z-200 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line bg-surface-2 text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
            >
              <ChevronRight size={18} strokeWidth={1.6} />
            </button>
          </>
        )}
      </div>

      {hint && (
        <p id="coverflow-hint" className="sr-only">
          {hint}
        </p>
      )}
    </div>
  );
}
