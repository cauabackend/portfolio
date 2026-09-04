import { competencies, stack } from "@/lib/resume";
import { StackSphere } from "@/components/StackSphere";
import { Section, SectionHeader } from "@/components/Section";

// Core Expertise / Stack aprovado — CONTEXTO.md §5.3 (mockup design/stack-v4.html).
// Texto à esquerda, esfera à direita: alterna com o Sobre (anel à esquerda) e dá
// ritmo à página em vez de empilhar tudo centralizado.
export function Expertise() {
  return (
    <Section id="expertise" index="03">
      <div className="grid grid-cols-1 items-center gap-10 min-[981px]:flex-1 min-[981px]:grid-cols-[minmax(0,620px)_minmax(0,1fr)] min-[981px]:gap-[4vw]">
        <SectionHeader index="03" label="Stack técnico" title={<>Minha stack, em órbita.</>}>
          <p className="m-0 mt-3 max-w-[56ch] text-[14.5px] leading-[1.55] text-[var(--ink-muted)]">
            O globo gira as ferramentas que têm logotipo. O índice abaixo traz
            todas, incluindo o método e a estatística que nenhum logo representa.
          </p>

          {/* Índice completo, e não só "o que sobrou do globo": o usuário pediu a
              lista inteira aqui (2026-09-04). É o texto que o recrutador lê e
              busca por palavra, então repetir AWS/Docker/Python é de propósito. */}
          <dl className="m-0 mt-[clamp(16px,2.6vh,26px)] grid gap-[clamp(9px,1.5vh,14px)] border-t border-[var(--line)] pt-[clamp(14px,2.2vh,22px)]">
            {competencies.map((c) => (
              <div key={c.group}>
                <dt className="font-mono text-[10px] tracking-[0.14em] text-[var(--accent-ink)] uppercase">
                  {c.group}
                </dt>
                <dd className="m-0 mt-[4px] text-[13.5px] leading-[1.5] text-[var(--ink)]">
                  {c.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </SectionHeader>

        {/* A figura leva legenda: as ferramentas só existem como textura dentro do
            WebGL, então sem este texto o nome de cada nó dependeria de passar o
            mouse em cima (e sumiria de vez em leitor de tela ou sem WebGL). */}
        <figure className="m-0 flex h-[min(58vh,520px)] flex-col min-[981px]:h-full min-[981px]:min-h-[380px]">
          <div className="min-h-0 flex-1">
            <StackSphere />
          </div>
          {/* --accent-ink e não --ink-muted: a 11,5px o muted dá 4,19:1 sobre o
              --bg e reprova no AA. O accent-ink dá 6,8:1 sem cor nova. */}
          <figcaption className="mt-[clamp(6px,1.2vh,12px)] text-center text-[11.5px] leading-[1.55] text-[var(--accent-ink)]">
            {stack.map((t) => t.label).join(" · ")}
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
