"use client";

import { useEffect, useState } from "react";
import { Briefcase, Cpu, House, Layers, Mail, User } from "lucide-react";
import { sections } from "@/lib/resume";

// Dock flutuante inferior (CONTEXTO.md §5.1): pill escura, ícones, item ativo no
// accent. O separador isola o contato do resto da navegação de conteúdo.
const ICONS = { hero: House, sobre: User, expertise: Cpu, experiencia: Briefcase, projetos: Layers, contato: Mail };

export function Nav() {
  const [current, setCurrent] = useState<string>(sections[0].id);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    // A seção "ativa" é a que ocupa a faixa central da viewport — a mais visível
    // entre as que cruzam essa faixa vence, evitando troca dupla em transições.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) => (a.intersectionRatio >= b.intersectionRatio ? a : b));
        setCurrent(top.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Seções"
      className="fixed bottom-[22px] left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-[20px] bg-[#191a1a] p-[9px] shadow-[var(--shadow-lg)]"
    >
      {sections.map((s) => {
        const Icon = ICONS[s.id];
        const active = current === s.id;
        return (
          <span key={s.id} className="contents">
            {s.id === "contato" && (
              <span aria-hidden className="mx-1 h-5 w-px bg-white/15" />
            )}
            <a
              href={`#${s.id}`}
              title={s.label}
              aria-label={s.label}
              aria-current={active ? "true" : undefined}
              className={`flex h-[38px] w-[38px] items-center justify-center rounded-[13px] transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                active
                  ? "bg-[var(--accent)] text-[#191a1a] opacity-100"
                  : "text-[#e7e8e7] opacity-70 hover:bg-white/10 hover:opacity-100"
              }`}
            >
              <Icon size={17} strokeWidth={1.8} aria-hidden />
            </a>
          </span>
        );
      })}
    </nav>
  );
}
