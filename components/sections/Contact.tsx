import { profile } from "@/lib/resume";
import { Section, SectionHeader } from "@/components/Section";

// Design ⏳ não iniciado (CLAUDE.md §5.6). Só o shell padrão da página + o
// e-mail real; o resto entra quando a seção for decidida com o usuário.
export function Contact() {
  return (
    <Section id="contato" index="06" innerClassName="justify-center">
      <SectionHeader index="06" label="Contato" title="Vamos conversar." />
      <p className="mt-8">
        <a
          className="font-display text-[clamp(20px,2.4vw,34px)] font-semibold tracking-[-0.02em] underline decoration-[var(--line)] underline-offset-[6px] transition-colors hover:decoration-[var(--accent-ink)]"
          href={`mailto:${profile.email}`}
        >
          {profile.email}
        </a>
      </p>
    </Section>
  );
}
