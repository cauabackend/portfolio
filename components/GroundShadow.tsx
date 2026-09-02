import type { CSSProperties } from "react";

// Sombra de contato do sistema de elevação (CONTEXTO.md §5.1) — o que impede a
// página de ficar chapada. São DUAS camadas de propósito: um núcleo curto e
// denso logo abaixo do objeto, que dá o assentamento, e um halo largo e muito
// difuso, que dá a luz ambiente ocluída em volta. Uma elipse só, com um
// gradiente único, lê como uma mancha cinza flutuando solta.
//
// `className` define a caixa do núcleo (posição + tamanho); o halo se deriva
// dela. `strength` multiplica a densidade das duas camadas: o padrão 1 serve a
// peças pequenas, e valores acima disso existem porque uma peça grande precisa
// de sombra proporcional ao VOLUME, não à área de contato — sombra pequena sob
// objeto grande não lê como profundidade, lê como mancha solta.
export function GroundShadow({
  className = "",
  strength = 1,
}: {
  className?: string;
  strength?: number;
}) {
  const a = (base: number) => Math.min(base * strength, 1);
  // gradientes em style inline: com `calc()` dentro de rgba() as classes
  // arbitrárias do Tailwind ficam ilegíveis e frágeis de escapar
  const halo: CSSProperties = {
    background: `radial-gradient(ellipse at center, rgba(15,17,17,${a(0.09)}), transparent 66%)`,
  };
  const nucleo: CSSProperties = {
    background: `radial-gradient(ellipse at center, rgba(15,17,17,${a(0.28)}), rgba(15,17,17,${a(0.11)}) 44%, transparent 72%)`,
  };

  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${className}`}
    >
      <span
        style={halo}
        className="absolute top-1/2 left-1/2 h-[150%] w-[210%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[20px]"
      />
      <span style={nucleo} className="absolute inset-0 rounded-[50%] blur-[8px]" />
    </span>
  );
}
