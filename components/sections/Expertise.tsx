import { stack } from "@/lib/resume";
import { StackSphere } from "@/components/StackSphere";
import { Section, SectionHeader } from "@/components/Section";

// Core Expertise / Stack aprovado — CLAUDE.md §5.3 (mockup design/stack-v4.html).
// Texto à esquerda, esfera à direita: alterna com o Sobre (anel à esquerda) e dá
// ritmo à página em vez de empilhar tudo centralizado.
export function Expertise() {
  return (
    <Section id="expertise" index="03">
      <div className="grid grid-cols-1 items-center gap-10 min-[981px]:flex-1 min-[981px]:grid-cols-[minmax(0,420px)_minmax(0,1fr)] min-[981px]:gap-[5vw]">
        <SectionHeader index="03" label="Stack técnico" title={<>Minha stack, em órbita.</>}>
          <p className="m-0 mt-5 max-w-[38ch] text-[15px] leading-[1.6] text-[var(--ink-muted)]">
            Cada nó é uma ferramenta do dia a dia — das linguagens e frameworks aos
            provedores de modelo e à esteira de CI que assina os artefatos.
          </p>
          {/* As ferramentas só existem como textura dentro do WebGL: sem esta
              lista, quem usa leitor de tela (ou cai no fallback sem WebGL) lê a
              promessa de "cada nó é uma ferramenta" e não recebe nenhuma. */}
          <ul className="sr-only">
            {stack.map((t) => (
              <li key={t.label}>{t.label}</li>
            ))}
          </ul>
        </SectionHeader>

        <div className="h-[min(62vh,560px)] min-[981px]:h-full min-[981px]:min-h-[420px]">
          <StackSphere />
        </div>
      </div>
    </Section>
  );
}
