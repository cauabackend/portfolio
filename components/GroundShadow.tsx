// Sombra de contato do sistema de elevação (CLAUDE.md §5.1) — o que impede a
// página de ficar chapada. São DUAS camadas de propósito: um núcleo curto e
// denso logo abaixo do objeto, que dá o assentamento, e um halo largo e muito
// difuso, que dá a luz ambiente ocluída em volta. Uma elipse só, com um
// gradiente único, lê como uma mancha cinza flutuando solta — foi o defeito
// apontado na peça da Experiência.
//
// `className` define a caixa do núcleo (posição + tamanho); o halo se deriva dela.
export function GroundShadow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${className}`}
    >
      <span className="absolute top-1/2 left-1/2 h-[150%] w-[210%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(15,17,17,.09),transparent_66%)] blur-[20px]" />
      <span className="absolute inset-0 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(15,17,17,.28),rgba(15,17,17,.11)_44%,transparent_72%)] blur-[8px]" />
    </span>
  );
}
