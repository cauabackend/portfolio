import { Section, SectionHeader } from "@/components/Section";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { projects } from "@/lib/projects";

// Projetos (CONTEXTO.md §5.5): carrossel 3D arrastável, e o clique abre o card
// dedicado do projeto. Mesmo ritmo de grade do Contato — cabeçalho, conteúdo
// que preenche a altura, rodapé — pra seção medir uma tela como as outras.
export function Projects() {
  return (
    <Section id="projetos" index="05">
      <div className="grid flex-1 grid-rows-[auto_minmax(0,1fr)_auto] gap-8">
        <SectionHeader index="05" label="Projetos" title="Projetos de destaque.">
          {/* sem "arraste para girar": §5.8 tirou essa legenda de todas as
              peças interativas — o cursor-grab é a affordance */}
          <p className="m-0 mt-5 max-w-[46ch] text-[15px] leading-[1.6] text-ink-muted">
            Cada placa é um projeto em produção ou em pesquisa. Abra uma para ver o
            escopo, o que foi construído e com o que foi construído.
          </p>
        </SectionHeader>

        {/* min-h-0 no filho de uma linha 1fr: sem isso o conteúdo define a
            altura e a linha estoura a seção. A altura mínima é a mesma forma
            que Stack e Contato usam — numa viewport baixa a linha 1fr encolhe
            mais que a placa, que tem piso de 150px, e o cartão vazaria por
            cima do cabeçalho. */}
        <div className="h-[min(52vh,440px)] min-h-0 min-[861px]:h-full min-[861px]:min-h-95">
          <ProjectCarousel />
        </div>

        <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-6 font-mono text-[10px] tracking-[0.16em] text-ink-muted uppercase">
          <span>
            {String(projects.length).padStart(2, "0")}{" "}
            {projects.length === 1 ? "projeto" : "projetos"}
          </span>
          <span aria-hidden className="h-3 w-px bg-line" />
          <span>IA aplicada · governança · dados</span>
        </p>
      </div>
    </Section>
  );
}
