import { Section, SectionHeader } from "@/components/Section";
import { KinematicArm } from "@/components/KinematicArm";
import { contactChannels } from "@/lib/contact";

// Contato — redesign completo (2026-09-04, retrabalhado no mesmo dia depois
// de review visual do usuário: a primeira versão saiu fraca demais perto do
// resto do site — ver CONTEXTO.md §5.6). Substitui por inteiro a versão
// anterior (rede de partículas em formato de cérebro + painel HUD "Jarvis"):
// o PRODUCT.md do projeto bane esse motivo como clichê de IA genérica.
//
// Hierarquia: um CTA dominante (e-mail, ação direta via mailto) em vez de 5
// canais com peso igual — só canais com link real renderizam. Sem modal.
// Header + conteúdo que preenche a altura, o mesmo ritmo que Experiência e
// Stack já usam — nada de ilha pequena boiando no meio de uma seção vazia.
const email = contactChannels.find((c) => c.id === "email")!;
const secondaryChannels = contactChannels.filter((c) => c.id !== "email" && c.href);
// se a coluna precisar quebrar linha, quebrar no "@" (via <wbr/>) — sem isso
// o navegador corta em qualquer ponto no meio do domínio (ex. "gm/ail.com")
const [emailLocal, emailDomain] = email.handle.split("@");

export function Contact() {
  return (
    <Section id="contato" index="06">
      <div className="grid flex-1 grid-rows-[auto_minmax(0,1fr)] gap-8">
        <SectionHeader index="06" label="Contato" title="Vamos conversar." />

        <div className="grid grid-cols-1 items-stretch gap-12 min-[861px]:grid-cols-[minmax(0,1fr)_minmax(0,440px)] min-[861px]:gap-[4vw]">
          {/* peça: braço mecânico esquemático dentro de um painel de
              instrumento (borda + elevação — o mesmo tratamento que o resto
              do site usa pra dar peso a um elemento visual: moldura do anel
              no Sobre, tela da esfera no Stack). Sem o painel, o traço fino
              flutuava sozinho na página e lia como esboço, não como peça. */}
          <div className="elevated relative flex h-[min(50vh,440px)] items-center justify-center overflow-hidden rounded-[28px] border border-line bg-surface-2 min-[861px]:h-full min-[861px]:min-h-[min(380px,44vh)]">
            {[
              "top-4 left-4 border-t border-l",
              "top-4 right-4 border-t border-r",
              "bottom-4 left-4 border-b border-l",
              "bottom-4 right-4 border-b border-r",
            ].map((pos) => (
              <span key={pos} aria-hidden className={`absolute h-3 w-3 border-ink-faint ${pos}`} />
            ))}
            <span
              aria-hidden
              className="absolute top-6 left-7 font-mono text-[10px] tracking-[0.14em] text-ink-faint uppercase"
            >
              Reach diagram · 2 DOF
            </span>
            {/* o teto de altura não é estética: o viewBox 320×300 dá altura
                intrínseca ao SVG (520px de largura → 487px de altura) e era ELE
                que definia a altura da linha, estourando a seção em tela baixa */}
            <KinematicArm className="h-[80%] max-h-[min(440px,52vh)] w-[80%] max-w-130" />
          </div>

          {/* CTA + canais secundários, centralizados na altura da linha */}
          <div className="flex flex-col justify-center gap-[clamp(20px,5vh,40px)]">
            <div>
              <span className="elevated inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
                {email.protocol} · resposta em até 24h
              </span>
              <a
                href={email.href!}
                className="group mt-4 block font-display text-[clamp(28px,4.2vw,50px)] leading-[1.08] font-bold tracking-[-0.02em] text-ink transition-colors duration-200 hover:text-accent-ink"
              >
                {emailLocal}@<wbr />
                {emailDomain}
                <span aria-hidden className="mt-3 block h-0.75 w-18.5 rounded-full bg-accent-ink transition-[width] duration-300 group-hover:w-27.5" />
              </a>
            </div>

            <div className="flex flex-row flex-wrap gap-x-8 gap-y-6 min-[861px]:flex-col min-[861px]:gap-[clamp(10px,2.6vh,20px)]">
              {secondaryChannels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <a
                    key={ch.id}
                    href={ch.href!}
                    download={ch.id === "cv" ? true : undefined}
                    {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-full text-ink transition-colors duration-200 hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ink"
                  >
                    <span
                      aria-hidden
                      className="elevated flex h-12 w-12 flex-none items-center justify-center rounded-full text-ink-muted transition-colors duration-200 group-hover:text-accent-ink"
                      style={{
                        background:
                          "radial-gradient(circle at 34% 28%, var(--surface-2), var(--ink-faint) 78%)",
                      }}
                    >
                      <Icon size={19} strokeWidth={1.5} />
                    </span>
                    <span>
                      <span className="block font-mono text-[13px] tracking-[0.03em]">
                        {ch.label}
                        {ch.external && <span className="sr-only"> (abre em nova aba)</span>}
                      </span>
                      <span className="block font-mono text-[10px] text-ink-faint">{ch.protocol}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
