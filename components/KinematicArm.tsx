"use client";

import { motion, useReducedMotion } from "motion/react";

// "Kinematic Reach" — braço mecânico esquemático apontando pro CTA de e-mail
// do Contato (redesign 2026-09-04, retrabalhado no mesmo dia depois de review
// visual: a v1 saiu fina demais pro nível de acabamento do resto do site —
// ver CONTEXTO.md §5.6). Grade de blueprint + anel de alcance tracejado +
// metal com gradiente + juntas cromadas + sombra de contato + glow na
// retícula: a mesma linguagem de elevação/material usada no Hero/Sobre/Stack,
// só que desenhada em 2D/traço em vez de malha 3D real — ligada a
// robótica/engenharia, nunca ao cérebro/rede-neural banido no PRODUCT.md.
const EASE = [0.16, 1, 0.3, 1] as const;

export function KinematicArm({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion() ?? false;

  const draw = (delay: number) => ({
    initial: reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: reduced ? { duration: 0 } : { duration: 0.85, delay, ease: EASE },
  });
  const fade = (delay: number) => ({
    initial: reduced ? { opacity: 1 } : { opacity: 0 },
    animate: { opacity: 1 },
    transition: reduced ? { duration: 0 } : { duration: 0.5, delay, ease: EASE },
  });

  return (
    <svg
      aria-hidden
      viewBox="0 0 320 300"
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <pattern id="ka-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--ink-faint)" />
        </pattern>
        <radialGradient id="ka-fade" cx="30%" cy="82%" r="80%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="ka-mask">
          <rect width="320" height="300" fill="url(#ka-fade)" />
        </mask>
        <linearGradient id="ka-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--ink-faint)" />
          <stop offset="55%" stopColor="var(--accent-ink)" />
          <stop offset="100%" stopColor="var(--ink-muted)" />
        </linearGradient>
        <radialGradient id="ka-joint" cx="35%" cy="28%" r="75%">
          <stop offset="0%" stopColor="var(--surface-2)" />
          <stop offset="55%" stopColor="var(--ink-faint)" />
          <stop offset="100%" stopColor="var(--accent-ink)" />
        </radialGradient>
        <filter id="ka-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="ka-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {/* textura de blueprint — grade de pontos esmaecendo pra fora, sempre
          visível de cara (não gated por animação): é fundo, não conteúdo */}
      <rect width="320" height="300" fill="url(#ka-dots)" mask="url(#ka-mask)" />

      {/* anel de alcance (dashed) + sombra de contato da base — estáticos */}
      <circle cx="47" cy="254" r="72" fill="none" stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="2 6" opacity="0.6" />
      <ellipse cx="47" cy="266" rx="32" ry="7" fill="rgba(15,17,17,0.18)" filter="url(#ka-blur)" />

      {/* base fixa */}
      <motion.g {...fade(0)}>
        <rect x="30" y="246" width="34" height="14" rx="2" fill="var(--surface-2)" stroke="var(--ink-muted)" strokeWidth="1.5" />
        <circle cx="37" cy="253" r="1.6" fill="var(--ink-muted)" />
        <circle cx="57" cy="253" r="1.6" fill="var(--ink-muted)" />
      </motion.g>

      {/* braço: sombra de contato própria (elevação) via drop-shadow no grupo */}
      <g style={{ filter: "drop-shadow(0 6px 10px rgba(15,17,17,0.22))" }}>
        {/* segmento 1 */}
        <motion.line x1="47" y1="252" x2="168" y2="150" stroke="url(#ka-metal)" strokeWidth="6" strokeLinecap="round" {...draw(0.15)} />
        {/* junta 1 */}
        <motion.circle cx="168" cy="150" r="11" fill="url(#ka-joint)" stroke="var(--accent-ink)" strokeWidth="1.5" {...fade(0.95)} />

        {/* segmento 2 */}
        <motion.line x1="174" y1="144" x2="270" y2="64" stroke="url(#ka-metal)" strokeWidth="5" strokeLinecap="round" {...draw(1)} />
        {/* junta 2 / punho */}
        <motion.circle cx="270" cy="64" r="7" fill="url(#ka-joint)" stroke="var(--accent-ink)" strokeWidth="1.5" {...fade(1.7)} />
      </g>

      {/* anotações de ângulo, estilo dimensão de CAD */}
      <motion.text x="118" y="216" fontSize="11" fill="var(--ink-muted)" style={{ fontFamily: "var(--font-plex-mono)" }} {...fade(1.05)}>
        48.2°
      </motion.text>
      <motion.text x="182" y="182" fontSize="11" fill="var(--ink-muted)" style={{ fontFamily: "var(--font-plex-mono)" }} {...fade(1.8)}>
        112°
      </motion.text>

      {/* linha de mira tracejada até o CTA + retícula com glow */}
      <motion.line x1="275" y1="59" x2="304" y2="32" stroke="var(--accent-ink)" strokeWidth="1.2" strokeDasharray="2 4" {...draw(1.75)} />
      <motion.g {...fade(2.25)}>
        <circle cx="304" cy="32" r="12" fill="none" stroke="var(--accent-ink)" strokeWidth="1.3" filter="url(#ka-glow)" opacity="0.7" />
        <circle cx="304" cy="32" r="4" fill="var(--accent-ink)" />
        <line x1="304" y1="16" x2="304" y2="48" stroke="var(--accent-ink)" strokeWidth="1" />
        <line x1="288" y1="32" x2="320" y2="32" stroke="var(--accent-ink)" strokeWidth="1" />
      </motion.g>
    </svg>
  );
}
