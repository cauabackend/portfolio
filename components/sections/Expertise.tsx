import { StackSphere } from "@/components/StackSphere";

// Core Expertise / Stack aprovado — CLAUDE.md §5.3 (mockup design/stack-v4.html).
export function Expertise() {
  return (
    <section
      id="expertise"
      className="relative px-[6vw] pt-[min(12vw,130px)] pb-[min(11vw,120px)]"
    >
      <div className="mx-auto max-w-[1100px]">
        <p className="mb-10 flex items-center justify-center gap-[10px] font-mono text-xs tracking-[0.14em] text-[var(--ink-muted)] uppercase">
          <span aria-hidden className="h-px w-[60px] bg-[var(--line)]" />
          <span className="font-medium text-[var(--accent-ink)]">03</span> Stack técnico
          <span aria-hidden className="h-px w-[60px] bg-[var(--line)]" />
        </p>

        <div className="mx-auto max-w-[600px] text-center">
          <h2 className="m-0 mb-4 font-display text-[clamp(28px,3.8vw,44px)] leading-[1.1] font-semibold tracking-[-0.02em]">
            Minha stack, <span className="text-[var(--accent-ink)]">em órbita</span>.
          </h2>
          <p className="m-0 text-[clamp(15px,1.2vw,17px)] leading-[1.6] text-[var(--ink-muted)]">
            Arraste ou role a página para girar — cada nó é uma ferramenta do dia a dia.
          </p>
        </div>

        <StackSphere />
      </div>
    </section>
  );
}
