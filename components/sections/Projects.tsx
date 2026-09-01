import { Section, SectionHeader } from "@/components/Section";

// Design ⏳ não iniciado (CONTEXTO.md §5.5). Só o shell padrão da página — o
// conteúdo entra quando a seção for decidida com o usuário.
export function Projects() {
  return (
    <Section id="projetos" index="05" innerClassName="justify-center">
      <SectionHeader index="05" label="Projetos" title="Projetos de destaque." />
    </Section>
  );
}
