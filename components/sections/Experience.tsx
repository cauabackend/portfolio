import { careerSummary, experiences } from "@/lib/resume";
import { CoreStage } from "@/components/CoreStage";
import { GroundShadow } from "@/components/GroundShadow";
import { Section, SectionHeader } from "@/components/Section";

// Experiência aprovada — CONTEXTO.md §5.4 (referência visual do usuário, 2026-09-01).
// Composição em overlay: a peça 3D ocupa a área inteira da seção como camada de
// fundo e o texto se distribui nos cantos por cima — header em cima à esquerda,
// Bravend em cima à direita, Aletheia no meio e a visão de carreira embaixo.
// A ordem do DOM é a ordem de leitura; o desktop só reposiciona no grid.
//
// Curadoria dos dados (fonte: lib/resume.ts, Seção 4 do CONTEXTO.md — nada inventado):
// bravend.highlights[0] ("Atuação central no core de IA…") vira o subtítulo
// "Núcleo de IA da Bravend"; aletheia.highlights[0] ("Governança de IA") entra no
// subtítulo. Os bullets são o restante, verbatim.
const bravend = experiences.find((e) => e.id === "bravend")!;
const aletheia = experiences.find((e) => e.id === "aletheia")!;

type EntryProps = {
  title: string;
  subtitle: string;
  period: string;
  bullets: readonly string[];
  className?: string;
};

function Entry({ title, subtitle, period, bullets, className = "" }: EntryProps) {
  return (
    <article className={className}>
      <h3 className="m-0 font-display text-[clamp(20px,1.9vw,30px)] leading-[1.05] font-bold tracking-[-0.01em] uppercase">
        {title}
      </h3>
      <p className="m-0 mt-2 max-w-[38ch] text-[14px] leading-[1.45] font-semibold">{subtitle}</p>
      <p className="m-0 mt-2 font-mono text-[11px] tracking-[0.12em] text-[var(--ink-muted)] uppercase">
        {period}
      </p>
      <ul className="m-0 mt-4 flex max-w-[42ch] list-none flex-col gap-2 p-0">
        {bullets.map((b) => (
          <li
            key={b}
            className="flex gap-[10px] text-[13px] leading-[1.55] text-[var(--ink-muted)]"
          >
            <span aria-hidden className="mt-[9px] h-px w-3 flex-none bg-[var(--ink-faint)]" />
            {b}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Experience() {
  return (
    <Section id="experiencia" index="04" className="overflow-x-clip">
      {/* Colunas laterais em 280px — os blocos já são limitados por max-w-[42ch]
          (~286px), então não perdem nada, e a faixa central que sobra para a peça
          fica maior. */}
      <div className="grid flex-1 grid-cols-1 gap-10 min-[981px]:grid-cols-[minmax(0,280px)_minmax(0,1fr)_minmax(0,280px)] min-[981px]:grid-rows-[auto_minmax(0,1fr)_auto] min-[981px]:gap-x-[3vw] min-[981px]:gap-y-8">
        <SectionHeader
          index="04"
          label="Experiência"
          title="Jornada Profissional"
          className="min-[981px]:col-start-1 min-[981px]:row-start-1"
        />

        {/* A peça vive na coluna do meio e ocupa as três linhas: assim ela é
            dimensionada pela faixa livre entre os textos e NENHUMA rotação pode
            passar por cima deles. Cobrir o grid inteiro daria uma peça maior,
            mas o texto cairia sobre o cromo em movimento — contraste que muda a
            cada frame. No mobile volta pro fluxo, como um bloco quadrado.
            touch-pan-y: no toque o arrasto vertical vira scroll da página, então
            só o eixo horizontal gira. touch-none prenderia o scroll da seção. */}
        <div className="relative aspect-square w-full cursor-grab touch-pan-y active:cursor-grabbing min-[981px]:col-start-2 min-[981px]:row-start-1 min-[981px]:row-end-4 min-[981px]:aspect-auto min-[981px]:h-full min-[981px]:w-auto">
          <GroundShadow className="bottom-[13%] h-[24px] w-[20%]" />
          <CoreStage />
        </div>

        <Entry
          className="min-[981px]:col-start-3 min-[981px]:row-start-1"
          title="Bravend"
          subtitle={`Núcleo de IA da Bravend — ${bravend.role}`}
          period={bravend.period}
          bullets={bravend.highlights.slice(1)}
        />

        <Entry
          className="min-[981px]:col-start-1 min-[981px]:row-start-2 min-[981px]:self-center"
          title="Aletheia"
          subtitle={`${aletheia.role} — ${aletheia.highlights[0]}`}
          period={aletheia.period}
          bullets={aletheia.highlights.slice(1)}
        />

        {/* resumo da própria seção, não conteúdo independente — div, não article */}
        <div className="min-[981px]:col-start-1 min-[981px]:row-start-3 min-[981px]:self-end">
          <h3 className="m-0 font-display text-[clamp(20px,1.9vw,30px)] leading-[1.05] font-bold tracking-[-0.01em] uppercase">
            Visão Geral de Carreira
          </h3>
          <p className="m-0 mt-2 max-w-[38ch] text-[14px] leading-[1.45] font-semibold">
            {careerSummary}
          </p>
        </div>
      </div>
    </Section>
  );
}
