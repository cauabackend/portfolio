import type { ReactNode } from "react";

// Shell comum a todas as seções (padronização pedida em 2026-09-01): cada seção
// ocupa uma tela como o Hero, com a mesma coluna, o mesmo respiro e o mesmo
// cabeçalho. O padding de cima é maior porque a navbar flutua sobre o conteúdo.
export function Section({
  id,
  index,
  children,
  className = "",
  innerClassName = "",
}: {
  id: string;
  // liga a seção ao h2 do SectionHeader: sem nome acessível, uma <section> nem
  // é exposta como região navegável — e o dock manda o usuário direto pra elas
  index: string;
  children: ReactNode;
  className?: string;
  // o alinhamento vertical do conteúdo mora no container interno: é ele que tem
  // o flex-1, então justify-* no <section> não teria o que distribuir
  innerClassName?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`sec-${index}-title`}
      // dvh, não vh: no mobile 100vh é a viewport SEM a barra de endereço, então
      // com ela visível a seção fica mais alta que a tela e o respiro do dock some
      // O respiro é clamp por ALTURA, não max(): numa tela baixa (720px de
      // viewport é o caso real do usuário, com zoom de navegador) 88+72px de
      // padding fixo comem 22% da tela e empurram o fim da seção pra fora.
      className={`relative flex min-h-dvh flex-col px-[5vw] pt-[clamp(52px,8vh,88px)] pb-[clamp(40px,6vh,72px)] ${className}`}
    >
      <div className={`mx-auto flex w-full max-w-[1600px] flex-1 flex-col ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}

// Eyebrow numerado + título, sempre alinhados à esquerda: é a espinha que faltava
// — antes Sobre e Stack centralizavam o eyebrow e a Experiência alinhava à
// esquerda, e o conjunto lia como três páginas diferentes.
export function SectionHeader({
  index,
  label,
  title,
  children,
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={className}>
      <p className="m-0 flex items-center gap-[10px] font-mono text-xs tracking-[0.14em] text-[var(--ink-muted)] uppercase">
        <span className="font-medium text-[var(--accent-ink)]">{index}</span> {label}
        <span aria-hidden className="h-px w-[60px] bg-[var(--line)]" />
      </p>
      <h2
        id={`sec-${index}-title`}
        // o teto em vh entra no min() porque o título quebra em 2 linhas: numa
        // tela baixa ele sozinho comia ~90px do que a seção tinha pra distribuir
        className="m-0 mt-4 max-w-[18ch] font-display text-[clamp(26px,min(3.4vw,5.4vh),50px)] leading-[1.05] font-bold tracking-[-0.02em] text-balance"
      >
        {title}
      </h2>
      {children}
    </header>
  );
}
