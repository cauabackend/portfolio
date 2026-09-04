import Image from "next/image";
import { about } from "@/lib/resume";
import { GroundShadow } from "@/components/GroundShadow";
import { Section, SectionHeader } from "@/components/Section";

// Sobre aprovado — CONTEXTO.md §5.2 (mockup design/sobre-v1.html).
const RINGS = [
  { src: "/images/sobre/ring_outer.png", anim: "animate-[ring-spin-cw_200s_linear_infinite]" },
  { src: "/images/sobre/ring_mid.png", anim: "animate-[ring-spin-ccw_150s_linear_infinite]" },
  { src: "/images/sobre/ring_inner.png", anim: "animate-[ring-spin-cw_110s_linear_infinite]" },
  // A camada de anotações (leader-lines + labels tipo RETICLE_APEX) foi retirada
  // a pedido do usuário: em tela, o texto minúsculo lia como ruído e derrubava o
  // acabamento do anel. O PNG segue em public/images/sobre caso volte.
];

// Um trecho da bio. `strong` cai no acento (é o que o recrutador varre) e
// `muted` no comentário lateral.
function Marked({ parts }: { parts: readonly { t: string; strong?: boolean; muted?: boolean }[] }) {
  return (
    <>
      {parts.map((p, i) => (
        <span
          key={i}
          className={
            p.strong ? "font-semibold text-accent-ink" : p.muted ? "text-ink-muted" : undefined
          }
        >
          {p.t}
        </span>
      ))}
    </>
  );
}

export function Sobre() {
  return (
    <Section id="sobre" index="02">
      {/* Título derivado da própria bio aprovada ("Comecei como desenvolvedor
          full-stack — hoje o foco é engenharia de IA"), não é copy nova. */}
      <SectionHeader index="02" label="Sobre" title="De full-stack a engenharia de IA." />

      {/* Anel e texto dividem a linha em duas metades iguais e ficam centrados no
          que sobra da seção: antes o anel tinha 50vw e o texto flutuava longe,
          à direita, com um vão morto entre os dois. */}
      {/* flex-1 só no desktop: empilhado, esticar a linha abre vãos mortos
          entre título, anel e texto */}
      <div className="mt-[3vh] grid grid-cols-1 items-center gap-10 min-[861px]:flex-1 min-[861px]:grid-cols-2 min-[861px]:gap-[4vw]">
        {/* alinhado à esquerda no desktop: o anel encosta na mesma margem do
            título e a seção ganha uma espinha em vez de dois blocos flutuando.
            O wrapper existe só pra sombra poder cair FORA do quadrado — o
            container do anel precisa de overflow-hidden e a clipparia. */}
        {/* o teto em vh existe porque a caixa é quadrada: a largura vira altura
            e numa tela baixa o anel sozinho passava do que sobra da seção */}
        <div className="relative mx-auto w-[min(84vw,380px)] min-[861px]:mx-0 min-[861px]:w-[min(46vw,620px,64vh)]">
          {/* a sombra segue o VOLUME do anel, não a área de contato (§5.4): com a
              arte a 75% da caixa, o ponto de apoio fica a ~12,5% do rodapé — a
              elipse fica logo abaixo disso e larga o bastante pra assentar a peça */}
          <GroundShadow className="bottom-[7%] h-[30px] w-[54%]" strength={1.4} />
          <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden">
            {/* O PNG tem muita margem transparente: a arte do anel ocupa só ~50%
                do arquivo. Escalar o grupo faz a foto crescer em pixels sem
                engolir as bandas — inflar só a foto dentro da caixa original
                cobria o anel inteiro. A escala vive aqui, e não nas imagens,
                porque o transform delas já é o da animação de rotação. */}
            <div aria-hidden className="absolute inset-0 scale-[1.5]">
              {RINGS.map((r) => (
                <Image
                  key={r.src}
                  src={r.src}
                  alt=""
                  width={1100}
                  height={1100}
                  // gradiente metálico sutil: a compressão padrão (75) borra as
                  // bandas do anel e cria banding visível
                  quality={100}
                  // sem `priority`: o Sobre é a segunda seção e nasce fora da
                  // tela — precarregar as quatro imagens punha ~95 KB no
                  // caminho crítico, disputando banda com o vídeo do Hero. O
                  // lazy do next/image já as busca antes de a seção aparecer.
                  sizes="(max-width: 860px) 98vw, 52vw"
                  className={`pointer-events-none absolute inset-0 h-full w-full select-none ${r.anim}`}
                />
              ))}
            </div>

            {/* Elevação reforçada (§5.1): um contato curto e escuro na borda +
                duas quedas longas, além do highlight interno no topo — sem as
                três camadas o disco lê como recorte chapado sobre o anel. */}
            <div className="relative z-[2] flex h-[49%] w-[49%] items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(155deg,#fcfcfb,#d6d7d5_60%,#adafac)] shadow-[inset_0_-20px_36px_rgba(15,17,17,.14),inset_0_14px_24px_rgba(255,255,255,.9),0_2px_5px_rgba(15,17,17,.12),0_22px_44px_rgba(15,17,17,.2),0_60px_96px_rgba(15,17,17,.18)]">
              <Image
                src="/images/sobre/profile.jpg"
                alt="Cauã Pereira da Silva"
                width={800}
                height={800}
                quality={90}
                sizes="(max-width: 860px) 38vw, 22vw"
                className="h-full w-full object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-[4%] rounded-full border border-[rgba(25,26,26,.14)]"
              />
            </div>
          </div>
        </div>

        <div className="min-w-0 max-w-[520px]">
          {/* Todos os parágrafos no mesmo corpo, a pedido do usuário. Uma versão
              com o primeiro maior, ao lado do título, foi implementada e
              rejeitada: o degrau de tamanho lia como dois textos diferentes. */}
          {about.paragraphs.map((parts, i) => (
            <p
              key={i}
              className="m-0 font-display text-[clamp(15.5px,1.4vw,18px)] leading-[1.6] font-medium tracking-[-0.005em] text-pretty not-first:mt-[clamp(12px,1.6vh,16px)]"
            >
              <Marked parts={parts} />
            </p>
          ))}

          {/* Linha de conferência: mono, corpo pequeno e um filete acima. Fica
              quieta pelo tamanho e pela posição, não por contraste baixo —
              --ink-faint aqui dava 2,2:1 sobre o fundo, ilegível a 12px.
              --accent-ink dá 6,7:1. */}
          <ul className="m-0 mt-[clamp(18px,3vh,28px)] flex list-none flex-wrap gap-x-7 gap-y-2 border-t border-line p-0 pt-[clamp(12px,1.8vh,18px)] font-mono text-[12px] tracking-[0.01em] text-accent-ink">
            {about.credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
