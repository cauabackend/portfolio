// Fonte única de conteúdo do site. Espelha a Seção 4 do CONTEXTO.md.
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
    // CORREÇÃO 2026-09-04 (dita pelo usuário), em dois passos: primeiro saiu
    // "Engenharia de IA & ML", que era o trabalho e não o cargo; depois o
    // usuário pediu o título sem a palavra estágio, só "Software Engineer".
    // Ele escreve o software do produto e, além disso, atua no núcleo de IA —
    // é o que o primeiro bullet passou a dizer. Mesmo título no PDF do
    // currículo (design/cv/curriculo.html); mudar um exige mudar o outro.
    role: "Software Engineer",
    period: "jun/2026 – presente",
    current: true,
    // Reescrito em 2026-09-04 para a voz do site, sem tirar nem acrescentar
    // fato. O bullet de currículo vinha em fragmento nominal com gerúndio de
    // fecho ("...reduzindo custos operacionais em 15%") e com adjetivo vago
    // ("automação inteligente"). Vira frase direta, com o número no fim, que é
    // onde o olho para. highlights[0] não é bullet, alimenta o subtítulo.
    highlights: [
      "Escrevo o software do produto e trabalho no núcleo de IA da empresa.",
      "Fiz fine-tuning dos agentes LLM sobre Claude, OpenAI e Codex. O ajuste tirou 15% do custo operacional.",
      "A automação que construí subiu a eficiência da operação em cerca de 50%.",
      "Construo os pipelines de RAG por trás dos assistentes analíticos.",
    ],
  },
  {
    id: "aletheia",
    org: "Aletheia",
    role: "Co-Founder & AI Engineer",
    period: "2026 – presente",
    current: true,
    // Frase nominal de propósito, e não no presente do indicativo: a Aletheia
    // AINDA ESTÁ EM CONSTRUÇÃO (dito pelo usuário em 2026-09-04). "A esteira
    // assina" seria sistema em operação. Os dois-pontos de "Rigor estatístico:"
    // saíram, o rótulo só anunciava o que a própria frase já diz.
    highlights: [
      "Plataforma de governança para modelos de IA, em construção.",
      "Atestação criptográfica de cada artefato com Sigstore e in-toto, pelo GitHub Actions.",
      "Desvio entre duas versões de um modelo medido com Wilcoxon pareado e bootstrap por agrupamento.",
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

// Linha de posicionamento da seção Experiência (§5.4) — copy fornecida pelo
// usuário em 2026-09-01, com o título alinhado ao profile.role do site.
// NÃO RENDERIZADO desde 2026-09-04. Era a linha do rodapé da coluna esquerda da
// Experiência e o usuário a rejeitou por vaga, com razão: "soluções baseadas em
// dados" não diz o que foi feito, e o pipe é resquício de headline de LinkedIn.
// O lugar dela passou a ser ocupado pela formação (FIAP), que é fato com data.
// Mantida aqui, e não apagada, caso ele queira a linha de posicionamento de volta.
export const careerSummary =
  "Desenvolvimento de soluções baseadas em dados | AI & Machine Learning Engineer";

// Copy da seção Sobre (CONTEXTO.md §5.2). Marcações inline viram
// <b>/<span class="muted"> no componente.
//
// Reescrita em 2026-09-04. A versão do mockup só repetia a trajetória que a
// seção Experiência já conta, e abria repetindo o próprio <h2>. Esta abre com a
// especialidade, põe no centro a tese que explica POR QUE ele trabalha assim
// (modelo estocástico não avisa quando piora) e só então usa o currículo como
// prova. A lista de dados (nome/local/formação/idiomas) foi removida da seção a
// pedido do usuário: formação, cidade e idiomas voltaram para o último
// parágrafo, e nome/foco já estão no Hero.
// Regras de escrita do texto: sem travessão, sem dois-pontos, sem ponto e
// vírgula e sem enumeração de três itens em paralelo. São os padrões que fazem
// um texto ler como gerado por máquina.
export const about = {
  paragraphs: [
    [
      { t: "Faço IA de ponta a ponta, do ajuste fino do modelo ao deploy e à governança em produção. Software determinístico quebra e você vê na hora. " },
      { t: "Modelo estocástico degrada calado", strong: true },
      { t: ", e responde com a mesma confiança de antes." },
    ],
    [
      // A Aletheia AINDA ESTÁ EM CONSTRUÇÃO (dito pelo usuário em 2026-09-04),
      // apesar de o "sobre" do LinkedIn dele descrever a esteira no presente.
      // Por isso a frase é de propósito, não de sistema em operação: "estou
      // construindo... para". Só trocar para o presente quando ele disser que
      // a esteira roda.
      { t: "Estou construindo a " },
      { t: "Aletheia", strong: true },
      {
        t: ", que co-fundei, para deixar esse caminho auditável. Cada etapa do pipeline assinada com Sigstore e in-toto, e nenhuma versão de modelo virando afirmação sem Wilcoxon pareado e bootstrap.",
      },
    ],
    [
      { t: "Na " },
      { t: "Bravend", strong: true },
      { t: " ajusto os agentes LLM sobre Claude, OpenAI e Codex e construo os pipelines RAG dos assistentes analíticos. O ajuste tirou " },
      { t: "15% do custo operacional", strong: true },
      { t: " e a automação subiu a eficiência em " },
      { t: "cerca de 50%", strong: true },
      { t: "." },
    ],
    // O parágrafo sobre o Resonance (XGBoost, 114k faixas, SHAP) foi escrito e
    // REMOVIDO a pedido do usuário em 2026-09-04. O projeto já tem card próprio
    // na seção Projetos; aqui ele alongava a seção sem acrescentar argumento.
  ],
  // Formação, cidade e idioma são conferência, não argumento. Viram uma linha de
  // dados em mono no pé da coluna em vez de um parágrafo com o mesmo peso visual
  // dos que carregam a prova.
  credentials: ["Eng. de Software, FIAP · 3º semestre", "São Paulo, SP", "Inglês B2 · Espanhol B1"],
} as const;

// Nós da esfera geodésica (CONTEXTO.md §5.3). Só as ferramentas do currículo que
// têm logo de marca real — SVGs baixados uma vez para public/icons/stack/ (sem CDN
// em runtime). O que não tem logotipo vive em `competencies`, logo abaixo.
export const stack = [
  { label: "Python", icon: "python" },
  { label: "Claude", icon: "anthropic" },
  { label: "OpenAI", icon: "openai" },
  { label: "Hugging Face", icon: "huggingface" },
  { label: "LangChain", icon: "langchain" },
  { label: "PyTorch", icon: "pytorch" },
  { label: "TensorFlow", icon: "tensorflow" },
  { label: "scikit-learn", icon: "scikitlearn" },
  { label: "Pandas", icon: "pandas" },
  { label: "NumPy", icon: "numpy" },
  { label: "FastAPI", icon: "fastapi" },
  { label: "Streamlit", icon: "streamlit" },
  { label: "PostgreSQL", icon: "postgresql" },
  { label: "MySQL", icon: "mysql" },
  { label: "Docker", icon: "docker" },
  { label: "AWS", icon: "aws" },
  // Vercel saiu do globo em 2026-09-04: caía colado no nó do GitHub Actions e os
  // dois logos brigavam pelo mesmo espaço. Continua fora do índice de texto.
  { label: "Git", icon: "git" },
  { label: "GitHub", icon: "github" },
  { label: "GitHub Actions", icon: "githubactions" },
  { label: "TypeScript", icon: "typescript" },
  { label: "React", icon: "react" },
  { label: "Next.js", icon: "nextjs" },
] as const;

// Índice COMPLETO de competências (currículo + "Main skills" do LinkedIn). Inclui
// de propósito as ferramentas que já estão no globo: o usuário pediu a lista
// inteira aqui, porque o globo mostra logotipo e este texto é o que o recrutador
// lê e busca por palavra. O que só existe aqui é o que não tem logo de marca
// (método, técnica, estatística).
export const competencies = [
  {
    group: "IA generativa & LLMs",
    items: [
      "OpenAI",
      "Claude",
      "Codex",
      "LLaMA",
      "Hugging Face",
      "LangChain",
      "RAG",
      "Fine-tuning",
      "Prompt engineering",
      "LLMOps",
      "Sistemas multiagente",
      "Vector databases",
    ],
  },
  {
    group: "ML, estatística & governança",
    items: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "XGBoost",
      "Pandas",
      "NumPy",
      "SHAP",
      "Testes de hipótese",
      "Wilcoxon pareado",
      "Bootstrap por agrupamento",
      "Sigstore",
      "in-toto",
      "Auditoria de modelos",
    ],
  },
  {
    group: "Engenharia, dados & infra",
    items: [
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "MySQL",
      "Docker",
      "AWS",
      // Vercel saiu do índice a pedido do usuário (2026-09-04). Continua como nó
      // do globo; para tirar de vez, remover também de `stack`.
      "Streamlit",
      "Git",
      "GitHub",
      "GitHub Actions",
      "CI/CD",
      "MLOps",
      "Arquitetura de software",
      "TypeScript",
      "React",
      "Next.js",
    ],
  },
  {
    group: "Fundamentos",
    items: ["Lógica de programação", "Algoritmos", "Estruturas de dados"],
  },
] as const;

// Âncoras da navegação single-page. A ordem define a ordem das seções na página.
export const sections = [
  { id: "hero", label: "Início" },
  { id: "sobre", label: "Sobre" },
  // rótulo da navegação; o id continua "expertise" pra não quebrar a âncora
  { id: "expertise", label: "Skills" },
  { id: "experiencia", label: "Experiência" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
] as const;
