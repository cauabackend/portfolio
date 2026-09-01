// Fonte única de conteúdo do site. Espelha a Seção 4 do CLAUDE.md.
// Não adicionar nada aqui que não esteja no currículo real.

export const profile = {
  name: "Cauã Pereira da Silva",
  role: "AI & Machine Learning Engineer",
  location: "São Paulo, SP",
  email: "cauabackend@gmail.com",
} as const;

export const education = {
  degree: "Bacharelado em Engenharia de Software",
  school: "FIAP",
  start: "2025",
  end: "jun/2029",
  status: "3º semestre",
} as const;

export const languages = [
  { name: "Português", level: "nativo" },
  { name: "Inglês", level: "B2" },
  { name: "Espanhol", level: "B1" },
] as const;

export type Experience = {
  id: string;
  org: string;
  role: string;
  period: string;
  current: boolean;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    id: "bravend",
    org: "Bravend",
    role: "Estágio em Engenharia de IA & ML",
    period: "jun/2026 – presente",
    current: true,
    highlights: [
      "Atuação central no core de IA da empresa",
      "Automação inteligente com ganho de eficiência de ~50%",
      "Fine-tuning de múltiplos agentes LLM (Claude, OpenAI, Codex), reduzindo custos operacionais em 15%",
      "Pipelines RAG e assistentes analíticos",
    ],
  },
  {
    id: "aletheia",
    org: "Aletheia",
    role: "Co-Founder & AI Engineer",
    period: "2025 – presente",
    current: true,
    highlights: [
      "Governança de IA",
      "Atestação criptográfica integrada ao Sigstore e in-toto via GitHub Actions",
      "Rigor estatístico: testes pareados de Wilcoxon e bootstrap por agrupamento para medir desvios em modelos estocásticos",
    ],
  },
  {
    id: "resonance",
    org: "Resonance",
    role: "Projeto",
    period: "",
    current: false,
    highlights: [
      "Preditor de hits musicais com XGBoost sobre 114k registros do Spotify",
      "Tratamento de desbalanceamento de classes",
      "Interpretabilidade com SHAP",
    ],
  },
];

// Copy da seção Sobre — texto aprovado no mockup sobre-v1.html (CLAUDE.md §5.2).
// Marcações inline viram <b>/<span class="muted"> no componente.
export const about = {
  paragraphs: [
    [
      { t: "Comecei como desenvolvedor " },
      { t: "full-stack", muted: true },
      { t: " — hoje o foco é " },
      { t: "engenharia de IA", strong: true },
      { t: ": fine-tuning de agentes LLM, pipelines RAG e governança de sistemas estocásticos." },
    ],
    [
      { t: "Atuo no core de IA da " },
      { t: "Bravend", strong: true },
      { t: " e co-fundo a " },
      { t: "Aletheia", strong: true },
      {
        t: ", onde uso rigor estatístico — testes de Wilcoxon, bootstrap por agrupamento — pra medir desvio real em modelos de IA, não achismo. ",
      },
      { t: "Engenharia de Software na FIAP, em andamento.", muted: true },
    ],
  ],
  fields: [
    { k: "Nome", v: profile.name },
    { k: "Local", v: profile.location },
    { k: "Formação", v: "Eng. de Software — FIAP", sub: "· 2025–2029" },
    { k: "Idiomas", v: "PT nativo · EN B2 · ES B1" },
    { k: "Foco", v: "Full-Stack → AI & ML Engineer" },
  ],
} as const;

// Nós da esfera geodésica (CLAUDE.md §5.3). Só as ferramentas que têm logo de
// marca real — SVGs baixados uma vez para public/icons/stack/ (sem CDN em runtime).
// XGBoost/SHAP/Sigstore/in-toto e soft skills seguem pendentes de decisão.
export const stack = [
  { label: "Python", icon: "python" },
  { label: "Claude", icon: "anthropic" },
  { label: "OpenAI", icon: "openai" },
  { label: "Next.js", icon: "nextjs" },
  { label: "React", icon: "react" },
  { label: "TypeScript", icon: "typescript" },
  { label: "JavaScript", icon: "javascript" },
  { label: "Node.js", icon: "nodejs" },
  { label: "Tailwind CSS", icon: "tailwindcss" },
  { label: "Git", icon: "git" },
  { label: "GitHub", icon: "github" },
  { label: "GitHub Actions", icon: "githubactions" },
] as const;

// Âncoras da navegação single-page. A ordem define a ordem das seções na página.
export const sections = [
  { id: "hero", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "expertise", label: "Expertise" },
  { id: "experiencia", label: "Experiência" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
] as const;
