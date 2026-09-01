import { profile } from "@/lib/resume";
import { HeadStage } from "@/components/HeadStage";

// Hero aprovado — CLAUDE.md §5.1 (mockup design/hero-v1.html).
// Composição minimalista: tipografia gigante + cabeça 3D + dock (em Nav).
export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen flex-col justify-between overflow-x-clip bg-[var(--bg)] pt-[26px] pb-[34px] max-[860px]:pb-[96px]"
    >
      <div className="relative flex flex-1 items-center pr-[5vw] pl-[2vw] max-[860px]:flex-col max-[860px]:justify-center max-[860px]:gap-6 max-[860px]:px-[6vw]">
        <div className="relative z-[2] aspect-square w-[min(46vw,980px)] flex-none max-[860px]:w-[min(78vw,420px)]">
          <span
            aria-hidden
            className="absolute bottom-[8%] left-1/2 h-[26px] w-[46%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(15,17,17,.24),transparent_72%)] blur-[4px]"
          />
          <HeadStage />
        </div>

        {/* A cabeça ocupa a coluna esquerda, então o display é dimensionado pela
            largura que sobra: 5.2vw é onde "LEARNING ENGINEER" (Instrument Sans
            700) encosta na margem direita sem estourar. A margem negativa deixa
            as linhas encostarem na área transparente do canvas, mantendo a
            sobreposição tipografia/cabeça do mockup. */}
        <h1 className="relative z-[1] m-0 -ml-[5vw] flex min-w-0 flex-1 select-none flex-col justify-center self-center font-display text-[clamp(26px,5.2vw,150px)] leading-[0.94] font-bold tracking-[-0.03em] whitespace-nowrap max-[860px]:ml-0 max-[860px]:w-full max-[860px]:flex-none max-[860px]:text-[clamp(26px,8.6vw,64px)]">
          <span className="block w-full text-right">
            AI &amp; <span className="text-[var(--accent-ink)]">MACHINE</span>
          </span>
          <span className="block w-full text-left">LEARNING ENGINEER</span>
        </h1>
      </div>

      <div className="flex items-end justify-between px-11 font-mono max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-[14px] max-[720px]:px-[22px]">
        <p className="m-0 text-[11.5px] tracking-[0.1em] text-[var(--ink-muted)] uppercase">
          {profile.name} — {profile.location}
        </p>
        <p className="m-0 flex items-center gap-[10px] text-[11px] tracking-[0.08em] text-[var(--ink-faint)]">
          <span
            aria-hidden
            className="h-7 w-px bg-[linear-gradient(var(--ink-faint),transparent)]"
          />
          SCROLL
        </p>
      </div>
    </section>
  );
}
