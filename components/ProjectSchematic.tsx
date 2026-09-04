"use client";

import { motion, useReducedMotion } from "motion/react";

// Esquema por projeto (CONTEXTO.md §5.5) — o que substitui a placa preta vazia
// do card dedicado. Mesma linguagem do `KinematicArm` do Contato (grade de
// blueprint esmaecendo, traço de CAD com gradiente de metal, juntas cromadas,
// anotações em mono, retícula com glow): é o motivo visual que o site já usa
// para "instrumento", agora aplicado a cada projeto.
//
// ⚠️ Regra de dados (§4 do CONTEXTO): nenhum número é inventado. Só aparecem
// fatos do currículo (114k faixas, Sigstore/in-toto, RAG, múltiplos agentes).
// Barras e pontos são DESENHO — nunca carregam eixo, escala ou valor impresso,
// o mesmo limite já aceito para os anéis decorativos do site.

const EASE = [0.16, 1, 0.3, 1] as const;

export const SCHEMATIC_CAPTION: Record<string, string> = {
  aletheia: "Cadeia de atestação · Sigstore + in-toto",
  "bravend-core": "Pipeline · recuperação → agentes",
  resonance: "Classificação · 114k faixas",
};

/** ruído determinístico: LCG semeado — `Math.random` divergiria entre renders */
function scatter(seed: number, count: number) {
  let s = seed;
  const next = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
  return Array.from({ length: count }, (_, i) => {
    // duas nuvens levemente separadas: é o que faz a curva tracejada ter função
    const hit = i % 3 === 0;
    const cx = hit ? 0.62 : 0.38;
    const cy = hit ? 0.36 : 0.64;
    // soma de dois uniformes ≈ sino: nuvem, não retângulo de ruído
    const jx = (next() + next() - 1) * 0.3;
    const jy = (next() + next() - 1) * 0.3;
    return { x: cx + jx, y: cy + jy, hit };
  });
}

const DOTS = scatter(20250904, 132);

/** bloco de assinatura do selo: filetes de larguras irregulares, sem texto falso */
const SIGNATURE_BLOCK = [9, 16, 6, 22, 11, 7, 18, 13, 24, 8, 15, 10].map((w, i, all) => ({
  w,
  x: 18 + all.slice(0, i).reduce((sum, prev) => sum + prev + 4, 0),
}));

export function ProjectSchematic({ id, className = "" }: { id: string; className?: string }) {
  const reduced = useReducedMotion() ?? false;

  const draw = (delay: number) => ({
    initial: reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: reduced ? { duration: 0 } : { duration: 0.7, delay, ease: EASE },
  });
  const fade = (delay: number, opacity = 1) => ({
    initial: reduced ? { opacity } : { opacity: 0 },
    animate: { opacity },
    transition: reduced ? { duration: 0 } : { duration: 0.45, delay, ease: EASE },
  });

  return (
    <svg aria-hidden viewBox="0 0 320 240" className={className}>
      <defs>
        <pattern id="ps-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--ink-faint)" />
        </pattern>
        <radialGradient id="ps-fade" cx="50%" cy="50%" r="62%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="ps-mask">
          <rect width="320" height="240" fill="url(#ps-fade)" />
        </mask>
        <linearGradient id="ps-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--ink-faint)" />
          <stop offset="55%" stopColor="var(--accent-ink)" />
          <stop offset="100%" stopColor="var(--ink-muted)" />
        </linearGradient>
        <radialGradient id="ps-joint" cx="35%" cy="28%" r="75%">
          <stop offset="0%" stopColor="var(--surface-2)" />
          <stop offset="55%" stopColor="var(--ink-faint)" />
          <stop offset="100%" stopColor="var(--accent-ink)" />
        </radialGradient>
        <filter id="ps-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
        <filter id="ps-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* fundo de blueprint: sempre visível, nunca preso a animação */}
      <rect width="320" height="240" fill="url(#ps-dots)" mask="url(#ps-mask)" />

      {id === "aletheia" && <Attestation draw={draw} fade={fade} />}
      {id === "bravend-core" && <Pipeline draw={draw} fade={fade} />}
      {id === "resonance" && <Classifier draw={draw} fade={fade} />}
    </svg>
  );
}

type Anim = {
  draw: (delay: number) => object;
  fade: (delay: number, opacity?: number) => object;
};

const MONO = { fontFamily: "var(--font-plex-mono)" } as const;

function Caption({
  x,
  y,
  children,
}: {
  x: number | string;
  y: number | string;
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize="8.5"
      letterSpacing="1.2"
      fill="var(--ink-muted)"
      textAnchor="middle"
      style={MONO}
    >
      {children}
    </text>
  );
}

// ── Aletheia: build → artefato → atestação assinada ─────────────────────────
function Attestation({ draw, fade }: Anim) {
  // a esteira ocupa a faixa esquerda e o selo a direita: as legendas são largas
  // em mono, e um passo a mais empurraria "ASSINADO" para fora do viewBox
  const plates = [
    { x: 12, label: "BUILD" },
    { x: 88, label: "ARTEFATO" },
    { x: 164, label: "ATESTAÇÃO" },
  ];

  return (
    <>
      {/* bracket de dimensão cobrindo a esteira, estilo cota de CAD */}
      <motion.g {...fade(0.05, 0.9)}>
        <path d="M16 54 v-8 H216 v8" fill="none" stroke="var(--ink-faint)" strokeWidth="1" />
        <text x="116" y="40" fontSize="8.5" letterSpacing="1.2" fill="var(--ink-muted)" textAnchor="middle" style={MONO}>
          GITHUB ACTIONS
        </text>
      </motion.g>

      {plates.map((plate, i) => (
        <motion.g key={plate.label} {...fade(0.15 + i * 0.18)}>
          <g style={{ filter: "drop-shadow(0 5px 8px rgba(15,17,17,0.16))" }}>
            <rect
              x={plate.x}
              y="88"
              width="56"
              height="46"
              rx="3"
              fill="var(--surface-2)"
              stroke="var(--accent-ink)"
              strokeWidth="1.4"
            />
          </g>
          {/* "conteúdo" da placa: filetes, não texto falso */}
          <path
            d={`M${plate.x + 10} 102 h26 M${plate.x + 10} 111 h36 M${plate.x + 10} 120 h18`}
            stroke="var(--ink-faint)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <Caption x={plate.x + 28} y="152">
            {plate.label}
          </Caption>
        </motion.g>
      ))}

      {/* elos da esteira */}
      {[68, 144].map((x, i) => (
        <motion.g key={x} {...draw(0.32 + i * 0.18)}>
          <line x1={x} y1="111" x2={x + 20} y2="111" stroke="var(--ink-muted)" strokeWidth="1.2" strokeDasharray="3 3" />
        </motion.g>
      ))}
      {[86, 162].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x - 5} 107 l5 4 l-5 4`}
          fill="none"
          stroke="var(--ink-muted)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...fade(0.5 + i * 0.18)}
        />
      ))}

      {/* selo: hexágono usinado com anel de alcance e glow */}
      <motion.g {...draw(0.72)}>
        <line x1="220" y1="111" x2="240" y2="111" stroke="var(--ink-muted)" strokeWidth="1.2" strokeDasharray="3 3" />
      </motion.g>
      <motion.g {...fade(0.9)}>
        <circle cx="272" cy="111" r="26" fill="none" stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="2 6" />
        <ellipse cx="272" cy="136" rx="15" ry="4" fill="rgba(15,17,17,0.16)" filter="url(#ps-blur)" />
        <path
          d="M272 94 l14.7 8.5 v17 L272 128 l-14.7-8.5 v-17 Z"
          fill="url(#ps-joint)"
          stroke="url(#ps-metal)"
          strokeWidth="1.6"
        />
        <circle cx="272" cy="111" r="9" fill="none" stroke="var(--accent-ink)" strokeWidth="1" opacity="0.7" filter="url(#ps-glow)" />
        <path
          d="M266.5 111.5 l4 4 l7.5-8.5"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Caption x="272" y="152">
          ASSINADO
        </Caption>
      </motion.g>

      {/* bloco de assinatura: filetes de larguras irregulares, sem texto falso */}
      <motion.g {...fade(1.15, 0.75)}>
        <text x="18" y="186" fontSize="8.5" letterSpacing="1.2" fill="var(--ink-muted)" style={MONO}>
          SIGSTORE · IN-TOTO
        </text>
        {SIGNATURE_BLOCK.map((seg) => (
          <rect key={seg.x} x={seg.x} y="198" width={seg.w} height="6" rx="1" fill="var(--ink-faint)" />
        ))}
      </motion.g>
    </>
  );
}

// ── Bravend: corpus → recuperação → agentes → resposta ──────────────────────
function Pipeline({ draw, fade }: Anim) {
  const corpus = [56, 79, 102, 125, 148];
  const agents = [66, 112, 158];

  return (
    <>
      {/* corpus: pilha de documentos reduzida a filetes */}
      <motion.g {...fade(0.05)}>
        {corpus.map((y) => (
          <rect key={y} x="16" y={y} width="42" height="12" rx="2" fill="var(--surface-2)" stroke="var(--ink-faint)" strokeWidth="1.2" />
        ))}
        <Caption x="37" y="176">
          CORPUS
        </Caption>
      </motion.g>

      {/* leque de recuperação */}
      {corpus.map((y, i) => (
        <motion.line
          key={y}
          x1="58"
          y1={y + 6}
          x2="112"
          y2="106"
          stroke="var(--ink-faint)"
          strokeWidth="1"
          {...draw(0.2 + i * 0.05)}
        />
      ))}

      {/* nó de recuperação: mostrador com coroa de ticks */}
      <motion.g {...fade(0.5)}>
        <g style={{ filter: "drop-shadow(0 5px 9px rgba(15,17,17,0.18))" }}>
          <circle cx="128" cy="106" r="17" fill="url(#ps-joint)" stroke="url(#ps-metal)" strokeWidth="1.6" />
        </g>
        <circle cx="128" cy="106" r="10" fill="none" stroke="var(--surface-2)" strokeWidth="1" opacity="0.8" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={128 + Math.cos(a) * 20.5}
              y1={106 + Math.sin(a) * 20.5}
              x2={128 + Math.cos(a) * 23.5}
              y2={106 + Math.sin(a) * 23.5}
              stroke="var(--ink-faint)"
              strokeWidth="1"
            />
          );
        })}
        <Caption x="128" y="176">
          RECUPERAÇÃO
        </Caption>
      </motion.g>

      {/* despacho para os agentes */}
      {agents.map((y, i) => (
        <motion.line
          key={y}
          x1="146"
          y1="106"
          x2="196"
          y2={y + 11}
          stroke="var(--ink-muted)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          {...draw(0.66 + i * 0.08)}
        />
      ))}

      {/* agentes: múltiplos, como no currículo */}
      {agents.map((y, i) => (
        <motion.g key={y} {...fade(0.86 + i * 0.08)}>
          <g style={{ filter: "drop-shadow(0 4px 7px rgba(15,17,17,0.16))" }}>
            <rect x="196" y={y} width="44" height="22" rx="4" fill="var(--surface-2)" stroke="var(--accent-ink)" strokeWidth="1.4" />
          </g>
          <circle cx={207} cy={y + 11} r="3.4" fill="url(#ps-joint)" stroke="var(--accent-ink)" strokeWidth="0.8" />
          <path d={`M216 ${y + 8} h16 M216 ${y + 14} h11`} stroke="var(--ink-faint)" strokeWidth="1.8" strokeLinecap="round" />
        </motion.g>
      ))}
      <motion.g {...fade(1.1)}>
        <Caption x="218" y="176">
          AGENTES
        </Caption>
      </motion.g>

      {/* convergência na saída + retícula */}
      {agents.map((y, i) => (
        <motion.line
          key={y}
          x1="240"
          y1={y + 11}
          x2="282"
          y2="106"
          stroke="var(--ink-faint)"
          strokeWidth="1"
          {...draw(1.02 + i * 0.06)}
        />
      ))}
      <motion.g {...fade(1.3)}>
        <circle cx="288" cy="106" r="13" fill="none" stroke="var(--accent-ink)" strokeWidth="1.3" opacity="0.7" filter="url(#ps-glow)" />
        <circle cx="288" cy="106" r="4" fill="var(--accent-ink)" />
        <line x1="288" y1="88" x2="288" y2="124" stroke="var(--accent-ink)" strokeWidth="1" />
        <line x1="270" y1="106" x2="306" y2="106" stroke="var(--accent-ink)" strokeWidth="1" />
        <Caption x="288" y="176">
          RESPOSTA
        </Caption>
      </motion.g>

      <motion.text x="16" y="212" fontSize="8.5" letterSpacing="1.2" fill="var(--ink-muted)" style={MONO} {...fade(1.45, 0.75)}>
        RAG · FINE-TUNING · ASSISTENTES ANALÍTICOS
      </motion.text>
    </>
  );
}

// ── Resonance: 114k faixas classificadas + atribuição SHAP ──────────────────
function Classifier({ draw, fade }: Anim) {
  // caixa do gráfico em coordenadas do viewBox
  const box = { x: 24, y: 34, w: 196, h: 140 };
  const px = (u: number) => box.x + u * box.w;
  const py = (v: number) => box.y + v * box.h;

  return (
    <>
      {/* eixos sem escala: é diagrama, não medição */}
      <motion.g {...fade(0.05)}>
        <path
          d={`M${box.x} ${box.y} v${box.h} h${box.w}`}
          fill="none"
          stroke="var(--ink-muted)"
          strokeWidth="1.2"
        />
        {[0.25, 0.5, 0.75].map((t) => (
          <g key={t}>
            <line x1={box.x - 3} y1={py(t)} x2={box.x} y2={py(t)} stroke="var(--ink-faint)" strokeWidth="1" />
            <line x1={px(t)} y1={box.y + box.h} x2={px(t)} y2={box.y + box.h + 3} stroke="var(--ink-faint)" strokeWidth="1" />
          </g>
        ))}
      </motion.g>

      {/* nuvem determinística — cada ponto é desenho, não um dado real */}
      <motion.g {...fade(0.2)}>
        {DOTS.map((d, i) =>
          d.x < 0 || d.x > 1 || d.y < 0 || d.y > 1 ? null : (
            <circle
              key={i}
              cx={px(d.x)}
              cy={py(d.y)}
              r={d.hit ? 2.3 : 1.9}
              fill={d.hit ? "var(--accent-ink)" : "none"}
              stroke={d.hit ? "none" : "var(--ink-faint)"}
              strokeWidth="1"
              opacity={d.hit ? 0.85 : 0.9}
            />
          ),
        )}
      </motion.g>

      {/* fronteira de decisão */}
      <motion.path
        d={`M${px(0.06)} ${py(0.92)} C ${px(0.4)} ${py(0.78)}, ${px(0.5)} ${py(0.34)}, ${px(0.94)} ${py(0.14)}`}
        fill="none"
        stroke="var(--accent-ink)"
        strokeWidth="1.4"
        strokeDasharray="5 4"
        {...draw(0.55)}
      />

      {/* ponto em análise + retícula com chamada */}
      <motion.g {...fade(1)}>
        <line x1={px(0.68)} y1={py(0.28)} x2="252" y2="52" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx={px(0.68)} cy={py(0.28)} r="9" fill="none" stroke="var(--accent-ink)" strokeWidth="1.2" opacity="0.75" filter="url(#ps-glow)" />
        <circle cx={px(0.68)} cy={py(0.28)} r="3" fill="var(--ink)" />
      </motion.g>

      {/* atribuição: barras sem eixo e sem valor — leitura de "peso", não de número */}
      <motion.g {...fade(1.15)}>
        <rect x="244" y="58" width="62" height="74" rx="4" fill="var(--surface-2)" stroke="var(--line)" strokeWidth="1" />
        <text x="252" y="72" fontSize="8" letterSpacing="1.2" fill="var(--ink-muted)" style={MONO}>
          SHAP
        </text>
        {[42, 30, 22, 14].map((w, i) => (
          <g key={w}>
            <line x1="252" y1={86 + i * 12} x2="252" y2={92 + i * 12} stroke="var(--ink-faint)" strokeWidth="1" />
            <rect x="252" y={85 + i * 12} width={w} height="6" rx="1" fill={i === 0 ? "var(--accent-ink)" : "var(--ink-faint)"} />
          </g>
        ))}
      </motion.g>

      <motion.text x="24" y="206" fontSize="8.5" letterSpacing="1.2" fill="var(--ink-muted)" style={MONO} {...fade(1.3, 0.8)}>
        114K FAIXAS · SPOTIFY
      </motion.text>
      <motion.text x="24" y="222" fontSize="8.5" letterSpacing="1.2" fill="var(--ink-faint)" style={MONO} {...fade(1.4, 0.8)}>
        XGBOOST · CLASSES DESBALANCEADAS
      </motion.text>
    </>
  );
}
