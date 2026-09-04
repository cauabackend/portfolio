// Projetos (CONTEXTO.md §5.5). Só o que consta na Seção 4 do CONTEXTO —
// nenhum projeto, métrica ou link inventado.
//
// `repo`/`site` null = URL ainda não fornecida: o botão simplesmente não
// renderiza (mesma regra dos canais em lib/contact.tsx). Preencher aqui faz o
// link aparecer no card dedicado, sem tocar em componente.

export type Project = {
  id: string;
  name: string;
  /** contexto curto: onde o projeto vive */
  org: string;
  /** uma linha, é o que aparece na face do carrossel */
  tagline: string;
  period: string;
  /** parágrafo do card dedicado — paráfrase dos highlights, sem fato novo */
  summary: string;
  highlights: string[];
  tags: string[];
  repo: string | null;
  site: string | null;
  /** documento público do projeto (PDF em public/papers) — mesma regra: null não renderiza */
  paper: { href: string; label: string } | null;
};

export const projects: ReadonlyArray<Project> = [
  {
    id: "aletheia",
    name: "Aletheia",
    org: "Co-Founder & AI Engineer",
    tagline: "Governança de IA com atestação criptográfica",
    period: "2026 – presente",
    summary:
      "Governança de IA: cada artefato produzido na esteira recebe atestação criptográfica via Sigstore e in-toto, e o desvio entre execuções de modelos estocásticos é medido com estatística — não com achismo.",
    highlights: [
      "Atestação criptográfica integrada ao Sigstore e in-toto via GitHub Actions",
      "Testes pareados de Wilcoxon e bootstrap por agrupamento para medir desvios em modelos estocásticos",
    ],
    tags: ["Sigstore", "in-toto", "GitHub Actions", "Wilcoxon", "Bootstrap"],
    repo: null,
    site: null,
    paper: { href: "/papers/aletheia.pdf", label: "Ler o artigo" },
  },
  {
    id: "bravend-core",
    name: "Core de IA",
    // "Engenharia de IA & ML" saiu daqui em 2026-09-04: o cargo dele na Bravend
    // é Software Engineer (ver correção na Seção 4). O núcleo de IA é onde o
    // projeto vive, e é isso que esta linha diz.
    org: "Bravend · Núcleo de IA",
    tagline: "Agentes LLM, pipelines RAG e assistentes analíticos",
    period: "jun/2026 – presente",
    summary:
      "Atuação central no core de IA da empresa: fine-tuning de múltiplos agentes LLM (Claude, OpenAI, Codex), pipelines RAG e assistentes analíticos, com automação inteligente aplicada ao fluxo de trabalho.",
    highlights: [
      "Automação inteligente com ganho de eficiência de ~50%",
      "Fine-tuning de múltiplos agentes LLM reduzindo custos operacionais em 15%",
      "Pipelines RAG e assistentes analíticos",
    ],
    tags: ["Claude", "OpenAI", "Codex", "RAG", "Fine-tuning"],
    repo: null,
    site: null,
    paper: null,
  },
  {
    id: "resonance",
    name: "Resonance",
    // a Seção 4 lista Resonance sem organização; "Projeto" é o mesmo rótulo
    // que lib/resume.ts já usa — nada inferido além disso
    org: "Projeto",
    tagline: "Preditor de hits musicais sobre 114k faixas",
    period: "",
    summary:
      "Preditor de hits musicais treinado com XGBoost sobre 114 mil registros do Spotify, com tratamento de desbalanceamento de classes e interpretabilidade das predições via SHAP.",
    highlights: [
      "XGBoost sobre 114k registros do Spotify",
      "Tratamento de desbalanceamento de classes",
      "Interpretabilidade com SHAP",
    ],
    tags: ["Python", "XGBoost", "SHAP"],
    repo: null,
    site: null,
    paper: null,
  },
];
