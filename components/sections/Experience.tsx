import { education, experiences } from "@/lib/resume";
import { CoreStage } from "@/components/CoreStage";
import { GroundShadow } from "@/components/GroundShadow";
import { Section, SectionHeader } from "@/components/Section";

// Experiência aprovada — CONTEXTO.md §5.4 (referência visual do usuário, 2026-09-01).
// Composição em overlay: a peça 3D ocupa a área inteira da seção como camada de
// fundo e o texto se distribui nos cantos por cima — header em cima à esquerda,
// Bravend em cima à direita, Aletheia no meio e a visão de carreira embaixo.
// A ordem do DOM é a ordem de leitura; o desktop só reposiciona no grid.
//
// Fonte dos dados: lib/resume.ts (Seção 4 do CONTEXTO.md), nada inventado. Desde
// 2026-09-04 nenhum highlight é desviado para o subtítulo: o subtítulo é o cargo
// e os highlights são todos bullets. A montagem antiga tirava o highlights[0] da
// lista para virar aposto do cargo, e o resultado era um subtítulo comprido com
// travessão enquanto a linha mais concreta do bloco sumia do lugar onde o olho
// procura fato.
const bravend = experiences.find((e) => e.id === "bravend")!;
const aletheia = experiences.find((e) => e.id === "aletheia")!;

type EntryProps = {
  title: string;
  subtitle: string;
  period: string;
  // opcional: a entrada de formação não tem bullet, e um <ul> vazio deixaria
  // a margem de cima sem conteúdo embaixo
  bullets?: readonly string[];
  className?: string;
};

// Ordem de varredura de um recrutador: ONDE, QUANDO, o QUÊ. O período subiu para
// logo abaixo do nome da empresa — antes ficava depois do cargo, que é a
// informação mais longa das três, e a data se perdia no meio do bloco.
//
// O espaçamento interno também deixou de ser uniforme. Antes os quatro pedaços
// tinham o mesmo respiro entre si e o bloco lia como quatro linhas soltas. Agora
// é ritmo: nome e data colados (são o mesmo dado), cargo com um degrau, bullets
// com o dobro. Proximidade é o que agrupa, não caixa nem régua.
function Entry({ title, subtitle, period, bullets, className = "" }: EntryProps) {
  return (
    <article className={className}>
      <h3 className="m-0 font-display text-[clamp(18px,min(1.9vw,3.4vh),30px)] leading-[1.05] font-bold tracking-[-0.01em] uppercase">
        {title}
      </h3>
      <p className="m-0 mt-[6px] font-mono text-[11px] tracking-[0.12em] text-ink-muted uppercase">
        {period}
      </p>
      <p className="m-0 mt-[clamp(9px,1.7vh,14px)] max-w-[38ch] text-[clamp(13px,2.1vh,14px)] leading-[1.45] font-semibold">
        {subtitle}
      </p>
      {/* accent-ink, não ink-muted: a 12px o muted dá 4,2:1 sobre o --bg e fica
          abaixo do mínimo de 4,5:1 — e é justamente aqui que está a substância
          do currículo. O peso continua secundário pelo tamanho, não pelo
          contraste baixo. */}
      {bullets && bullets.length > 0 && (
        <ul className="m-0 mt-[clamp(14px,2.4vh,22px)] flex max-w-[42ch] list-none flex-col gap-[clamp(6px,1.3vh,10px)] p-0">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex gap-[10px] text-[clamp(12px,1.95vh,13px)] leading-[1.5] text-accent-ink"
            >
              <span aria-hidden className="mt-[9px] h-px w-3 flex-none bg-[var(--ink-faint)]" />
              {b}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function Experience() {
  return (
    <Section id="experiencia" index="04" className="overflow-x-clip">
      {/* Colunas laterais em 280px — os blocos já são limitados por max-w-[42ch]
          (~286px), então não perdem nada, e a faixa central que sobra para a peça
          fica maior. */}
      <div className="grid flex-1 grid-cols-1 gap-10 min-[981px]:grid-cols-[minmax(0,280px)_minmax(0,1fr)_minmax(0,280px)] min-[981px]:grid-rows-[auto_minmax(0,1fr)_auto] min-[981px]:gap-x-[3vw] min-[981px]:gap-y-[clamp(8px,1.5vh,32px)]">
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
            A peça é um vídeo em loop, então não há arrasto: o cursor-grab saiu
            junto, senão prometeria uma interação que não existe. */}
        <div className="relative aspect-square w-full min-[981px]:col-start-2 min-[981px]:row-start-1 min-[981px]:row-end-4 min-[981px]:aspect-auto min-[981px]:h-full min-[981px]:w-auto">
          {/* Medida contra a figura do vídeo, não herdada do objeto 3D antigo:
              na base a peça tem ~33% da largura da coluna e termina a ~10% do
              rodapé. Com os valores antigos (20% / 13%) a sombra ficava estreita
              e flutuava acima do ponto de contato.
              O vídeo não traz sombra própria — a que existia era projetada no
              fundo verde e saiu junto no chroma key. */}
          <GroundShadow className="bottom-[6%] h-[42px] w-[52%]" strength={2.2} />
          <CoreStage />
        </div>

        {/* row-end-4 + self-start é o conserto do espaçamento torto da coluna da
            esquerda, e não uma mudança de posição: a Bravend continua no mesmo
            canto. Estando presa à linha 1, ERA ELA quem media a linha (238px
            contra os 130px do cabeçalho), e os 108px de sobra viravam vão morto
            debaixo do título. Medido: 148px de respiro acima da Aletheia contra
            40px abaixo. Atravessando as três linhas, a linha 1 volta a medir o
            cabeçalho, toda a folga cai na linha do meio e o self-center da
            Aletheia a divide em dois respiros iguais. */}
        <Entry
          className="min-[981px]:col-start-3 min-[981px]:row-start-1 min-[981px]:row-end-4 min-[981px]:self-start"
          title="Bravend"
          // O cargo, e só o cargo. A linha antiga ("Núcleo de IA da Bravend —
          // …") repetia o nome da empresa a 6px do <h3> que já diz BRAVEND, e
          // trazia um travessão, que a regra de escrita do texto proíbe. O que
          // ele faz além do cargo é fato, então virou o primeiro bullet em vez
          // de aposto no subtítulo.
          subtitle={bravend.role}
          period={bravend.period}
          bullets={bravend.highlights}
        />

        <Entry
          className="min-[981px]:col-start-1 min-[981px]:row-start-2 min-[981px]:self-center"
          title="Aletheia"
          subtitle={aletheia.role}
          period={aletheia.period}
          bullets={aletheia.highlights}
        />

        {/* A formação ocupa o lugar de duas coisas que saíram daqui em
            2026-09-04, ambas rejeitadas pelo usuário: o <h3> "VISÃO GERAL DE
            CARREIRA", que em caixa alta e no mesmo corpo de BRAVEND e ALETHEIA
            fazia a coluna parecer ter três empregos, e a linha de posicionamento
            que ele mandou no print ("soluções baseadas em dados…"), vaga demais.
            FIAP é a terceira entrada real da jornada, tem data e fecha a
            cronologia — e usa a mesma peça, então lê como parte da mesma lista. */}
        <Entry
          className="min-[981px]:col-start-1 min-[981px]:row-start-3 min-[981px]:self-end"
          title={education.school}
          subtitle={`${education.degree}, ${education.status}`}
          period={`${education.start} – ${education.end}`}
        />
      </div>
    </Section>
  );
}
