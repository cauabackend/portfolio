import { experiences } from "@/lib/resume";

// Design ⏳ não iniciado (CLAUDE.md §5.3). Lista crua a partir dos dados reais.
export function Experience() {
  return (
    <section id="experiencia" className="mx-auto w-full max-w-5xl px-6 py-24">
      <h2 className="text-2xl font-medium tracking-tight">Experiência</h2>
      <ul className="mt-8 space-y-8">
        {experiences
          .filter((e) => e.period)
          .map((e) => (
            <li key={e.id}>
              <p className="font-medium">
                {e.org} — {e.role}
              </p>
              <p className="text-sm opacity-50">{e.period}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm opacity-70">
                {e.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </section>
  );
}
