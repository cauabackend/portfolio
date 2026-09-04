import { HeadStage } from "@/components/HeadStage";

// Hero aprovado — CONTEXTO.md §5.1 (mockup design/hero-v1.html).
// Composição minimalista: tipografia gigante + cabeça 3D + navbar (em Nav).
export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-dvh flex-col overflow-x-clip bg-[var(--bg)] pt-[64px] pb-[34px]"
    >
      <div className="relative flex flex-1 items-center pr-[5vw] pl-[2vw] max-[860px]:flex-col max-[860px]:justify-center max-[860px]:gap-6 max-[860px]:px-[6vw]">
        {/* `self-end`: o vídeo é um busto cortado na borda de baixo do quadro,
            então o corte precisa cair na linha de base do Hero — ancorado no
            meio da coluna, ele lia como figura cortada no ar. A sombra de
            contato saiu junto: o corte não é um ponto de apoio, e a elipse
            aparecia por trás do canvas transparente como uma mancha solta. */}
        {/* a caixa é quadrada, então a largura vira altura: sem o teto em vh a
            figura sozinha passava da tela numa viewport baixa. 84vh é o teto
            REAL, não um número escolhido a olho — é o que sobra da linha
            (100vh − 64 de topo − 34 de base − ~34 do rodapé). Estava em 76vh e
            o usuário reclamou que a figura tinha encolhido. */}
        <div className="relative z-[2] aspect-square w-[min(46vw,980px,84vh)] flex-none self-end max-[860px]:w-[min(78vw,420px,54vh)] max-[860px]:self-center">
          <HeadStage />
        </div>

        {/* A cabeça ocupa a coluna esquerda, então o display é dimensionado pela
            largura que sobra: 5.2vw é onde "LEARNING ENGINEER" (Instrument Sans
            700) encosta na margem direita sem estourar. A margem negativa deixa
            as linhas encostarem na área transparente do canvas, mantendo a
            sobreposição tipografia/cabeça do mockup. */}
        <h1 className="relative z-[1] m-0 -ml-[5vw] flex min-w-0 flex-1 select-none flex-col justify-center self-center font-display text-[clamp(26px,5.2vw,150px)] leading-[0.94] font-bold tracking-[-0.03em] whitespace-nowrap max-[860px]:ml-0 max-[860px]:w-full max-[860px]:flex-none max-[860px]:text-[clamp(26px,8.6vw,64px)]">
          <span className="block w-full text-right">
            AI &amp; <span className="text-[var(--accent-ink)]">MACHINE</span>
          </span>
          <span className="block w-full text-left">LEARNING ENGINEER</span>
        </h1>
      </div>
    </section>
  );
}
