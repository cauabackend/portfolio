import Image from "next/image";
import { about } from "@/lib/resume";

// Sobre aprovado — CLAUDE.md §5.2 (mockup design/sobre-v1.html).
const RINGS = [
  { src: "/images/sobre/ring_outer.png", anim: "animate-[ring-spin-cw_200s_linear_infinite]" },
  { src: "/images/sobre/ring_mid.png", anim: "animate-[ring-spin-ccw_150s_linear_infinite]" },
  { src: "/images/sobre/ring_inner.png", anim: "animate-[ring-spin-cw_110s_linear_infinite]" },
  // A camada de anotações (leader-lines + labels tipo RETICLE_APEX) foi retirada
  // a pedido do usuário: em tela, o texto minúsculo lia como ruído e derrubava o
  // acabamento do anel. O PNG segue em public/images/sobre caso volte.
];

export function Sobre() {
  return (
    <section id="sobre" className="relative px-[6vw] pt-[min(12vw,130px)] pb-[min(10vw,110px)]">
      <div className="mx-auto max-w-[1600px]">
        <p className="mb-[72px] flex items-center justify-center gap-[10px] font-mono text-xs tracking-[0.14em] text-[var(--ink-muted)] uppercase">
          <span aria-hidden className="h-px w-[60px] bg-[var(--line)]" />
          <span className="font-medium text-[var(--accent-ink)]">02</span> Sobre
          <span aria-hidden className="h-px w-[60px] bg-[var(--line)]" />
        </p>

        <div className="flex items-center gap-[min(5.5vw,80px)] max-[720px]:flex-col max-[720px]:gap-9">
          {/* overflow-hidden contém a caixa girada dos anéis (a diagonal do PNG
              quadrado estoura a viewport no mobile); a arte é circular, nada some. */}
          <div className="relative flex aspect-square w-[min(50vw,1000px)] flex-none items-center justify-center overflow-hidden max-[720px]:w-[min(76vw,340px)]">
            {RINGS.map((r) => (
              <Image
                key={r.src}
                src={r.src}
                alt=""
                aria-hidden
                width={1100}
                height={1100}
                // gradiente metálico sutil: a compressão padrão (75) borra as
                // bandas do anel e cria banding visível
                quality={100}
                sizes="(max-width: 720px) 76vw, 50vw"
                priority
                className={`pointer-events-none absolute inset-0 h-full w-full select-none ${r.anim}`}
              />
            ))}

            {/* TODO: foto real do Cauã entra aqui (asset ainda não fornecido). */}
            <div className="relative z-[2] flex h-[32%] w-[32%] items-center justify-center rounded-full bg-[linear-gradient(155deg,#fcfcfb,#d6d7d5_60%,#adafac)] shadow-[inset_0_-16px_30px_rgba(15,17,17,.11),inset_0_12px_20px_rgba(255,255,255,.85),var(--shadow-lg)]">
              <span
                aria-hidden
                className="absolute inset-[5%] rounded-full border border-[rgba(25,26,26,.14)]"
              />
              <span className="px-[20%] text-center font-mono text-[11px] tracking-[0.05em] text-[var(--ink-faint)]">
                ‹ foto entra aqui ›
              </span>
            </div>
          </div>

          <div className="min-w-0 max-w-[460px] flex-auto max-[720px]:max-w-[520px]">
            {about.paragraphs.map((parts, i) => (
              <p
                key={i}
                className="m-0 font-display text-[clamp(16.5px,1.55vw,19.5px)] leading-[1.62] font-medium tracking-[-0.005em] not-first:mt-[14px] max-[720px]:text-center"
              >
                {parts.map((p, j) => (
                  <span
                    key={j}
                    className={
                      "strong" in p && p.strong
                        ? "font-semibold text-[var(--accent-ink)]"
                        : "muted" in p && p.muted
                          ? "text-[var(--ink-muted)]"
                          : undefined
                    }
                  >
                    {p.t}
                  </span>
                ))}
              </p>
            ))}

            <dl className="mt-8 flex flex-col gap-[13px] border-t border-[var(--line)] pt-[26px] max-[720px]:items-center">
              {about.fields.map((f) => (
                <div key={f.k} className="flex items-baseline gap-[14px] max-[720px]:justify-center">
                  <dt className="w-[84px] flex-none font-mono text-[10.5px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">
                    {f.k}
                  </dt>
                  <dd className="m-0 font-mono text-sm leading-[1.5] tracking-[-0.005em]">
                    {f.v}
                    {"sub" in f && f.sub && (
                      <span className="ml-1 text-xs text-[var(--ink-muted)]">{f.sub}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
