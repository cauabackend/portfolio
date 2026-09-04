// Arte de capa procedural para as placas do carrossel (CONTEXTO.md §5.5).
//
// ⚠️ PROVISÓRIA: existe só para avaliar a forma do coverflow com "imagem" em
// cada cartão, enquanto não há print real dos projetos. É SVG determinístico
// pela `seed` — sem asset, sem rede, sem dependência — e sai inteira quando a
// arte de verdade entrar.
//
// Tons neutros de propósito: a paleta do site é cinza e o acento é neutro
// (§5.1). Trocar a lista `TONES` é o que muda tudo se um dia entrar cor.

const TONES = ["#07080a", "#101316", "#191d21", "#23282c", "#31373b", "#454c50", "#5d6469"];

/** LCG semeada pela string: mesma capa para o mesmo projeto, sempre. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0;
    return h / 4294967296;
  };
}

export function CoverArt({ seed, className = "" }: { seed: string; className?: string }) {
  const rand = seeded(seed);
  const id = `ca-${seed.replace(/[^a-z0-9]/gi, "")}`;
  const pick = (skip = 0) => TONES[Math.floor(rand() * (TONES.length - skip)) + skip];

  const base = pick();
  const lift = pick(3);
  const angle = Math.floor(rand() * 360);
  const layout = Math.floor(rand() * 3);
  // posições das peças grandes: sempre fora do centro, senão a capa fica um
  // alvo simétrico e todas leem iguais
  const cx = 22 + rand() * 56;
  const cy = 20 + rand() * 55;
  const r = 26 + rand() * 26;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-bg`} gradientTransform={`rotate(${angle} 0.5 0.5)`}>
          <stop offset="0%" stopColor={lift} />
          <stop offset="100%" stopColor={base} />
        </linearGradient>
        <radialGradient id={`${id}-orb`}>
          <stop offset="0%" stopColor={pick(4)} stopOpacity="0.95" />
          <stop offset="100%" stopColor={base} stopOpacity="0" />
        </radialGradient>
        {/* grão: é ele que tira o aspecto de "gradiente de CSS" e aproxima de
            uma imagem — turbulência fina, quase invisível, em modo overlay */}
        <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed={angle} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <radialGradient id={`${id}-vig`}>
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
      </defs>

      <rect width="100" height="100" fill={`url(#${id}-bg)`} />

      {layout === 0 && (
        <>
          <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-orb)`} />
          <path d={`M0 ${62 + rand() * 16} Q 50 ${40 + rand() * 30} 100 ${58 + rand() * 20} V100 H0 Z`} fill={base} opacity="0.85" />
        </>
      )}

      {layout === 1 &&
        Array.from({ length: 5 }, (_, i) => (
          <rect
            key={i}
            x={-30}
            y={i * 26 - 20}
            width={160}
            height={6 + rand() * 12}
            fill={pick(2)}
            opacity={0.25 + rand() * 0.45}
            transform={`rotate(${-24 + (angle % 40)} 50 50)`}
          />
        ))}

      {layout === 2 && (
        <>
          {Array.from({ length: 4 }, (_, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={12 + i * (r / 3)}
              fill="none"
              stroke={pick(3)}
              strokeWidth={0.6 + rand() * 1.6}
              opacity={0.7 - i * 0.12}
            />
          ))}
          <rect x={0} y={70 + rand() * 12} width={100} height={40} fill={base} opacity="0.7" />
        </>
      )}

      <rect width="100" height="100" filter={`url(#${id}-grain)`} opacity="0.22" style={{ mixBlendMode: "overlay" }} />
      <rect width="100" height="100" fill={`url(#${id}-vig)`} />
    </svg>
  );
}
