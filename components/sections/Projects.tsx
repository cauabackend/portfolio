import { Section, SectionHeader } from "@/components/Section";
import { ProjectsGallery } from "@/components/ProjectsGallery";

// Projetos (CONTEXTO.md §5.5): carrossel coverflow arrastável, e o clique na
// placa central abre o card dedicado. Cabeçalho + conteúdo que preenche a
// altura, pra seção medir uma tela como as outras.
export function Projects() {
  return (
    <Section id="projetos" index="05">
      {/* minmax(min-content,1fr), e não minmax(0,1fr): a galeria tem altura
          própria (cartão + legenda), então numa viewport baixa a linha precisa
          crescer com o conteúdo em vez de deixá-lo vazar por cima do título */}
      <div className="grid flex-1 grid-rows-[auto_minmax(min-content,1fr)] gap-[clamp(16px,4vh,32px)]">
        <SectionHeader index="05" label="Projetos" title="Projetos de destaque.">
          {/* sem "arraste para navegar": §5.8 tirou essa legenda de todas as
              peças interativas — o cursor-grab é a affordance. A instrução de
              teclado existe, mas só para leitor de tela (hint no carrossel) */}
          <p className="m-0 mt-5 max-w-[46ch] text-[15px] leading-[1.6] text-ink-muted">
            Cada placa é um projeto em produção ou em pesquisa. Abra a do centro para
            ver o escopo, o que foi construído e com o que foi construído.
          </p>
        </SectionHeader>

        {/* min-h-0 no filho de uma linha 1fr: sem isso o conteúdo define a
            altura e a linha estoura a seção. A altura mínima é a mesma forma
            que Stack e Contato usam — numa viewport baixa a linha 1fr encolhe
            mais que a placa, que tem piso de 150px, e o cartão vazaria por
            cima do cabeçalho. */}
        <div className="h-full">
          <ProjectsGallery />
        </div>
      </div>
    </Section>
  );
}
