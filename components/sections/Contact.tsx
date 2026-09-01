import { profile } from "@/lib/resume";

// Design ⏳ não iniciado (CLAUDE.md §5.5).
export function Contact() {
  return (
    <section id="contato" className="mx-auto w-full max-w-5xl px-6 py-24">
      <h2 className="text-2xl font-medium tracking-tight">Contato</h2>
      <p className="mt-4 text-sm">
        <a className="underline underline-offset-4" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </p>
    </section>
  );
}
