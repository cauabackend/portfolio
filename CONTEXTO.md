# Contexto do Projeto — Portfólio Cauã Pereira da Silva

> **Este arquivo é a fonte de verdade do projeto.** Ele deve ser lido por completo antes de qualquer implementação. Toda decisão de design/UX/conteúdo aprovada com o usuário é registrada aqui, na seção "Decisions Log", para que o contexto nunca se perca entre sessões de trabalho.
>
> **Regra de ouro:** nunca gerar ou alterar código de uma seção sem que ela conste como "✅ APROVADA" abaixo. Se uma seção estiver "⏳ EM DISCUSSÃO", apresentar opções e aguardar decisão — não implementar prematuramente.

> **🚦 INSTRUÇÃO DE EXECUÇÃO ATUAL (2026-09-01) — LEIA ANTES DE CODAR:**
>
> O usuário autorizou começar a implementação em React/Next.js agora. **Construir apenas estas três seções, nesta ordem** — todas ✅ APROVADA com spec completa. Cada uma tem um mockup HTML estático aprovado em `design/` — abra o arquivo e leia junto com o spec da seção antes de codar, é a referência visual/estrutural mais literal que existe:
> 1. **Hero Section** (§5.1) — mockup: `design/hero-v1.html`
> 2. **Sobre** (§5.2) — mockup: `design/sobre-v1.html`
> 3. **Core Expertise / Stack** (§5.3) — mockup: `design/stack-v4.html`
>
> **🛑 TRAVAR (parar) depois de implementar essas três.** Não avançar para:
> - **Experiência / Timeline (§5.4)** — ✅ DESTRAVADA em 2026-09-01 por pedido explícito do usuário (spec + imagem de referência fornecidas em conversa) e implementada. Ver §5.4.
> - **Projetos de Destaque (§5.5)** — não iniciado. ⚠️ Foi PULADA de propósito: o usuário destravou §5.6 antes dela (2026-09-02).
> - **Contato / Footer (§5.6)** — ✅ DESTRAVADA em 2026-09-02 por pedido explícito do usuário (prompt detalhado + 2 imagens de referência em conversa) e implementada. Ver §5.6.
>
> **STATUS (2026-09-01): Hero + Sobre + Stack implementados, build/lint verdes.** As três seções estão em
> `components/sections/Hero.tsx`, `Sobre.tsx` e `Expertise.tsx` (esfera em `components/StackSphere.tsx`,
> cabeça 3D em `components/HeadStage.tsx`/`HeadScene.tsx`). **`Experience.tsx` foi desenhado e implementado
> em 2026-09-01 (ver §5.4)** — núcleo 3D em `CoreStage.tsx`/`CoreScene.tsx`. `Projects.tsx` e `Contact.tsx`
> continuam sendo os scaffolds crus pré-existentes — não foram desenhados.
>
> Com §5.4 aprovada e implementada (2026-09-01), o checkpoint atual é depois da Experiência: **pare e aguarde §5.5 (Projetos) ser decidida com o usuário** — não prossiga "pra não deixar incompleto".
>
> **STATUS (2026-09-02): Contato (§5.6) implementado** — `components/sections/Contact.tsx` +
> `components/NeuralNetwork.tsx` + `components/HudDataPanel.tsx` + `lib/contact.tsx`. O único
> pendente de design agora é **§5.5 (Projetos)**, que continua como scaffold cru entre a
> Experiência e o Contato — decidir com o usuário antes de desenhar.

---

## 1. Objetivo do Projeto

Landing page de portfólio profissional, single-page com navegação por âncoras, para reposicionar a carreira de Cauã de Full-Stack para **AI & Machine Learning Engineer**. A página precisa transmitir:

- Maturidade técnica e rigor estatístico
- Foco em arquitetura de IA corporativa, LLMOps e sistemas estocásticos
- Fuga total de clichês visuais de "template de IA" (gradientes roxo/azul genéricos, Inter/Space Grotesk, cards com glassmorphism raso)

**Direção estética geral aprovada:** "Neo-Terminal & High-Precision AI" — inspirada em laboratórios de pesquisa de IA, ferramentas de observabilidade (Grafana/Datadog-like), terminais avançados de engenharia. Não é um template de IA genérico; é uma ferramenta de precisão.

## 2. Stack Técnica

- **Framework:** Next.js (App Router)
- **Estilização:** Tailwind CSS
- **Animação:** framer-motion (motion/react)
- **Ícones:** lucide-react
- **Fontes:** a definir por seção (evitar Inter, Roboto, Arial, Space Grotesk — ver guidelines de design)

## 3. Metodologia de Trabalho (OBRIGATÓRIO SEGUIR)

Construção **conversacional e iterativa, seção por seção**. Ordem:

1. Hero Section — ✅ aprovada (ver §5.1)
2. Sobre — ✅ aprovada (ver §5.2)
3. Core Expertise / Stack técnico — ✅ aprovada (ver §5.3)
4. Experiência Profissional / Timeline — ✅ aprovada (ver §5.4)
5. Projetos de Destaque — não iniciado (ver §5.5) — pulada de propósito; §5.6 foi destravada antes
6. Contato / Footer — ✅ aprovada (ver §5.6)

Para cada seção: propor 2–3 direções visuais concretas (paleta, tipografia, elementos interativos) → debater com o usuário → só codar após aprovação explícita → registrar a decisão neste arquivo → avançar para a próxima.

**Nunca gerar o site completo de uma vez.**

## 4. Dados Reais do Currículo (fonte única de conteúdo — não inventar dados)

**Nome:** Cauã Pereira da Silva
**Localização:** São Paulo, SP
**Contato:** cauabackend@gmail.com _(telefone fica fora do repo por escolha do usuário — está só no currículo)_
**Educação:** Bacharelado em Engenharia de Software — FIAP (2025 – jun/2029), cursando o 3º semestre
**Idiomas:** Português (nativo), Inglês (B2), Espanhol (B1)

### Competências (do PDF `public/cv/curriculo.pdf` + "Main skills" do LinkedIn, fornecidas em 2026-09-04)

Fonte de verdade da seção Skills (§5.3). Não acrescentar item que não esteja aqui.

- **IA generativa & LLMs:** OpenAI API, Claude, Codex, LLaMA, RAG, Prompt Engineering,
  Fine-tuning, LLMOps, LangChain, Hugging Face, Vector Databases, Multi-agent Systems.
- **ML, estatística & confiabilidade:** Python (avançado), PyTorch, TensorFlow, scikit-learn,
  XGBoost, SHAP, Pandas, NumPy, testes de hipótese (Wilcoxon pareado, bootstrap por
  agrupamento), atestação criptográfica (Sigstore, in-toto), governança e auditoria de IA.
- **Engenharia & ferramentas:** FastAPI, Streamlit, SQL (PostgreSQL, MySQL), Docker, AWS,
  Vercel, Git, GitHub, GitHub Actions, CI/CD, REST APIs, MLOps, arquitetura de software.
- **Fundamentos:** lógica de programação, algoritmos, estruturas de dados.

### O PDF do currículo tem FONTE (2026-09-04) — não remendar o binário

`public/cv/curriculo.pdf` passou a ser **gerado** a partir de `design/cv/curriculo.html`
(`design/cv/build.ps1` imprime com o Chrome headless). Para mudar o currículo, edite o HTML
e rode o build; **não** edite o PDF.

Como se chegou nisso: o arquivo que o usuário enviou foi feito pelo **WeasyPrint 62.3** em
**Liberation Sans**, e o texto é glifo de fonte subsetada — trocar "2025" por "2026" deu para
fazer no content stream (só um glifo, mesma largura), mas **acrescentar palavras não dá**: as
linhas são justificadas e posicionadas em coordenada absoluta, então qualquer inserção exige
re-quebrar o parágrafo, re-justificar e deslocar todas as coordenadas abaixo. O HTML foi
reconstruído medindo o próprio PDF (linha de base de cada linha, cada régua, cada recuo).

Decisões que o HTML documenta e que não são óbvias:
- **Arial no lugar de Liberation Sans.** São metricamente compatíveis — a Liberation é
  justamente o substituto que o Linux usa para Arial. Verificado linha a linha: as quebras
  caem nos mesmos pontos. WeasyPrint não foi usado porque no Windows depende de Pango/GTK.
- **A linha de título é de duas colunas de 50%**, não um `space-between` elástico. É o que
  explica o título do RESONANCE quebrar em duas linhas mesmo sobrando espaço à direita: ele
  mede 371px e a coluna tem 351,5px. Com `space-between` ele cabia numa linha só e o layout
  mudava.
- **`letter-spacing: 0.5px` no `h1` e nos `h2`** e em mais nada. Nos títulos o PDF traz avanço
  extra entre CADA glifo; nos parágrafos, só em volta do espaço (isso é justificação).
- **`header p { text-align: center }` precisa vir depois de `p { text-align: justify }`**,
  senão o subtítulo e a linha de contato encostam na margem esquerda.
- **Marcador de lista desenhado com `li::before` a `left: -7.536px`** (a largura de "• " a
  12px). O `::marker` do Chrome sai maior e mais afastado que o do original.
- **`--user-data-dir` no build**: sem isso o Chrome de impressão briga pelo perfil do
  navegador aberto e sai sem escrever o arquivo.

Fidelidade medida contra o original: quebras de linha idênticas em todos os parágrafos que não
mudaram, deriva vertical máxima de 1,2pt na página inteira, marcador a 0,27px do lugar. Duas
diferenças conhecidas e aceitas: (1) as margens saem em 45px/38px em vez de 45,354px/37,795px
porque o Chrome arredonda margem de impressão; (2) a última linha do bullet do Resonance quebra
uma palavra depois — o texto fica a 0,7px do limite da caixa e os dois motores de texto discordam
nessa casa. O arquivo passou de 21,6 KB para 84 KB (o Chrome embute subconjunto de fonte maior).

### Experiências & Projetos

**Bravend — Estágio em Engenharia de Software** (jun/2026 – presente)
_Correção de 2026-09-04: constava "Estágio em Engenharia de IA & ML". O cargo é de
**Engenharia de Software**; o trabalho com IA acontece dentro dele ("além de construir
softwares eu mexo com essa área de IA", palavras do usuário). Aplicada em `lib/resume.ts`
(`role` + primeiro highlight) e em `lib/projects.ts`. Não confundir com o cargo pretendido
(AI & Machine Learning Engineer), que é o do Hero e permanece._
- Atuação central no core de IA da empresa
- Automação inteligente com ganho de eficiência de ~50%
- Fine-tuning de múltiplos agentes LLM (Claude, OpenAI, Codex), reduzindo custos operacionais em 15%
- Pipelines RAG e assistentes analíticos

**Aletheia — Co-Founder & AI Engineer** (2026 – presente)
_Correção de 2026-09-04: constava 2025 por engano; a startup foi fundada em 2026. Aplicada em
`lib/resume.ts`, `lib/projects.ts` e no PDF `public/cv/curriculo.pdf`. **Não confundir com o 2025
da FIAP**, que é a data correta do início da graduação e permanece._
- Governança de IA
- Atestação criptográfica integrada ao Sigstore e in-toto via GitHub Actions
- Rigor estatístico: testes pareados de Wilcoxon e bootstrap por agrupamento para medir desvios em modelos estocásticos

**Resonance**
- Preditor de hits musicais com XGBoost sobre 114k registros do Spotify
- Tratamento de desbalanceamento de classes
- Interpretabilidade com SHAP

---

## 5. Decisions Log

### 5.1 Hero Section — ✅ APROVADA

**⚠️ Nota de precedência:** todo o histórico de exploração abaixo (Direções A/B/C/D, conceito "Neo-Terminal & High-Precision AI", paleta escura `#0B0D0C` com verde-fósforo/ciano, narrativa idle→awakening→deconstruction→rebuild) documenta o *processo* e é a origem do asset 3D (`head_final.glb`) — mas foi **substituído** pela especificação final desta seção. A direção visual final do Hero (e provavelmente da página inteira) é um **tema claro/cinza**, não o tema escuro fósforo original. O pipeline de modelagem 3D da cabeça (geração via Tripo, limpeza no Blender, `head_final.glb`, comportamento idle/awakening) continua 100% válido — só a re-skin de cor/tipografia/composição muda. Leia esta especificação final antes de qualquer linha de código; o histórico abaixo serve só de referência do racional e do pipeline de asset.

**Especificação final aprovada:**

*Composição:* full-viewport. Tipografia gigante em duas linhas ("AI & MACHINE" / "LEARNING ENGINEER") atrás/ao redor da cabeça 3D centralizada — linha 1 alinhada à direita, linha 2 alinhada à esquerda. Nome + localização no canto inferior esquerdo; cue "SCROLL" no canto inferior direito. Navbar flutuante tipo "dock" (pill escura `#191a1a`, ícones, item ativo destacado com o accent) fixa na parte inferior central — mantida por pedido explícito do usuário a partir da referência visual compartilhada. **Sem** grid/textura de fundo, **sem** HUD textual de status (`SYS_01`/`ONLINE`), **sem** topbar com blurb, **sem** legenda/role-tag de especialidades ao lado da cabeça — composição minimalista: só tipografia + cabeça + dock.

**🔁 REVISÃO (2026-09-04) — o cue "SCROLL" do canto inferior direito foi REMOVIDO** a pedido do
usuário (a linha vertical em degradê saiu junto). Sobrou só nome + localização no rodapé do Hero,
agora numa faixa simples à esquerda (sem `justify-between`, que existia só por causa do par).

**🔁 REVISÃO (2026-09-04) — o dock inferior de ícones virou NAVBAR SUPERIOR. Substitui a
frase "fixa na parte inferior central" acima.**

Referência trazida pelo usuário: a navbar do site do Supaste — pill encostada na borda de
cima, cantos de baixo arredondados e as "pontas" côncavas ligando a barra ao topo da página.
A cor pedida foi **cinza-chumbo** no lugar do preto: `--nav: #3a3e3d` (globals.css).

- **Só links de seção.** Wordmark e CTA de currículo foram implementados e **removidos a
  pedido do usuário** — a barra é a estrutura da referência sem a marca e sem o botão.
- **Sutileza:** estado ativo é só cor/peso do texto (branco vs `white/50`), não pílula
  preenchida — a pílula pesava demais perto da referência, que é toda em texto plano.
  Altura ~42px (`h-[30px]` + `py-[6px]`), texto 13px.
- **Acabamento (2026-09-04, pedido de "mais bonita, nada agressivo"):** duas adições, ambas
  discretas de propósito — a forma e a cor não mudaram.
  1. **Marca ativa que desliza** (`motion` + `layoutId="nav-active"`): UMA marca que viaja de
     um link ao outro em spring, em vez de aparecer/sumir em cada um. Fica em `white/10` —
     fraca de propósito, porque aqui quem informa é o MOVIMENTO, não o contraste (foi o que
     tornou a pílula chapada rejeitada aceitável de novo). Como ela segue a seção visível,
     a barra também vira um indicador de progresso. `useReducedMotion` zera a duração: o
     bloco global de reduced-motion do CSS não alcança animação de layout feita em JS.
  2. **Material:** degradê vertical curto + fio de luz de 1px no topo (o `--inset-hi` do site
     invertido pro escuro). O truque pra não abrir emenda nas pontas é
     `background-size: 100% 42px` + `no-repeat` nas DUAS peças: a ponta tem 20px de altura e
     assim pinta exatamente o mesmo trecho de cima do mesmo gradiente.
- **As "pontas" (`.nav-wing`)** são um quadrado da cor da barra com um quarto de círculo
  recortado por `mask-image: radial-gradient(...)`, ancorado no canto EXTERNO de baixo. Dois
  detalhes que não são óbvios e custaram uma rodada cada: (1) a máscara precisa de uma rampa
  de ~1px (`transparent 19.4px, #000 20.4px`) — com corte seco a curva sai serrilhada; (2) a
  sombra tem que ser `filter: drop-shadow` no elemento PAI (`.nav-bar`), não `box-shadow` na
  pill: box-shadow contorna cada peça e desenha a emenda entre pill e pontas como uma linha —
  foi exatamente o que o usuário apontou. As pontas também entram 1px por baixo da pill
  (`width:21px` para 20px de recuo), senão sobra um fio claro por arredondamento de subpixel.
- **Consequências de layout:** o respiro migrou de baixo para cima —
  `Section` passou a `pt-[max(88px,8vh)] pb-[max(72px,7vh)]`, o Hero a `pt-[64px]` (e perdeu
  o `pb-[96px]` do mobile, que existia só por causa do dock).
- **`scroll-padding-top` fica em 0**, e isso é decisão, não esquecimento: reservar a altura
  da barra empurrava o alvo da âncora pra baixo e o clique parava com uma faixa da seção
  ANTERIOR ainda visível no topo — foi o "fica meio torto" que o usuário apontou. Como toda
  seção mede exatamente `100dvh` (medido: tops em 0/900/1800/… numa viewport de 900) e já tem
  88px de padding-top, alinhar o topo da seção com o topo da viewport encaixa a tela inteira
  e a barra flutua sobre o padding, sem cobrir conteúdo.
- **Mobile (≤860px):** os mesmos links viram só ícone (o rótulo fica em `sr-only`) — é a
  versão compacta sem menu/estado extra.

*Paleta (tema claro, cinza neutro — não bege/amarelado, não escuro fósforo):*
```css
--bg:#e7e8e7; --surface:#f2f3f2; --surface-2:#ffffff;
--ink:#191a1a; --ink-muted:#6b6d6c; --ink-faint:#a2a4a2;
--accent:#6d716e; --accent-ink:#4c4f4c; --accent-soft:#6d716e22;
--line:rgba(18,20,19,.10);
--shadow-sm:0 1px 1px rgba(15,17,17,.05), 0 2px 6px rgba(15,17,17,.06);
--shadow-lg:0 10px 20px rgba(15,17,17,.11), 0 40px 80px rgba(15,17,17,.16);
--inset-hi:inset 0 1px 0 rgba(255,255,255,.7);
```
Accent é um **cinza neutro** (não dourado — testado e rejeitado por ficar "amarelado" —, não azul, não verde-fósforo/ciano do Direção D antigo). Uso cirúrgico: palavra "MACHINE" no headline, item ativo do dock nav.

*Sistema de elevação (aplicar em toda a página, não só no Hero):* todo elemento que deve ler como "camada acima do fundo" usa sombra dupla suave (`--shadow-sm`/`--shadow-lg`) + highlight interno sutil no topo (`--inset-hi`). Aplicado hoje na cabeça (head stage) e no dock nav; deve ser reaplicado consistentemente em cards/painéis das próximas seções para manter a sensação "nada chapado, tudo dinâmico e com perspectiva" pedida pelo usuário.

*Tipografia:*
- Display (headline gigante): Instrument Sans, weight 700, `clamp(64px,11vw,168px)`, tracking `-0.03em`.
- Corpo/labels: IBM Plex Sans.
- Dados/mono (role-tag, captions técnicas): IBM Plex Mono.
- **Pendente:** usuário indicou uma referência no Figma (`https://www.figma.com/design/1zUjpaYPjdko1QHrOFCtxb/Portfoloio--Community-`) pedindo pra igualar a fonte de lá. Não foi possível inspecionar via navegador nesta sessão (arquivo em modo visualização, canvas não renderizou). Aguardando print da referência ou nome da fonte para decidir se a família muda.

*Pipeline 3D (ver histórico completo abaixo para o processo de geração/limpeza):* `head_final.glb` em `public/models/head_final.glb` (30.000 triângulos, 1 mesh/node, 3 texturas PBR intactas). Componente `RobotHead.tsx` carrega via `useGLTF` (drei) dentro de `<Canvas>` client-only. Comportamento IDLE sempre ativo (rotação senoidal leve ±2–4°, respiração sutil via scale/emissive); AWAKENING/TRACKING (resposta a mouse/scroll) é opcional/nice-to-have, não obrigatório pra v1. Fase de DECONSTRUCTION/REBUILD e hero `sticky`/pinned foram **abandonados** (ver "MUDANÇA DE ESCOPO" no histórico).

*Mockup de referência aprovado:* `hero-v1.html` (enviado ao usuário via chat e commitado em `design/hero-v1.html`, aprovado explicitamente — "gostei" — em 2026-08-31).

*Nota do usuário sobre fidelidade:* os mockups desta fase de decisão são HTML/CSS estático simplificado — a implementação final em React/Tailwind/framer-motion deve ser refinada além do que está no mockup (transições, responsividade, performance, a cabeça 3D real no lugar do placeholder circular), aproveitando os recursos que só existem no ambiente React.

**🔁 REVISÃO (2026-09-04) — a figura do Hero é um VÍDEO com chroma key. Substitui o modelo 3D
(`head_final.glb` + `HeadScene.tsx`), que continua no repo e volta trocando o caminho do
`dynamic import` em `HeadStage.tsx`. Também torna histórica a variante em vídeo de 2026-09-01
descrita logo abaixo (`HeroVideo.tsx`/`head-loop-2k.mp4`), que era outro arquivo e outra técnica
(blend `darken` em DOM, não key em shader).**

O usuário forneceu o vídeo sobre fundo verde (1920×1080, 24fps, 10s, 5,6 MB). A fonte vive em
`design/src/hero-head-source.mp4` e está **fora do repo** (`.gitignore`) — o que o app serve é o
recorte tratado.

*Pipeline reaproveitado, não reescrito:* o key roda no MESMO shader da peça da Experiência
(`components/ChromaKeyVideo.tsx`, §5.4) — todas as decisões registradas lá continuam valendo
(key no espaço de croma, cor amostrada dos 4 cantos do próprio frame, `NoColorSpace`, mipmaps
ligados, `<video>` no DOM, download único tocado de um blob). Só o cenário é novo:
`components/HeadVideoScene.tsx` (espelha `CoreVideoScene`), e `HeadStage` virou o wrapper com
`useInViewport` que para o `frameloop` quando o Hero sai da tela.

*Tratamento do arquivo → `public/video/head-loop.mp4` (1020×1040, 10,3s, 247 frames, 3,4 MB):*
```
# 1) ponte: 8 frames em volta da emenda (236..239 + 0..3), interpolados 8x com
#    compensacao de movimento; ip_026..ip_032 sao os 7 quadros gerados entre o
#    ultimo frame e o primeiro
ffmpeg -framerate 24 -i bridge/in_%02d.png \
  -vf "minterpolate=fps=192:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1" bridge/ip_%03d.png
# 2) clipe inteiro + a ponte no fim
ffmpeg -i design/src/hero-head-source.mp4 -framerate 24 -start_number 26 -i bridge/ip_%03d.png \
 -an -filter_complex "[0:v]crop=1020:1040:442:40,format=yuv420p,setsar=1[a];\
[1:v]trim=end_frame=7,setpts=PTS-STARTPTS,format=yuv420p,setsar=1[b];[a][b]concat=n=2:v=1:a=0[out]" \
 -map "[out]" -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags +faststart -r 24 \
 public/video/head-loop.mp4
```
- **O crop não foi escolhido a olho.** A caixa da figura veio de `cropdetect` rodando sobre o
  alpha do próprio key (`format=rgba,colorkey=0x3CB93C:0.35:0,alphaextract,format=gray,cropdetect`):
  622..1282 × 66..1080. O crop mantém **180 px de verde de margem de cada lado**, e essa margem é
  requisito, não estética: o shader amostra a cor-chave nos 4 CANTOS do frame, e os ombros
  encostam na borda de baixo — cortar rente poria figura no canto e envenenaria a referência.
- `-crf 23` comparado a olho com `-crf 18` num recorte 1:1 do rosto: indistinguíveis, metade do
  peso. Importa porque este é o maior asset do PRIMEIRO carregamento.
- Sem fade de entrada a corrigir (diferente do vídeo da Experiência): o fundo já sai em
  rgb(42,208,40) desde o frame 0.

**⛔ A EMENDA DO LOOP É UMA PONTE INTERPOLADA. Duas abordagens foram testadas e REJEITADAS pelo
usuário antes desta — não voltar a nenhuma das duas:**
1. **Crossfade de 1,2s** — *"aparece aquele blur, embaçada"*. Dissolver duas poses de olhar
   diferentes é fantasma, não transição.
2. **Vaivém (ida e volta entre dois pontos de repouso)** — matematicamente perfeito (emenda
   medida em 1,6 de MSE), mas *"você está repetindo as ações duas vezes... faça cada ação uma
   vez"*. Tocar o clipe de trás pra frente repete cada gesto. **Requisito fechado: cada ação
   aparece UMA vez, sem dissolve.**

A fonte **não é um loop**: começa e termina com a cabeça de frente, mas a MICRO-pose difere (o
olhar e uns poucos graus de giro). Medido: distância entre o primeiro e o último frame = **324**
de MSE, contra 0,2 de um passo normal de 1 frame com a cabeça parada — num trecho calmo, um
solavanco do tamanho de um passo de movimento rápido. Procurar um par de frames que casasse
melhor não resolve: varrendo TODOS os pares com ao menos 6s de intervalo (pose e movimento), o
melhor corte possível ainda ficava a 20 de distância de assinatura contra 30 do corte atual —
30% de melhora em cima de um erro grande.

**A solução é sintetizar os frames que faltam.** O clipe roda inteiro uma vez (0..239, cada ação
uma vez) e no fim entram **7 quadros interpolados por compensação de movimento** (`minterpolate`,
`mi_mode=mci` + `aobmc` + `vsbmc`) que levam o frame 239 de volta ao frame 0. Interpolação com
compensação **deforma** a imagem seguindo o fluxo do movimento, em vez de somar as duas por cima
— por isso não borra: a cabeça continua nítida, só se desloca. **Verificado no arquivo final:**
o maior passo dentro da ponte é **12,6** de MSE e a emenda final fica em **6,1**, ambos menores
que um passo normal de 1 frame em movimento lento (22,8) e ~50x menores que o corte seco (324).

O `minterpolate` precisa de mais de dois frames para começar a produzir saída — daí a ponte ser
gerada a partir de 8 quadros em volta da emenda (236..239 + 0..3) a 24fps, ampliados para 192fps
(8x). Os quadros gerados entre 239 e 0 são o `ip_026..ip_032`; `ip_025` e `ip_033` são cópias dos
originais e ficam de fora, senão o clipe repetiria um quadro em cada ponta.

*Parâmetros do key (`HeadVideoScene.tsx`) e por que não são os da Experiência:*
`similarity: 0.16` — muito acima do 0.072 de lá **por causa do mipmap**: a figura é exibida com
menos da metade dos texels do arquivo, então cada texel de borda que chega ao shader é a MÉDIA
de verde com metal (~0.18 de distância). Com limiar baixo essa média passa como opaca e vira um
contorno verde em toda a silhueta — foi exatamente o que apareceu na primeira montagem.
`spill: 1` — remoção total do verde acima do teto acromático, o máximo da escala. É seguro
porque a figura é metal cromado e não tem verde legítimo; e é necessário porque cromo REFLETE
o fundo, então o resíduo não fica só na silhueta, aparece em rastros dentro do rosto.
**Verificação:** varredura pixel a pixel do screenshot da página contando `g - max(r,b) > 6`;
caiu de 2.917 para 4 — e os 4 são antisserrilha do texto do rodapé, não o vídeo. A mesma
varredura no sentido oposto (`min(r,b) - g`) confirma que o despill não puxou a figura pro
magenta: os 50 pixels que sobram estão todos nas linhas 849–863, ou seja, no mesmo texto.

*Composição:* a coluna da figura ganhou `self-end` (e `self-center` no mobile, onde a linha
empilha e `self-end` empurraria a cabeça pra direita), e o plano usa `fadeBottom={0.06}`: o
quadro corta os ombros numa linha reta, e ancorar no meio da linha sem dissolver essa faixa
deixava a figura cortada no ar. **A sombra de contato saiu**: o corte não é ponto de apoio, e a
elipse aparecia por trás do canvas transparente como mancha solta. `fit = 0.98 * min(largura,
altura)` do viewport, e não `Bounds fit` — não há geometria pra medir.

**🔀 VARIANTE EM VÍDEO (2026-09-01) — testada e DESATIVADA; o Hero voltou ao modelo 3D:**

Chegou-se a montar a figura do Hero como loop de vídeo (`components/HeroVideo.tsx`) para
comparar com o modelo 3D. O usuário comparou e **ficou com o 3D** — `Hero.tsx` usa `<HeadStage />`.
⚠️ **Fora do repositório:** `components/HeroVideo.tsx` e `public/video/head-loop-2k.mp4` estão no
`.gitignore` (o vídeo tem 4,5 MB e nada no app o usa). Eles existem só na máquina local. Para a
comparação voltar num clone novo é preciso recriá-los a partir desta receita:
para reativar, em `Hero.tsx` troque `<HeadStage />` por `<HeroVideo />`, remova o `<span>` da
sombra de contato, e ajuste o `<h1>` (`-ml-[5vw]` → `ml-[2vw]`, `5.2vw/150px` → `4.6vw/132px`)
e a linha (`items-center` → `items-stretch`, coluna sem `aspect-square`).
Origem do vídeo: `projects/src/Seamless_video_loop_of_the_and.mp4` (1280×720, 10s, H.264).

Tratamento aplicado ao arquivo (`public/video/head-loop-2k.mp4`, 4,5 MB):
`ffmpeg -vf "crop=742:720:256:0,scale=1484:1440:flags=lanczos,unsharp=5:5:0.5:5:5:0" -crf 21 -an`.
O crop tira só fundo (a figura vive entre 27% e 70% da largura do quadro original), o que
concentra o bitrate na cabeça; o resultado é 1484×1440 sem áudio, com faststart.
**Ressalva honesta:** a fonte é 720p — o 2K é reescala com lanczos + sharpen, não detalhe novo.
Ganho real só regerando o vídeo em 1440p no gerador original.

Integração na página:
- `mix-blend-mode: darken` sobre o `--bg` pintado na `<section>` (que tem `isolate`): o fundo
  quase branco do vídeo (#f4f4f4) perde pro cinza da página e o retângulo some. Medido: só 1,4%
  dos pixels da figura passam de #e7e8e7, então quase nenhum brilho é perdido.
- `object-cover object-bottom` numa coluna esticada na altura da linha: a figura já vem cortada
  na borda de baixo do quadro, então ancorar embaixo faz o corte coincidir com a linha de base
  do Hero (lê como figura apoiada, não como imagem cortada no ar).
- A margem negativa do `<h1>` foi removida e o display caiu pra `clamp(26px,4.6vw,132px)`: o
  vídeo preenche a caixa inteira (o canvas 3D tinha folga transparente), então tucar o texto
  por baixo dele escondia letra.

**🔁 TESTADO E REVERTIDO (2026-09-01) — modelo PBR sem decimar:** chegou-se a trocar o Hero
para `Desktop/android/base_basic_pbr.glb` (mesmo busto do Tripo, ~500K tris / 38 MB, texturas 2K,
contra os 30K tris do `head_final.glb`). Mesmo node/material único (`model`) e mesma bounding box,
então foi só trocar o caminho em `RobotHead.tsx` — nenhum ajuste de layout/câmera/luz.
**Desfeito pelo usuário na mesma sessão: pesado demais** (38 MB baixados antes do Hero aparecer).
O Hero segue em `head_final.glb`. Para reabrir, o caminho é comprimir (Draco/meshopt + KTX2)
antes de trocar, não subir o `.glb` cru.

**⛔ REVISÃO (2026-09-01) — cabeça 3D SEM ANIMAÇÃO (substitui o IDLE desta seção):**

Por decisão explícita do usuário, `RobotHead`/`HeadScene` renderiza o modelo em **pose fixa**.
O IDLE (rotação senoidal, respiração, awakening/tracking de cursor) foi **removido**:
- tracking de cursor → rejeitado ("horrível", cabeça parecia presa ao ponteiro);
- respiração → rejeitada ("não faz sentido o robô ter");
- varredura com molas + microssacadas → ainda lida como "dura e sem vida";
- piscada → tentada como obturador (plano metálico descendo sobre a órbita, posicionado
  por raycast contra a malha) e **rejeitada**: é overlay na frente do rosto, não deformação
  do modelo.

**Limite técnico que fecha o assunto:** `head_final.glb` é malha única fundida — sem bones,
sem morph targets, sem olhos/pálpebras/mandíbula como objetos separados. Só dá pra transformar
a cabeça inteira. Piscar, mover olho ou abrir mandíbula exigem geometria que o arquivo não tem.
**Para reabrir:** no Blender, separar olhos/pálpebras/mandíbula como objetos próprios (ou criar
shape keys) e reexportar o `.glb`; aí `useAnimations`/refs por peça passam a valer.

**Qualidade de render (mantida e aprovada):** `RoomEnvironment` do three via `PMREMGenerator`
(estúdio procedural, sem HDR de CDN) dá o reflexo de metal real; `NeutralToneMapping` no lugar
do ACES padrão do R3F evita o desvio sépia; `dpr` até 2.5 e anisotropia máxima nas texturas PBR.
O componente compartilhado é `components/three/StudioEnvironment.tsx` (usado também na esfera).
Com a cena estática, o Canvas roda em `frameloop="demand"`.

**✅ IMPLEMENTADO (2026-09-01) — ajustes de composição decididos na implementação:**

- **Cabeça 3D na coluna ESQUERDA e maior** (pedido explícito do usuário: "quero a figura na esquerda e maior").
  A composição deixou de ser "cabeça centralizada com tipografia gigante full-width atrás" e virou duas colunas:
  cabeça à esquerda (`w-[min(46vw,980px)]`) + bloco tipográfico à direita. O stagger do mockup foi mantido
  (linha 1 "AI & MACHINE" alinhada à direita, linha 2 "LEARNING ENGINEER" à esquerda), agora dentro da coluna
  de texto. O display foi redimensionado para caber na largura restante: `clamp(26px,5.2vw,150px)`.
  Motivo: com a cabeça grande à esquerda, tipografia full-width ficava ilegível (a cabeça cobria "LEARNI").
- **Mobile (≤860px):** empilha — cabeça em cima, as duas linhas embaixo (`clamp(26px,8.6vw,64px)`),
  e o Hero ganha `pb-[96px]` para não ficar atrás do dock.
- **Dock:** o link de GitHub do mockup foi removido — não existe URL de GitHub nos dados reais do currículo
  (Seção 4) e o mockup apontava para o placeholder `https://github.com`. Reintroduzir quando o usuário
  fornecer o perfil real.
- Fontes finais em uso: Instrument Sans (display) / IBM Plex Sans (corpo) / IBM Plex Mono (dados) via
  `next/font/google` — a pendência da referência do Figma segue em aberto; se a família mudar, é troca
  de 3 linhas em `app/layout.tsx`.

*Pendências antes de codar `Hero.tsx` definitivamente:* confirmar tipografia final (aguardando referência Figma) e o `head_final.glb` já está pronto — pode implementar o restante do layout já com a spec acima.

---

**Histórico de exploração (contexto do racional e do pipeline de asset 3D — paleta abaixo está DESATUALIZADA, ver especificação final acima):**

Três direções propostas ao usuário (aguardando escolha ou combinação/ajuste):

**A) "Terminal Fósforo" (Phosphor Terminal)**
- Fundo quase preto (#0B0D0C), leve textura de scanline/grain (CRT sutil)
- Acento primário: verde fósforo (#7CFFB2), secundário: âmbar (#FFB86B) — uso cirúrgico, não decorativo
- Tipografia 100% monoespaçada: display grande em mono tracked-out (ex.: IBM Plex Mono / Berkeley Mono-like), corpo em JetBrains Mono
- Elemento interativo: sequência de boot que "digita" (`> whoami`) e revela nome/cargo, seguida de um ticker de métricas reais do currículo (loss, latência p99, -15% custo) como log de observabilidade ao vivo
- Referência: Bloomberg Terminal / osciloscópio / monitoramento industrial

**B) "White-Paper / Lab Notebook"**
- Fundo off-white quente (#F7F5F0), não branco puro
- Acento único de sinal: vermelho/vermelhão preciso (#D63A2E) usado só em um elemento (cursor, anotação, sublinhado)
- Tipografia: serifada editorial no display (Fraunces/Newsreader) + mono nos dados/labels (IBM Plex Mono)
- Elemento interativo: diagrama anotado estilo "paper científico" — headline com uma seta/anotação vermelha apontando métrica real ("↳ fine-tuned 3 LLM agents, -15% custo"), fundo com linhas finas tipo papel milimetrado
- Referência: capa de whitepaper de pesquisa em ML, caderno de laboratório

**C) "Observability Dashboard"**
- Fundo grafite profundo (#111318), grid 1px fino, vinheta radial sutil
- Acento: ciano elétrico (#37E6C4) primário + âmbar secundário — cores chapadas, sem gradiente
- Tipografia: sans geométrica distintiva no display (ex.: General Sans/Neue Montreal) + JetBrains Mono nos dados
- Elemento interativo: sparkline/gráfico de linha animado atrás do headline (curva convergindo), cards de status flutuantes com métricas reais, leve parallax no mouse
- Referência: Grafana/Datadog dark theme com polish de produto (Linear/Vercel-like)

**D) "Synthetic Intelligence / Living System" — proposta do usuário, forte candidata a substituir A/B/C**

Conceito narrativo: uma cabeça robótica/sintética funciona como identidade visual central do hero (e potencialmente do portfólio inteiro), com três estados amarrados ao scroll:

1. **IDLE (0–15%)** — cabeça parada olhando pra frente; após ~2s, micro-movimentos: olhos com micro movimentos, rotação de 2–4° pra um lado e volta, leve brilho percorrendo componentes internos, "respiração mecânica" sutil no pescoço. HUD ao lado: `SYS_01 / NEURAL CORE / ● ONLINE`. Objetivo: parecer um sistema em espera, nunca um personagem balançando a cabeça.
2. **AWAKENING / TRACKING (15–45%)** — ao começar o scroll, a cabeça "percebe": olhos acompanham a direção do conteúdo que surge, rotação pequena e progressiva.
3. **DECONSTRUCTION (45–90%)** — a cabeça se desmonta em camadas: placas externas → parafusos/cabos/fragmentos metálicos → pontos/linhas/números/partículas de dado. Não é explosão, é "descompilação".
4. **REBUILD (90–100%)** — os fragmentos/partículas atravessam a tela e se reorganizam para formar a seção seguinte (ex.: lista numerada de Core Expertise), criando a narrativa Humanoid → Machine → Data → Intelligence. Ideia estendida: o robô "olha" para a seção ativa conforme o usuário avança (Expertise → Experience → Projects), e ao final os elementos podem voltar a se reunir, fechando um arco circular Data → Intelligence → Engineering → Projects → Data.

Mecânica de scroll: hero `sticky`/pinned, timeline de animação amarrada ao scroll progress via `framer-motion` (`useScroll` + transforms), não scroll-jacking literal.

Direção estética da cabeça: evitar humanização — íris com estrutura mecânica, lentes internas, anéis, micro-LEDs, mandíbula mecânica, placas visíveis e modulares. Instrumento de engenharia, não personagem.

Paleta: base #0B0D0C / #111318 + metálico branco-cinza-gunmetal na cabeça (quase monocromática); acentos só nos dados/partículas: `#7CFFB2` (verde fósforo) e `#37E6C4` (ciano), âmbar só em microdetalhes. Sem gradientes. Hierarquia: ROBÔ = matéria, DADO = energia, TIPOGRAFIA = informação.

**Avaliação do arquiteto (registrada para referência futura):**
- Pontos fortes: a estrutura idle→awakening→deconstruction→rebuild é uma narrativa de scroll genuinamente diferenciada (muito acima de hero estático de template); o estado idle "vivo mas não performático" é a decisão certa; usar os fragmentos do robô para *literalmente construir* a seção seguinte (em vez de um corte seco) é o tipo de detalhe que separa um portfólio de um site genérico.
- Riscos a resolver antes de aprovar:
  1. **Risco de clichê**: cabeça robótica humanoide é um dos motivos visuais mais usados em "AI generic template" (junto com cérebro brilhante e rede neural). Só funciona se a execução for rigorosamente "instrumento de precisão", nunca "mascote/personagem" — reforça a necessidade das notas sobre mecânica não-humana (íris, LEDs, placas modulares).
  2. **Pipeline de asset**: uma imagem única gerada por IA não é suficiente pro efeito de desmontagem controlada por scroll (perde consistência entre frames, gera geometria nova a cada request). É necessário decidir a abordagem técnica de produção antes do storyboard frame-a-frame: (a) camadas 2D moduladas (SVG/PNG separados por peça: placas, olhos, cabos, parafusos) animadas com framer-motion — menor risco, menor custo, ainda assim muito acima do genérico; (b) modelo 3D real via React Three Fiber/Three.js — fidelidade máxima, mas eleva MUITO o escopo de engenharia (modelagem, materiais, performance de GPU); (c) animação vetorial tipo Rive/Lottie com estados nomeados (idle/awaken/deconstruct) — meio-termo, boa performance, ainda ilustrado.
  3. **Performance/acessibilidade**: hero sticky com timeline pesada de scroll pode pesar em mobile/dispositivos fracos; precisa de fallback simplificado para `prefers-reduced-motion` e uma versão mais leve para mobile (pinned scroll longo é mais problemático em telas pequenas).
  4. **Escopo**: esta direção é significativamente mais cara em tempo de implementação que A/B/C (que eram compostas majoritariamente de tipografia/cor/CSS). Vale confirmar que o usuário aceita esse trade-off de escopo/prazo.
- Próximo passo combinado: decidir a abordagem de produção do asset (2D em camadas / 3D via R3F / Rive-Lottie) antes de fechar o storyboard frame a frame do scroll.

**Asset base fornecido pelo usuário:** imagem única (PNG, fundo transparente) da cabeça robótica gerada por IA — visual "instrumento de precisão" (branco/gunmetal, íris mecânica, placas modulares, sem humanização excessiva). É uma imagem 2D achatada: não tem camadas, não tem geometria 3D, não tem rig. Qualquer efeito de "peça se movendo independente" precisa ser construído em cima dela, não vem pronto do arquivo.

**Abordagem técnica recomendada pelo arquiteto — HÍBRIDA (sem vídeo, sem modelo 3D na v1):**
1. **IDLE**: a imagem inteira com `transform` CSS 3D sutil (perspective + rotateY 2–4° + micro translateX, respiração via scale/opacity num overlay de brilho) — não precisa recorte de camada pra esse giro pequeno.
2. **Olhos com micro-movimento real (opcional, mas recomendado)**: único recorte manual sugerido — 2 PNGs pequenos (olho esq./dir.) sobrepostos na posição exata sobre a imagem base, animados independentemente (translate 2–3px) para o efeito de "olhar".
3. **DECONSTRUCTION**: técnica de "pixel-to-particle" via `<canvas>` (2D ou WebGL) — a própria imagem é amostrada em um grid de pontos/partículas que herdam posição e cor dos pixels originais, e se dispersam conforme `scrollYProgress`. Não exige recorte manual de placas/cabos nem imagens/vídeos adicionais.
4. **REBUILD**: as partículas já existentes (com posição/cor) se reorganizam programaticamente (via JS) para sugerir a lista de Core Expertise — sem asset novo.

Justificativa: vídeo foi descartado como abordagem (arquivos pesados, não scrub-ável com precisão por frame, não reage em tempo real a scroll/mouse). Modelo 3D via R3F/Three.js fica como upgrade futuro (v2) se o resultado da v1 em canvas/CSS não for suficiente — maior fidelidade, mas exige modelagem 3D (a partir da imagem atual, via ferramenta imagem→3D como Tripo/Meshy/Luma ou modelagem manual em Blender) e eleva bastante o escopo de engenharia.

**✅ DECIDIDO — Caminho técnico: Modelo 3D real via React Three Fiber / Three.js.**

O usuário optou pelo maior investimento de escopo em troca do resultado mais impressionante (rotação real, profundidade, luz). Ciente do trade-off de tempo/curva de aprendizado apontado pelo arquiteto.

**Pipeline prático combinado (ordem de execução):**

1. **Gerar o modelo 3D base** a partir da imagem de referência (a foto da cabeça robótica já gerada) usando uma ferramenta imagem→3D (Tripo AI, Meshy AI ou Luma Genie são as opções mais acessíveis sem precisar modelar do zero). Pode ser necessário gerar/fornecer ângulos adicionais (perfil, 3/4) para melhorar a reconstrução, já que a referência atual é só frontal.
2. **Limpar e segmentar em Blender**: o resultado da IA normalmente vem como um único mesh. Para o efeito de desmontagem funcionar, a cabeça precisa ser separada em objetos nomeados independentes: casco frontal, casco traseiro, placas laterais esquerda/direita, mandíbula, olho esquerdo, olho direito, peças de "headset" das orelhas, 4–6 pedaços de cabo, parafusos (podem ser instanciados). Manter contagem de polígonos moderada (nível "game-ready", não escultura).
3. **Exportar como `.glb`** (glTF binário) preservando a hierarquia/nomes dos objetos — é o formato padrão para Three.js/web.
4. **Trazer para o Next.js**: instalar `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`. Rodar `npx gltfjsx head.glb` (ferramenta do drei) para gerar automaticamente um componente React tipado com cada peça nomeada exposta como `<mesh>` com ref — essencial para animar peça por peça.
5. **Animação por scroll**: `framer-motion` (`useScroll`) fornece o progresso do scroll (0–1) do hero `sticky`; esse valor alimenta o `useFrame` do R3F, que interpola posição/rotação/opacidade de cada peça nomeada conforme os thresholds do storyboard (idle 0–15%, awakening 15–45%, deconstruction 45–90%, rebuild 90–100%).
6. **Microanimações do idle** (respiração, giro sutil, olhos): funções senoidais/noise dentro do `useFrame`, independentes do scroll, com os olhos como objetos separados que recebem rotação/lookAt em direção a um alvo.
7. **Fase de partículas**: sistema de partículas Three.js (`Points`/`BufferGeometry` ou `InstancedMesh`) que herda posições dos vértices das peças removidas, dispersando e depois se reorganizando.
8. **Performance/fallback**: `<Suspense>` com fallback durante o carregamento do modelo (encaixa bem com a narrativa "SYS_01 booting"); Canvas carregado só no client (`dynamic import` com `ssr:false` no Next.js, já que Three.js precisa de WebGL do navegador); versão simplificada (sem desmontagem completa, talvez só rotação leve) para mobile/`prefers-reduced-motion`.

**Gargalo real identificado:** os passos 1–2 (gerar e segmentar o modelo 3D) são trabalho de design/3D fora do editor de código — não é algo que se resolve só escrevendo React. Requer usar uma ferramenta externa de imagem→3D e, com boa probabilidade, algum tempo em Blender (ou contratar apoio pontual de um artista 3D) para separar as peças corretamente antes de qualquer animação funcionar.

**REVISÃO — pipeline simplificado para a fase de desmontagem (pesquisado e confirmado):**

Ferramentas de imagem→3D (Tripo AI, Meshy, Hyper3D Rodin, Trellis 2, Hunyuan 3D) aceitam uma única imagem como entrada e geram automaticamente um `.glb` — sem trabalho manual nessa etapa. Porém o resultado é sempre um mesh único fundido (não vem pré-segmentado em peças nomeadas).

Para a fase de DECONSTRUCTION, em vez de segmentação manual anatômica (selecionar olho/placa/cabo um a um), usar o add-on nativo do Blender **Cell Fracture**:
1. Importar o `.glb` gerado pela IA no Blender.
2. Aplicar Cell Fracture no mesh (estilhaça automaticamente em fragmentos, sem seleção manual por peça).
3. Configurar simulação de física (rigid body) para dispersar os fragmentos — Blender calcula as trajetórias.
4. "Bake to Keyframes" — converte a simulação física em uma animação de verdade (clip com timeline).
5. Exportar como `.glb` já com a animação de explosão embutida.
6. `npx gltfjsx` gera o componente React; o hook `useAnimations` (do `@react-three/drei`) expõe a animação pronta.
7. Scroll não recalcula trajetórias em JS — apenas faz *scrub* na animação já pronta, setando o tempo do `AnimationMixer` proporcionalmente ao `scrollYProgress` (framer-motion `useScroll`).

Isso reduz o esforço de "modelagem/rigging manual de dezenas de peças nomeadas" para "gerar automaticamente + aplicar um efeito pronto do Blender (Cell Fracture + rigid body bake) + exportar" — workflow de tutorial, não de modelador profissional. Referência do workflow: https://medium.com/@leannewerner/creating-cell-fractured-animations-using-blender-and-react-three-fiber-dbd0299d4767

Itens ainda em aberto: olhos com "olhar" independente (não vêm do fracture — se quiser esse detalhe, ainda exige isolar manualmente 2 pequenas esferas dos olhos antes do fracture; pode ficar de fora da v1), fase de REBUILD (fragmentos se reorganizando em Core Expertise — provavelmente feito em código/JS, não no Blender), e fallback mobile/`prefers-reduced-motion`.

**Ferramenta escolhida para o passo 1 (imagem→3D): Tripo AI.**

**⚠️ Prompt v1 (abaixo) gerou resultado com pele "craquelada"/tipo veias no rosto — substituído pelo v2. Mantido aqui só como histórico.**

Prompt v1 (não usar mais):
```
Hyper-detailed robotic android head, humanoid technical instrument design,
brushed white and gunmetal-grey polymer shell plating, exposed mechanical
cabling and wiring at neck and temples, mechanical iris with visible lens
rings and micro-LED detail, modular articulated jaw, symmetrical hard-surface
face, precision engineering aesthetic, matte and satin metal finishes,
visible panel seams and small screws, clean topology, PBR materials,
front-facing, neutral studio lighting, sci-fi robotics design, not organic,
not humanoid skin
```
Negative prompt v1 (não usar mais):
```
cartoonish, toy-like, blurry, low detail, human skin texture, asymmetrical,
missing parts, weapon, military robot, character costume, deformed
```

**✅ Prompt v2 — usar este na regeneração:**
```
Hyper-detailed robotic android head, humanoid technical instrument design,
brushed white and gunmetal-grey polymer shell plating, smooth continuous
hard-surface panels, perfectly smooth uninterrupted surface between seams,
exposed mechanical cabling and wiring at neck and temples, mechanical iris
with visible lens rings and micro-LED detail, modular articulated jaw,
symmetrical face, precision engineering aesthetic, matte and satin metal
finishes, crisp defined panel seams and gaps between plates, small clean
screws, minimal surface detail, low-noise geometry, clean simple topology,
PBR materials, front-facing, neutral studio lighting, sci-fi robotics
design, industrial product design quality, not organic, not humanoid skin
```
Negative prompt v2:
```
cartoonish, toy-like, blurry, low detail, human skin texture, pores,
wrinkles, organic texture, cracked surface, crackle pattern, veins,
scratches, scuffs, rust, corrosion, weathered, grunge, noisy surface,
bumpy surface, asymmetrical, missing parts, weapon, military robot,
character costume, deformed
```

Configurações: se o Tripo tiver toggle de **"clean geometry"/"low-poly mode"** na tela de geração, ativar dessa vez — pode reduzir o ruído geométrico de alta frequência visto no v1 (a malha do v1 saiu com ~1M triângulos, poligonagem alta demais e compatível com ter "gravado" ruído fino como geometria real em vez de deixar só na textura). Manter texturas PBR em alta resolução. Após gerar, testar a função nativa do Tripo de **"part separation" em um clique** antes de partir para o Cell Fracture manual no Blender — pode reduzir o trabalho de segmentação. Se o resultado de olhos/mandíbula/casco vier separado corretamente, usar como base; senão, seguir com Cell Fracture conforme descrito acima.

Observação: só há imagem de referência frontal. Tripo infere partes traseiras/laterais — no v1 esse resultado saiu coerente (ver QA abaixo), então não é obrigatório fornecer ângulos extras, mas se o v2 sair estranho de lado, considerar gerar 2–3 imagens adicionais (perfil, 3/4) no mesmo estilo antes de uma terceira tentativa.

**✅ QA do primeiro modelo gerado (arquivo `3d-ia.zip` em `projects/src/`):**

Formato exportado: `base.obj` + texturas PBR separadas (`texture_diffuse/metallic/normal/pbr/roughness.png`, 2048×2048) + `shaded.png`. Malha: ~1.000.000 de triângulos / ~499.000 vértices, objeto único (`o model`), sem separação de peças ainda.

Como não havia motor 3D disponível para abrir o `.obj` de verdade, foi escrito um script Python (nuvem de pontos com sombreamento simples a partir da textura difusa) só para inspeção estrutural — não é um render fiel de superfície, apenas suficiente para checar proporção/silhueta/simetria.

- **Aprovado estruturalmente:** proporções e simetria fiéis à referência (olhos, nariz, boca, mandíbula, peças de headset nas orelhas, cabos do pescoço, base dos ombros); parte de trás (inferida pela IA, já que só havia foto frontal) saiu coerente, não distorcida; paleta de cor bate com o pedido (placas claras + mecânica preta).
- **Ponto em aberto, não resolvido:** no close do rosto aparece um padrão "craquelado"/tipo veias finas na pele, mais orgânico do que a estética de placas limpas desejada. Pode ser artefato do renderer improvisado (nuvem de pontos discreta) OU ruído geométrico real gravado na malha (compatível com a contagem alta de 1M triângulos). **Ação pendente do usuário:** conferir no modo "Rendered/Textured" do próprio viewer do Tripo (ou abrir no Blender) com sombreamento suave antes de decidir. Se a pele estiver lisa lá → modelo aprovado, seguir pipeline. Se o craquelado for real → considerar regenerar com prompt reforçando "smooth clean surface, no micro-noise, no scratches".
- **Próximos passos combinados (ainda não executados):** 1) usuário confirma textura no viewer nativo; 2) rodar Smart Mesh/retopologia do Tripo para reduzir a poligonagem (1M tris é pesado demais para tempo real no navegador); 3) testar a função de "part separation" em um clique; 4) só então decidir entre usar as peças separadas automaticamente ou seguir para Cell Fracture manual no Blender.

**✅ QA do v2 (arquivo `3d-modeloia.zip`, gerado com o prompt v2 "smooth surface"):**

Formato: `base_basic_pbr.glb` (38MB, com normal/baseColor/metallicRoughness embutidos) + `base_basic_shaded.glb` (27MB, variante mais leve, não inspecionada). Malha: ~500.000 triângulos / ~549.000 vértices, ainda um único mesh/nó (`model`) — sem separação de peças. Poligonagem caiu pela metade em relação ao v1 (1M→500K), mas ainda está longe da faixa "game-ready" (dezenas de milhares) — Smart Mesh/retopologia continua obrigatório antes do Three.js independente do resultado da textura.

Escrito parser próprio de `.glb` (sem trimesh/pyrender disponíveis no ambiente) para extrair posições/normais/UV/texturas e repetir o mesmo teste de renderização em nuvem de pontos usado no v1.

- **Estrutura:** mantida, boa — proporções/simetria/silhueta iguais ao v1 em qualidade.
- **Textura/craquelado:** o padrão de veias finas no rosto **persistiu** mesmo com o prompt v2 reforçando "smooth surface". Isso é inconclusivo — pode ser real (a IA baking detalhe fino como geometria, resistente à instrução de prompt) ou continuar sendo limitação do renderer improvisado (nuvem de pontos não interpola entre vértices, então tende a exagerar qualquer ruído fino independente de regeneração).
- **Decisão tomada:** não regenerar uma terceira vez às cegas. Usuário vai conferir no modo Rendered/Textured nativo do Tripo (ou Solid/Material Preview no Blender) — sombreamento suave de verdade, resolve a dúvida em segundos. Se liso lá → aprovado, seguir pipeline (Smart Mesh → part separation/Cell Fracture). Se craquelado real → resolver com Smooth/Remesh no Blender (etapa que já ia acontecer mesmo), não com nova geração.

**✅ RESOLVIDO — usuário confirmou no viewer nativo do Tripo: o craquelado era só artefato do renderer improvisado (nuvem de pontos sem interpolação). Modelo `base_basic_pbr.glb` (v2) APROVADO para seguir no pipeline.**

**Roteiro combinado no Blender (próxima etapa, em andamento):**

Decisão de arquitetura: IDLE/AWAKENING precisam da cabeça inteira se movendo como peça única; só DECONSTRUCTION precisa dos fragmentos. Solução: agrupar todos os fragmentos do Cell Fracture sob um Empty pai (`Head_Root`) — no idle, anima-se o pai (fragmentos se movem juntos, rígidos, parecendo uma cabeça só); na desmontagem, cada fragmento assume sua própria animação (baked) e se separa do pai.

Passo a passo:
1. Importar `base_basic_pbr.glb` no Blender.
2. Aplicar modifier **Decimate** (Collapse) mirando ~20.000–50.000 triângulos antes de fraturar (500K é pesado demais pro Cell Fracture processar).
3. Ativar add-on **Cell Fracture** (Preferences → Add-ons → "Object: Cell Fracture").
4. Object → Quick Effects → Cell Fracture: ~60–120 pontos de origem; ativar **"Interior Material"** — usar a cor de acento (verde fósforo `#7CFFB2` ou ciano `#37E6C4`) nas faces internas expostas, reforçando a hierarquia robô=matéria/dado=energia já definida na Direção D.
5. Selecionar todos os fragmentos + um Empty central → Ctrl+P → Object (Keep Transform) → Empty vira `Head_Root`, pai de todos os fragmentos.
6. Selecionar todos os fragmentos → Object → Rigid Body → Add Active.
7. Adicionar Force Field (tipo Force) no centro; considerar **zerar a gravidade** no Rigid Body World para efeito de "deriva de dados no vazio" em vez de queda física realista.
8. Simular (Space), ajustar força até o espalhamento ficar bom em 2–4s (48–100 frames a 24fps).
9. Selecionar fragmentos → Object → Rigid Body → Bake to Keyframes (cobrindo o range simulado).
10. Exportar novamente como `.glb` (File → Export → glTF 2.0, com "Animation" marcado).

Esse `.glb` final (hierarquia de fragmentos + animação de explosão assada) é o que entra no `gltfjsx`/React Three Fiber a seguir.

**⚠️ MUDANÇA DE ESCOPO — Cell Fracture abandonado.**

Ao tentar rodar o Cell Fracture no Blender, a malha exportada pelo Tripo se mostrou extensivamente não-manifold (não era só um buraco no pescoço — quase a cabeça inteira acusava problema no teste "Select Non-Manifold", mesmo depois de "Merge by Distance"). O conserto robusto (Remesh Voxel) resolveria o manifold mas destruiria o UV/textura original. Diante do atrito, o usuário optou por **simplificar**: abandonar de vez a fase de DECONSTRUCTION/REBUILD (fragmentos explodindo e se reorganizando em Core Expertise).

**✅ Direção D revisada e simplificada — este é o escopo vigente do Hero:**

- Mantém: **IDLE** (cabeça parada, micro-movimentos após ~2s: olhos, rotação 2–4°, brilho interno, respiração sutil no pescoço, HUD `SYS_01 / NEURAL CORE / ● ONLINE`) e **AWAKENING/TRACKING** (cabeça "percebe" o scroll/cursor, pequeno acompanhamento).
- Remove: DECONSTRUCTION (desmontagem em placas/cabos/partículas) e REBUILD (fragmentos formando a seção seguinte). A narrativa Humanoid→Machine→Data→Intelligence via desmontagem literal fica descartada.
- Consequência técnica: **hero não precisa mais ser `sticky`/pinned no scroll** — esse mecanismo só existia para segurar a cena durante a desmontagem. O hero agora pode rolar normalmente como qualquer seção; a cabeça só faz idle/awakening enquanto está visível e sai de cena no scroll normal.
- Transição para a seção Core Expertise vira um corte/fade convencional — a ser desenhada quando chegarmos naquela seção (não é mais um problema do Hero).
- Único objeto 3D necessário: **`Head_Intact`** — a malha decimada (~30K tris) com a textura PBR original do Tripo intacta, exportada como `.glb` final (`head_final.glb`). Não precisa ser manifold (nunca passa por booleano/fratura). O objeto `Head_Fragments` (cópia feita para o Cell Fracture) deve ser descartado.
- Paleta e tipografia da Direção D permanecem válidas (base #0B0D0C/#111318, cabeça quase monocromática branco-cinza-gunmetal, acentos `#7CFFB2` verde fósforo e `#37E6C4` ciano, âmbar só em microdetalhes).

**Pendências antes de aprovar o Hero definitivamente e começar a codar:** layout do texto ao redor da cabeça (nome, cargo, HUD, "scroll to explore"), tipografia exata do display, confirmação do `head_final.glb` exportado.

**✅ Checklist de implementação — componente `RobotHead` (pode ser codado ANTES de fechar o layout do texto do Hero, já que é um componente isolado):**

Pré-requisito (usuário faz fora do editor): `head_final.glb` exportado do Blender → colocado em `public/models/head_final.glb` → `npm install three @react-three/fiber @react-three/drei` → opcionalmente `npx gltfjsx public/models/head_final.glb -o components/RobotHead.tsx -r public` como ponto de partida.

A implementar em código:
1. `components/RobotHead.tsx`: carrega o `.glb` via `useGLTF` (drei), roda dentro de um `<Canvas>`.
2. Comportamento IDLE (sempre ativo, via `useFrame`): rotação leve senoidal no eixo Y (±2–4°, período lento ~4-6s), "respiração" sutil (scale ou emissive intensity oscilando muito discretamente), sem qualquer movimento de olhos independente (não segmentamos os olhos — ficou fora do escopo simplificado).
3. Comportamento AWAKENING/TRACKING (opcional, nice-to-have): pequena rotação adicional respondendo à posição do mouse ou ao progresso de scroll do Hero — bem sutil, não é obrigatório pra v1.
4. Canvas carregado só no client: `dynamic(() => import(...), { ssr: false })` no Next.js, já que Three.js precisa de WebGL do navegador.
5. `<Suspense>` com fallback simples (ex.: texto/HUD "BOOTING SYSTEM…") enquanto o modelo carrega.
6. **Não é mais necessário:** hero `sticky`/pinned, `scrollYProgress` controlando múltiplas fases, sistema de partículas, fase de desmontagem/rebuild — tudo isso foi removido do escopo (ver nota de mudança de escopo acima).
7. Resultado final: um componente `<RobotHead />` autocontido, pronto pra ser encaixado dentro do `Hero.tsx` assim que o layout do texto ao redor for decidido.

**✅ CONFIRMADO — `public/models/head_final.glb` presente e validado.** 30.000 triângulos, 1 mesh/node único (`model`), 3 texturas PBR embutidas (cor/normal/metálico-rugosidade) intactas. Pronto para implementar o `RobotHead.tsx` assim que `three`/`@react-three/fiber`/`@react-three/drei` forem instalados via npm.

*(Decisão final do usuário sobre A/B/C/D e ajustes devem ser adicionados aqui assim que aprovados — Hero segue ⏳ EM DISCUSSÃO até então.)*

**🔁 REVISÃO (2026-09-04) — loop, corte seco, rastros verdes e limpeza do modelo 3D:**

Três defeitos apontados pelo usuário na figura em vídeo do Hero, e o que cada um exigiu:

- **Loop visível.** Medido antes de mexer: o último quadro contra o primeiro dá **PSNR 21 dB**, e
  varrendo o clipe inteiro contra o primeiro quadro **nenhum** quadro passa de 24 dB — não existe
  ponto de loop natural, porque a cabeça faz um *dolly* contínuo e nunca volta ao enquadramento
  inicial. Crossfade foi descartado: com poses tão distantes ele fantasmaria (é exatamente o
  "borrado" que o usuário relatou). A solução é **ping-pong**: o clipe toca e volta, então a
  emenda é a própria continuidade do movimento — 23,96 dB na virada, o mesmo nível de dois
  quadros vizinhos quaisquer deste vídeo. Sem blend, nada a borrar.
  ```
  # ida + volta (sem repetir os quadros das pontas), ruído temporal removido
  ffmpeg -i head-loop.mp4 -filter_complex "[0]hqdn3d=0:0:6:6,split[a][b];\
  [b]reverse,trim=start_frame=1:end_frame=210,setpts=PTS-STARTPTS[r];\
  [a][r]concat=n=2:v=1[v]" -map "[v]" -c:v libx264 -crf 21 -preset slow -pix_fmt yuv420p \
    -movflags +faststart -an public/video/head-loop.mp4
  ```
  Resultado: 1020×1040, 420 quadros, 17,5s, **6,63 MB** (o arquivo anterior tinha 3,2 MB e 8,8s).
  `hqdn3d=0:0:6:6` é só temporal (spatial em 0): tira o ruído entre quadros — caríssimo de
  codificar e ainda sujava o chroma key — sem amolecer o metal.

  **⚠️ Erro cometido e desfeito no mesmo dia, não repetir:** a primeira tentativa cortou o clipe
  em 5s (`trim=end_frame=120`) pra segurar o arquivo em 3,58 MB. **O arremesso da cabeça pra
  cima/direita acontece depois desse ponto** — o corte matou a animação, e o usuário percebeu na
  hora. O clipe inteiro é conteúdo, não gordura: peso se resolve em CRF, nunca em tesoura.

  Verificação da emenda (vale repetir se o clipe for trocado): o par (419, 1) dá **36,8 dB**, ou
  seja, são o mesmo quadro de origem — a construção está certa. A virada (419→0) dá **24,0 dB**,
  exatamente o mesmo valor do par (0,1) do arquivo original: o passo do loop é o passo natural do
  clipe naquele trecho, não um salto. Não confundir com os 31,4 dB de um par vizinho no meio do
  clipe — ali o movimento é mais lento, então a linha de base é outra.
- **Corte seco embaixo.** O quadro corta a figura na altura do peito. Resolvido no shader
  (`fadeBottom`, em `ChromaKeyVideo`): `alpha *= smoothstep(0, fadeBottom, vUv.y)`. Fica no
  shader, e não numa máscara CSS no container, porque a máscara também apagaria a sombra de
  contato do Hero, que é irmã do canvas.
- **Rastros verdes dentro da figura.** O despill antigo misturava o pixel com o cinza da própria
  luminância — lava a peça e não mata o verde. Agora o verde é limitado ao **teto acromático**
  `(R+B)/2`: a cabeça é metal cromado e não tem verde legítimo, então tudo acima disso é reflexo
  do fundo (e, sendo cromada, ela reflete o fundo no meio do rosto, não só na silhueta). A
  luminância perdida no corte é devolvida na escala — sem isso a área tratada escurece e vira
  mancha. `spill` mudou de escala aberta (2.4) para **0–1**, onde 1 = remoção total.
- **Modelo 3D do Hero APAGADO** a pedido do usuário: `components/HeadScene.tsx`,
  `components/RobotHead.tsx` e `public/models/head_final.glb` (nenhum código os carregava desde
  que a figura virou vídeo). `public/models/` deixou de existir e entrou inteiro no `.gitignore`.
  Para reabrir, regerar o componente com `npx gltfjsx` a partir do `.glb`.
- **Fonte bruta fora da raiz:** o MP4 com fundo verde saiu de `/` e virou
  `design/src/hero-head-source.mp4` (`design/src/` está no `.gitignore` — é fonte, não asset
  servido).

### 5.2 Sobre — ✅ APROVADA

**Especificação final aprovada:**

*Composição:* eyebrow "02 SOBRE" mantido no topo. Layout de duas colunas lado a lado (`display:flex`, `align-items:center`, `gap:min(5.5vw,80px)`): **foto grande à esquerda** dentro de um frame circular com anel futurista animado; **todo o texto/bio + lista de dados à direita** — sem parágrafo flutuante solto acima da foto (removido; era o layout anterior rejeitado). Container geral `max-width:1600px`.

*Coluna da foto (`.photo-wrap`, `width/height: min(50vw,1000px)`):* foto circular central (`.photo-frame`, `width/height:32%` do container — deliberadamente maior que o "vazio" real da arte do anel, sobrepondo a banda mais interna, replicando como a própria imagem de referência compõe a foto por cima do anel), com bezel sutil (`border:1px solid rgba(25,26,26,.14)` em `inset:5%`) e sombreamento em gradiente claro (`linear-gradient(155deg,#fcfcfb,#d6d7d5 60%,#adafac)` + `--shadow-lg` + inset highlights) consistente com o sistema de elevação do resto do site.

*Anel futurista animado (elemento novo, técnica documentada abaixo):* 4 camadas de PNG com transparência empilhadas (`position:absolute; inset:0`) sobre a foto — `outer`, `mid`, `inner` (bandas do anel, cada uma gira em velocidade/direção diferente) + `annotations` (leader-lines + labels técnicos, estático, sem rotação):
```css
.ring-layer{ position:absolute; inset:0; width:100%; height:100%; pointer-events:none; user-select:none; }
.ring-layer.outer{ animation:ring-spin-cw 200s linear infinite; }
.ring-layer.mid{ animation:ring-spin-ccw 150s linear infinite; }
.ring-layer.inner{ animation:ring-spin-cw 110s linear infinite; }
@keyframes ring-spin-cw{ to{ transform:rotate(360deg); } }
@keyframes ring-spin-ccw{ to{ transform:rotate(-360deg); } }
@media (prefers-reduced-motion:reduce){ .ring-layer{ animation:none; } }
```
**Origem da arte do anel (importante para reprodução/regeneração futura):** as tentativas de gerar o anel proceduralmente via PIL/numpy (gradientes radiais simulando metal escovado) foram testadas e rejeitadas pelo usuário por não terem o nível de detalhe/realismo da referência (estilo HUD "Jarvis"). Solução final: gerar **uma única imagem fotorrealista** externamente via Gemini (prompt describing um anel de instrumento circular estilo HUD futurista, metálico, com leader-lines e labels técnicos, espelhado horizontalmente em relação à referência original do usuário), e então **fatiar essa imagem em camadas por raio** (script Python/numpy): localizar o centro real da imagem, medir os raios de cada banda do anel, recortar cada banda em um PNG RGBA independente com alpha suavizado (~3px feather) nas bordas, e uma camada separada de "labels" mascarada por *diferença de cor em relação ao fundo* (não só por raio, senão a área de padding do canvas vira um bloco opaco). Essa técnica permite reaproveitar o realismo de uma imagem gerada por IA enquanto mantém cada banda independentemente animável via CSS puro. Os 4 PNGs finais devem ser exportados para `public/images/sobre/ring_outer.png`, `ring_mid.png`, `ring_inner.png`, `ring_labels.png` (caminhos relativos — evitar embutir base64 no componente final; o base64 foi usado só nos mockups HTML standalone para evitar problemas de path relativo durante a fase de preview).

*Coluna de conteúdo (`.content-col`, `max-width:460px`):* parágrafos de bio (`font-size:clamp(16.5px,1.55vw,19.5px)`, alinhados à esquerda) seguidos de uma lista de dados (NOME/LOCAL/FORMAÇÃO/IDIOMAS/FOCO — dados reais da Seção 4) abaixo de uma linha divisória (`border-top:1px solid var(--line)`).

*Paleta/tipografia:* reaproveita integralmente os tokens do Hero (§5.1) — tema claro cinza-neutro, `--accent` cinza neutro, Instrument Sans/IBM Plex Sans/IBM Plex Mono, sistema de elevação com sombra dupla + inset highlight.

*Responsivo (`max-width:720px`):* `.duo` empilha em coluna (`flex-direction:column`), foto centralizada e reduzida (`width:min(76vw,340px)`), bio e lista de dados centralizados.

*Mockup de referência aprovado:* `sobre-v1.html` (enviado e commitado em `design/sobre-v1.html`), com `<meta charset="UTF-8">` obrigatório no topo do arquivo (bug de encoding em arquivos HTML grandes com base64 embutido sem charset explícito — corrompia acentuação PT-BR).

**⛔ REVISÃO (2026-09-01) — camada de anotações REMOVIDA.** As leader-lines com labels
(`RETICLE_APEX`, `SYNC_REF_1`, `THERM_STAB`…) saíram a pedido do usuário: em tela o texto
minúsculo lia como ruído e derrubava o acabamento. Renderizam-se só as 3 bandas metálicas
girando. O PNG `ring_annotations.png` continua em `public/images/sobre/` caso a decisão volte.

**✅ IMPLEMENTADO (2026-09-01) — versão final dos PNGs do anel:** a arte vigente é a do mockup
`sobre-v1_6.html` (a mais recente enviada pelo usuário — anel metálico sólido com leader-lines e labels
técnicos), **não** a de `design/sobre-v1.html`. Os 4 PNGs foram extraídos do base64 daquele arquivo
(1100×1100 cada) e gravados em `public/images/sobre/` e `design/rings/`. O componente `Sobre.tsx`
reproduz o markup/CSS do mockup 1:1 (mesmas velocidades de rotação, mesmo `photo-frame` a 32%),
com um `overflow-hidden` a mais no `.photo-wrap` — a diagonal do PNG quadrado girando estourava a
viewport no mobile; como a arte é circular, o clip não corta nada visível.

*Nota de implementação:* assim como no Hero, o mockup é HTML/CSS estático simplificado — na implementação React final, considerar usar `next/image` para as 4 camadas do anel (com `priority` na foto principal) e mover as animações CSS para um módulo de estilos do componente `Sobre.tsx`.

**✅ IMPLEMENTADO (2026-09-04) — foto real do Cauã no lugar do placeholder.** O usuário
enviou uma foto pessoal (retrato em Paris, Torre Eiffel ao fundo); recortada via ffmpeg
(rosto+ombros, 800×800) e salva em `public/images/sobre/profile.jpg`. `Sobre.tsx` renderiza
via `next/image` com `object-cover` dentro do disco (o `<span>` de texto placeholder foi
removido, mantendo a borda/highlight sobrepostos). O TODO de asset pendente está resolvido.

**🔁 REVISÃO (2026-09-04) — copy reescrita e a LISTA DE DADOS foi removida. Substitui a
"lista de dados (NOME/LOCAL/FORMAÇÃO/IDIOMAS/FOCO)" descrita na coluna de conteúdo acima e
o texto do mockup `sobre-v1.html`.**

O usuário pediu um texto que "encha os olhos do recrutador" e apontou dois defeitos reais na
versão anterior: ela **não falava dele**, só repetia a trajetória que a seção Experiência já
conta, e a lista de dados ocupava a metade de baixo da coluna dizendo pouco.

- **A `<dl>` saiu inteira** (e `about.fields` com ela). O espaço liberado (~194px) virou texto.
  Formação, cidade e idiomas voltaram como uma linha só de conferência em mono no pé da coluna
  (`about.credentials`), com filete acima; nome e foco já vivem no rodapé do Hero, então não
  foram reintroduzidos. A linha usa `--accent-ink` e não `--ink-faint`, que a 12px dava 2,2:1.
- **Os três parágrafos têm o MESMO corpo.** Uma versão com o primeiro maior, deslocado para o
  lado do título como "tese", foi implementada e **rejeitada pelo usuário**: o degrau de tamanho
  lia como dois textos diferentes na mesma seção. Não reintroduzir.
- **O parágrafo sobre o Resonance foi escrito e removido a pedido do usuário** (2026-09-04). O
  projeto tem card próprio em §5.5; aqui só alongava a seção.
- **A copy passou a ter uma tese no centro**, e não uma lista de tecnologias: *software
  determinístico quebra e você vê, modelo estocástico degrada calado*. É o que explica por que
  o trabalho dele termina em atestação (Sigstore/in-toto) e em teste estatístico (Wilcoxon
  pareado, bootstrap), em vez de deixar os dois como jargão solto.
- **Fonte da copy:** o usuário forneceu em conversa o "sobre" do LinkedIn dele, que traz o que
  a Seção 4 não tinha. Daí vieram o arco de atuação do primeiro parágrafo (ajuste fino →
  deploy → governança em produção, ou seja MLOps), a palavra *auditável* e o destino dos
  pipelines RAG (assistentes analíticos). Nada foi inventado além dessa fonte.
- **⚠️ A ALETHEIA AINDA ESTÁ EM CONSTRUÇÃO**, dito pelo usuário em 2026-09-04, e isso vale
  contra o próprio LinkedIn dele, que descreve a esteira no presente ("utilizo atestação..."). A
  frase do site é de propósito e não de sistema em operação ("estou construindo a Aletheia,
  que co-fundei, para deixar esse caminho auditável"). Só passar para o presente quando ele
  disser que a esteira roda. **O mesmo cuidado NÃO foi aplicado a `lib/projects.ts`**, cujo
  `summary` da Aletheia ainda afirma no presente que cada artefato recebe atestação — pendente
  de correção junto com o usuário.
- **Ordem seguindo as referências consultadas** (DEV, 40 portfólios revisados; Codecademy e
  KDnuggets sobre portfólio de ML): especialidade nas primeiras palavras, depois o *como se
  pensa*, depois a prova com número, e o background curto por último.
- **Regras de escrita aplicadas ao texto, a pedido do usuário:** sem travessão, sem
  dois-pontos, sem ponto e vírgula, sem enumeração de três itens em paralelo e sem adjetivo
  vago no lugar de fato. O negrito (`strong`) cai só na tese e nos números (15%, ~50%), que é
  o que se varre em 30 segundos.
- **Teto de altura, medido e não estimado:** a coluna de texto não pode passar de ~484px numa
  viewport de 720px, senão a seção deixa de caber em uma tela (§5.7). São ~14 linhas de
  parágrafo. Cada rodada foi medida no browser (`overflow` da `<section>` contra `innerHeight`
  em 1500×720, a viewport real do usuário); a primeira versão estourava 22px e a segunda 7px.
  Ao mexer nessa copy, medir de novo.

### 5.3 Core Expertise / Stack — ✅ APROVADA

**⚠️ Nota de precedência:** esta seção passou por 4 direções descartadas antes da aprovada — registradas aqui só como histórico de racional, não como opções válidas: (1) carrossel de duas esteiras horizontais infinitas com tiles de logo; (2) índice categorizado de "pills" (ferramenta com ícone + label, agrupadas por domínio), inspirado no layout de "Skills & Expertise" do portfólio-referência do usuário (aaabadcode.com, feito com o produto Fastfolio); (3) chat simulado no cliente (bolhas de pergunta/resposta, chips de categoria, digitação com efeito typewriter, sem IA/API real) — também inspirado na mesma referência, mas na parte de simular uma conversa; descartado a pedido do usuário em favor da direção 4. Leia a especificação final abaixo; as anteriores não devem ser reimplementadas.

**Especificação final aprovada — esfera geodésica interativa:**

*Conceito:* uma esfera geodésica (malha de hastes metálicas conectando vértices, como uma estrutura de instrumento de precisão — não um "cérebro brilhante" nem uma rede neural sináptica genérica, clichês visuais já descartados na exploração do Hero) flutua centralizada na seção. Alguns vértices carregam o ícone colorido oficial de uma ferramenta/tecnologia (sem disco/bezel ao redor — só o ícone flutuando, com drop-shadow sutil para contraste contra a malha); os demais vértices são pequenas "juntas" esféricas cromadas, sem ícone, só para dar densidade à malha.

*Origem do visual:* gerada uma imagem de referência via Gemini (prompt documentado abaixo) descrevendo a esfera com material metálico branco/gunmetal, iluminação de estúdio, badges com bezel — na paleta clara do site (não a referência escura/roxa original que o usuário mostrou). Diferente da técnica do anel do Sobre, essa imagem **não foi fatiada em camadas** — serviu só de referência de estilo/composição, porque uma esfera que gira em 3D real (múltiplos eixos, mudando de perspectiva) não pode ser simulada por fatias de imagem estática. A esfera final é 100% geometria/matemática real (ver implementação).

*Prompt Gemini usado (referência de estilo):*
```
Hyper-detailed 3D render of a translucent wireframe sphere made of fine
structural lines (geodesic grid, thin polished metal rods at the node
intersections), floating in soft studio light against a plain neutral
light-grey background. Small circular instrument-style badges sit at
several of the sphere's node intersections — each badge a brushed
white-to-gunmetal metal disc with a thin bezel ring like a precision
dial, displaying one crisp full-color technology logo at its center...
[ver histórico de chat para o prompt completo, incluindo negative prompt]
```

*Implementação técnica (validada em mockup HTML/JS puro, `stack-v4.html`):*
- Distribuição dos vértices: **Fibonacci lattice** sobre uma esfera unitária (~60 vértices no total).
- Arestas (hastes): conectar cada vértice aos **3 vizinhos mais próximos** (distância angular via produto escalar dos vetores unitários) — calculado uma única vez (a esfera é rígida, vizinhança não muda ao girar).
- **12 vértices** recebem ícone de ferramenta real (ver lista abaixo); os demais ~48 são juntas sem ícone.
- Renderização das hastes: `<canvas>`, gradiente linear perpendicular à haste (efeito de cilindro metálico com múltiplas bandas de reflexo — não um brilho difuso único), espessura e brilho variando pela profundidade (`z` projetado), ordenadas back-to-front antes de desenhar.
- Renderização das juntas sem ícone: gradiente radial (bolinha cromada, highlight deslocado + anel de reflexo mais escuro + borda com luz de ambiente).
- **Desfoque de profundidade real** (`ctx.filter = blur(...)`, e `filter:blur()` CSS nos ícones DOM) nos elementos do lado de trás da esfera — não só opacidade reduzida; é o que dá a sensação de câmera/3D de verdade.
- Ícones (vértices com ferramenta): elementos DOM reais (não canvas), *billboarded* — sempre de frente pra câmera independente da rotação — posicionados via projeção de perspectiva simples (`translate3d` + `scale` recalculados a cada frame). Nada de disco/bezel ao redor — só o ícone com `filter:drop-shadow(...)` para contraste.
- Rotação: giro automático lento contínuo + rotação adicional proporcional ao delta de scroll da página (`window.scrollY`) + arrastar com o mouse/touch (`pointerdown/pointermove`) também gira a esfera diretamente. Tilt de câmera estático (~-11°) pra visão 3/4, como a referência.
- Hover num ícone mostra um tooltip com o nome da ferramenta.
- Sombra de contato no chão (elipse com blur) sob a esfera, reforçando que ela "flutua".

*Ícones incluídos (os 12 com logo de marca real disponível via devicon/simple-icons):* Python, Claude (Anthropic), OpenAI, Next.js, React, TypeScript, JavaScript, Node.js, Tailwind CSS, Git, GitHub, GitHub Actions.

*Biblioteca de ícones:* mesma abordagem documentada no histórico de exploração — `devicon` (CDN ou pacote npm) para ferramentas/linguagens com logo multi-tom oficial; `simple-icons` (SVG usado como CSS mask colorido na cor de marca) para marcas que o devicon não cobre (ex.: OpenAI, Anthropic). Para produção, preferir servir os SVGs definitivos estático de `public/icons/stack/` (baixados uma vez) em vez de depender de CDN em runtime.

**✅ RESOLVIDO (2026-09-04) — a pendência "onde entram XGBoost, SHAP, Sigstore e in-toto"
virou a lista de competências ao lado do globo. Ver a revisão no fim desta seção.**

*Paleta/tipografia:* reaproveita integralmente os tokens do Hero/Sobre (tema claro cinza-neutro, Instrument Sans/IBM Plex Sans/IBM Plex Mono, sem cor introduzida nos elementos metálicos — só tons neutros de cinza, consistente com a decisão do Hero de acento estritamente neutro).

**✅ REVISÃO (2026-09-01) — esfera reconstruída em 3D real (React Three Fiber), substitui o canvas 2D:**

O `stack-v4.html` simulava 3D em `<canvas>` 2D (Fibonacci lattice + k-vizinhos + gradientes
desenhados à mão). A pedido do usuário ("quero um globo melhor desenhado 3d em metálico bem
acabado e com animações mais fluidas") a seção foi refeita em R3F — `components/StackSphereScene.tsx`:

- **Malha:** `IcosahedronGeometry(1, 1)` + `mergeVertices` (three-stdlib) — geodésica de
  triângulos regulares, 42 nós / 120 arestas. Substitui o Fibonacci+kNN, que gerava triângulos
  irregulares.
- **Material:** hastes e juntas são `InstancedMesh` com `MeshStandardMaterial` `metalness: 1` —
  cromo de verdade refletindo o `StudioEnvironment`, não gradiente pintado.
- **Badges:** aro (torus metálico) + mostrador + logo, orientados pela normal do vértice
  (`setFromUnitVectors`), não mais ícones DOM sobrepostos.
- **Interação:** arrasto nos **dois eixos** (o vertical trava em ±1.35 rad pra não inverter a
  esfera nos polos) + scroll, ambos alimentando velocidade angular com atrito exponencial —
  é o que dá inércia/continuidade. Sem arrasto, o eixo vertical volta sozinho pra vista 3/4.
- **Hover:** raycast **por frame** contra os mostradores (`userData.stackLabel`), não os eventos
  de ponteiro do R3F — com a esfera girando, o ícone passa sob um cursor parado e nenhum evento
  seria disparado. O nome aparece na legenda em DOM abaixo da esfera; como `<Html>` dentro do
  grupo que gira, ela acompanhava a rotação e aparecia em qualquer canto.
- **Sombra:** elipse em CSS atrás do canvas. `ContactShadows` do drei foi testada e removida —
  desenhava um plano quadrado cujo corte reto aparecia contra o fundo.
- **Ícones:** os 12 SVGs vivem em `public/icons/stack/` (baixados uma vez, sem CDN em runtime),
  com `width`/`height` explícitos no `<svg>` para carregarem como textura em qualquer browser.

*Mockup de referência aprovado:* `stack-v4.html` (commitado em `design/stack-v4.html`, validado pelo usuário em 2026-09-01 — "validado, podemos seguir").

*Nota de implementação:* o mockup é vanilla JS puro; a implementação React final deve portar a lógica de projeção/rotação para dentro de um componente `StackSphere.tsx` (client-only, sem SSR, já que depende de `window.scrollY`/`requestAnimationFrame`), possivelmente com `framer-motion` só para transições de entrada/hover, mantendo o loop de animação principal em JS puro por performance.

**🔁 REVISÃO (2026-09-04) — o conteúdo da seção passou a ser o currículo inteiro, não uma
amostra. Substitui a lista de 12 ferramentas e a pendência de XGBoost/SHAP/Sigstore.**

Pedido do usuário: *"coloque todas as skills que fazem sentido, use meu currículo para se
basear, pq as skills presentes na roda não representam o que tem no currículo"*, mais um
texto explicando o que não caberia no globo, pensando na hierarquia para o recrutador.
Fonte: o PDF `public/cv/curriculo.pdf` (bloco COMPETÊNCIAS) e as "Main skills" que ele colou
do LinkedIn na mesma conversa. Ambos estão agora na Seção 4 deste arquivo.

*Hierarquia decidida (dois níveis, um por canal):*
1. **Globo = marca.** 23 nós, só o que tem logotipo oficial: Python, Claude, OpenAI, Hugging
   Face, LangChain, PyTorch, TensorFlow, scikit-learn, Pandas, NumPy, FastAPI, Streamlit,
   PostgreSQL, MySQL, Docker, AWS, Vercel, Git, GitHub, GitHub Actions, TypeScript, React,
   Next.js. **Saíram** JavaScript (redundante com TypeScript), Node.js e Tailwind CSS: não
   constam do currículo e diluíam o posicionamento de IA. Os SVGs ficam em
   `public/icons/stack/`, baixados uma vez (devicon para os coloridos, simple-icons para
   LangChain, logo oficial da Hugging Face). **Sigstore, in-toto e XGBoost continuam fora
   do globo por não existir ícone de marca em nenhum dos dois conjuntos.**
2. **Índice em texto = tudo.** `competencies` em `lib/resume.ts`, quatro grupos na mesma
   divisão do PDF. Começou como "só o que não cabe no globo" e o usuário mandou o contrário
   na mesma sessão (*"cadê AWS, Docker e outras skills no texto?? lá você pode colocar
   tudo"*): a repetição de AWS/Docker/Python entre globo e índice é **de propósito**, porque
   o índice é o que o recrutador lê e o que uma busca por palavra encontra. **Vercel foi
   removido do índice** a pedido dele, e segue como nó do globo.

*Legenda da figura (pedido: "tem skill no globo que não tem legenda"):* o nome de cada nó
dependia de passar o mouse por cima, e sumia de vez em leitor de tela ou sem WebGL. A lista
`sr-only` que existia virou `<figcaption>` visível sob a esfera, com os 23 nomes na ordem do
`stack`. O `<figure>`/`<figcaption>` são o que amarra texto e figura.

*Consequências de layout:* a coluna de texto foi de `minmax(0,420px)` para `minmax(0,620px)`
e o gap de `5vw` para `4vw` — em 460px o índice quebrava em linhas demais e estourava a
altura. O teto da esfera caiu para `min(58vh,520px)` / `min-h-380px`, porque a legenda passou
a consumir parte da coluna. **Medido em 1500×720 (a viewport real do usuário, §5.7): seção em
720px, zero de overflow.** Ao mexer aqui, medir de novo nessa altura.

### 5.4 Experiência / Timeline — ✅ APROVADA

**Aprovação (2026-09-01):** o usuário forneceu em conversa a spec completa + imagem de referência (layout zigue-zague ao redor de um núcleo 3D central) e pediu implementação explícita, destravando o checkpoint. O mockup de "fio 3D" anterior segue rejeitado e não tem relação com esta direção.

**Especificação final aprovada:**

*Composição (desktop):* seção full-height, grid de 3 colunas. Coluna esquerda, de cima pra baixo: header (eyebrow "04 EXPERIÊNCIA" mono + linha fina; título "Jornada Profissional" em Instrument Sans bold) → bloco ALETHEIA → bloco VISÃO GERAL DE CARREIRA (`justify-between` dá o escalonamento vertical). Coluna direita: bloco BRAVEND no topo (com `pt-[8vh]`). Coluna central: núcleo 3D girando sobre uma linha vertical de 1px (`--line`) que atravessa a seção, com sombra de contato elíptica (mesmo tratamento do Hero §5.1). Mobile (≤980px): empilha header → núcleo → BRAVEND → ALETHEIA → VISÃO GERAL.

*Blocos de texto:* título da organização em caps (Instrument Sans bold, `clamp(22px,2.1vw,32px)`), subtítulo semibold, período em IBM Plex Mono caps, bullets com marcador de traço fino (`h-px w-3`). **Dados 100% de `lib/resume.ts`** (Seção 4): a spec original do prompt trazia datas/cargos incorretos ("2023", "Sênior", "Cofundador 2022", "Satomak") que foram substituídos pelos reais — Bravend jun/2026–presente (Estágio em Engenharia de IA & ML), Aletheia 2026–presente (Co-Founder & AI Engineer). `highlights[0]` de cada experiência entra no subtítulo; o restante vira os bullets, verbatim.

**🔁 REVISÃO (2026-09-04) — hierarquia, espaçamento e copy dos blocos. Substitui o parágrafo
acima no que diz respeito a montagem do subtítulo e à composição da coluna esquerda.**

Pedido do usuário, em duas mensagens: *"melhore a hierarquia visual dos textos tbm, tem textos
com muito espaçamento outro com pouco"* e, sobre a linha de rodapé da coluna esquerda,
*"isso que eu mandei na print nao está legal… está tudo mt vago nessa pagina"*.

- **O espaçamento torto tinha uma causa medível, não era ajuste fino.** A Bravend estava presa
  à linha 1 do grid, então **era ela** quem media a linha (238px, contra 130px do cabeçalho), e
  os 108px de sobra viravam vão morto debaixo do título. Medido antes: **148px** de respiro
  acima da Aletheia contra **40px** abaixo. A correção é uma classe: a Bravend passa a
  atravessar as três linhas (`row-end-4 self-start`), sem sair do canto onde já estava. A linha
  1 volta a medir o cabeçalho, toda a folga cai na linha do meio e o `self-center` da Aletheia a
  divide em dois. Medido depois: **76px e 76px**.
- **Nenhum highlight é mais desviado para o subtítulo.** O subtítulo é o cargo, e ponto. A
  montagem antiga (`Núcleo de IA da Bravend — ${role}`) repetia o nome da empresa a 6px do
  `<h3>` que já diz BRAVEND, trazia travessão (proibido pela regra de escrita) e tirava da lista
  justamente a linha mais concreta do bloco.
- **Ritmo interno em vez de respiro uniforme.** Nome e data colados (6px, são o mesmo dado), o
  cargo com um degrau, os bullets com o dobro. Antes os quatro pedaços tinham o mesmo respiro e
  o bloco lia como quatro linhas soltas. O período também subiu para debaixo do nome da empresa:
  a ordem de varredura é ONDE, QUANDO, o QUÊ, e antes a data ficava depois do cargo, que é a
  informação mais longa das três.
- **Bullets em `--accent-ink`, não `--ink-muted`.** A 12px o muted dá 4,2:1 sobre o `--bg`,
  abaixo do mínimo de 4,5:1 — e é ali que está a substância do currículo. O peso secundário
  passa a vir do tamanho, não do contraste baixo.
- **O `<h3>` "VISÃO GERAL DE CARREIRA" e a linha `careerSummary` saíram, e no lugar entrou a
  FORMAÇÃO (FIAP).** O rótulo, em caixa alta e no mesmo corpo de BRAVEND e ALETHEIA, fazia a
  coluna parecer ter três empregos. E a copy era vaga: "Desenvolvimento de soluções baseadas em
  dados | AI & Machine Learning Engineer" não diz o que foi feito, e o pipe é resquício de
  headline de LinkedIn. Uma primeira tentativa de reescrita ("soluções baseadas em dados, do
  ajuste do modelo ao deploy em produção") foi rejeitada pelo usuário com razão: **ela violava a
  própria regra de escrita do texto** (substantivo vago + "de X a Y" sem escala). FIAP é a
  terceira entrada real da jornada, tem data, fecha a cronologia e usa a mesma peça `Entry`
  (`bullets` virou opcional). `careerSummary` **continua exportado em `lib/resume.ts`, sem uso**,
  caso a linha de posicionamento volte.
- **Copy dos bullets reescrita** sob as regras que o usuário passou (sem travessão, sem
  dois-pontos, sem gerúndio de fecho, sem adjetivo vago): "Automação inteligente com ganho de
  eficiência de ~50%" virou "A automação que construí subiu a eficiência da operação em cerca de
  50%"; "…(Claude, OpenAI, Codex), reduzindo custos operacionais em 15%" virou duas frases com o
  número no fim; "Rigor estatístico: testes pareados de Wilcoxon…" perdeu o rótulo e os
  dois-pontos. Nenhum fato entrou ou saiu. O bullet da Aletheia é **frase nominal de propósito**,
  não presente do indicativo, porque a esteira ainda está em construção.

*Peça 3D:* `public/models/core.glb` (40 MB, cópia SEM otimização — decisão explícita do usuário: "deixe o arquivo com sua qualidade alta"). `components/CoreScene.tsx` + `CoreStage.tsx` espelham o padrão HeadScene/HeadStage: dynamic import sem SSR, fallback "LOADING CORE…" via `useProgress`, `StudioEnvironment` + NeutralToneMapping + anisotropia máxima. Hardening pós-review: error boundary no `CoreStage` (WebGL decorativo falha → seção degrada pra texto), montagem adiada por IntersectionObserver (o glb de 40 MB só baixa quando a seção se aproxima da viewport, sem competir com o Hero), `useProgress` filtrado por item (o manager é global), DOM em ordem de leitura com posicionamento explícito no grid (WCAG 1.3.2), copy da "Visão Geral" em `lib/resume.ts` (`careerSummary`).

**🔁 REVISÃO (2026-09-01) — modelo trocado + arrasto, substitui o giro simples acima:**

*Modelo vigente:* `Desktop/objeto-trajetoria/base_basic_pbr.glb` (conjunto de discos cromados com lentes azuis; 500K tris, texturas 2K diffuse/normal/metallic-roughness). Substituiu o export anterior (`pagina-trajetoria`), cuja textura difusa era literalmente cinza-chumbo — o render escuro daquele **não era bug**, era o modelo. A variante `base_basic_shaded.glb` foi descartada: tem `baseColorFactor` preto + `emissiveFactor` branco, ou seja, iluminação assada — não reflete o `StudioEnvironment` e leria como adesivo sobre o fundo claro. Orientação natural do glTF (Y-up), sem rotação corretiva: o objeto é achatado e a leitura de "discos" vem da inclinação de repouso, não de girar o modelo.

*Interação:* ⛔ **substituído por §5.8** (scroll removido, arrasto livre sem trava de inclinação, legenda removida, giro no eixo vertical da tela).

*Enquadramento:* ⛔ **substituído por §5.8** (fit pela esfera envolvente; `Bounds` segue removido).

*Composição:* **a linha vertical de instrumento foi REMOVIDA** (pedido do usuário). A composição em coluna foi substituída pelo **overlay** descrito em §5.8 — ver lá para a versão vigente.

*Paleta/tipografia:* tokens do site (§5.1) — nenhuma cor nova. O prompt pedia `#f4f4f4`/Inter; substituídos pelos tokens aprovados (`--bg #e7e8e7`, Instrument Sans/IBM Plex) por consistência de identidade. Eyebrow numerado como **04** (não "03" da referência — 03 já é o Stack na ordem real da página). Dock de navegação: reusa o `Nav.tsx` global, não foi duplicado.

**🔁 REVISÃO (2026-09-01) — `core.glb` SUBSTITUÍDO por geometria procedural. Isto vence tudo acima sobre a peça 3D.**

Motivo do usuário: o cromo escuro do glb não pertencia à página clara, e ele forneceu uma
imagem de referência de uma peça em **cristal translúcido** (discos concêntricos em cascata).
O `.glb` também custava 40 MB de download.

*Peça vigente:* `components/core-geometry.ts` — `buildCore()` monta a peça em código e
`CoreScene` renderiza o `THREE.Group` retornado. **`public/models/core.glb` foi apagado**
(39,7 MB que nenhum código carregava) e está no `.gitignore`; o original continua em
`Desktop/objeto-trajetoria/base_basic_pbr.glb`. Para reverter: copiar o glb de volta para
`public/models/` e restaurar o `useGLTF` no `CoreScene`.

Decisões que não são óbvias no código:
- **`LatheGeometry` é a peça-chave.** A referência é radialmente simétrica, então cada anel é
  um perfil 2D (com bisel nos 4 cantos) revolvido em 360°. O bisel não é enfeite: canto reto
  não pega reflexo do environment e a aresta some contra o `--bg` quase branco.
- **Vidro SEM `transmission`.** Além do passe de render extra por frame, `transmission` não
  enxerga outros objetos transparentes — num empilhado de discos de vidro um disco não
  apareceria através do outro, que é justamente a leitura da referência. O que funciona é
  blend comum com `depthWrite: false`: as camadas se somam de graça. Cor **mais escura** que a
  página (`0xa3b0b6`), senão vidro branco sobre fundo branco desaparece.
- **A peça vazada não é uma gaiola esférica.** A primeira versão era, e lia como o globo
  geodésico do Stack (§5.3) repetido na seção seguinte. Virou um aro com nervuras radiais —
  e são **poucas e largas** (13), porque muitas e finas leem como pá de turbina.
- **Enquadramento pela união das esferas das peças, não pela diagonal da bounding box.** A
  diagonal superestima muito uma composição espalhada (a peça saía com ~metade do tamanho).
  O objeto é recentrado NESSA esfera e o `<Center>` do drei foi removido: com giro livre em
  todos os eixos, o pivô correto é o centro da esfera envolvente, não o da caixa.
- **`useProgress`/"LOADING CORE…" removidos** do `CoreStage` — não há mais asset carregando.
  O IntersectionObserver ficou: agora adia a criação do contexto WebGL, não um download.

*Acabamento (segunda passada, mesma sessão — o usuário apontou que faltava "material, textura,
refinamento de detalhes e sombreamento"):*
- **Texturas 100% procedurais via `<canvas>`**, zero asset: `dialCanvas()` desenha o mostrador
  (anéis, coroa de ticks, legendas, trilhas de circuito) e `ringCanvas()` as ranhuras do aro.
  O micro-texto **não é texto** — são blocos de 2–3px: fonte de verdade nesse tamanho vira
  borrão e custa atlas; o que o olho reconhece é o ritmo de palavras curtas numa linha.
  `normalFromCanvas()` deriva um normal map por Sobel do próprio desenho — sem ele a gravação
  lê como decalque impresso; com ele a luz corre pela ranhura.
- **Dois mostradores por disco (frente e verso).** Com face única, metade da volta mostrava o
  verso liso e a gravação sumia.
- **`CrystalEnvironment`** (`components/three/CrystalEnvironment.tsx`), separado do
  `StudioEnvironment` do Hero/Stack: domo em gradiente + 3 softboxes. Cristal incolor só
  aparece quando o que ele reflete tem contraste — a faixa branca do softbox no bisel É a
  aresta brilhante. Calibragem delicada: um domo que escurece de verdade embaixo (`#3d4548`)
  faz a peça ler como chumbo; claro demais e ela some. O valor atual é o meio-termo testado.
- **Composição em TREVO** (três peças em triângulo, tangentes pelas bordas), e não em cascata
  de discos quase paralelos. A cascata foi implementada e descartada por dois motivos:
  as peças se atravessavam (apontado pelo usuário), e discos paralelos ficam de perfil todos
  ao mesmo tempo — a cada meia volta a peça inteira virava uma lasca. No trevo os centros
  ficam afastados por mais que a soma dos raios, então nenhuma peça cruza a outra em ângulo
  nenhum e cada uma pode ter a inclinação que quiser.
- **Anéis finos em terraço** (10 por disco) no lugar de 5 grossos: a densidade de arestas
  biseladas é o que faz ler como cristal lapidado. Alturas baixas — anel alto lê como banda
  de pneu.
- **⛔ Shadow map testado e REMOVIDO.** Vidro transparente projeta sombra OPACA (o depth
  material ignora a opacidade), então a peça se auto-sombreava e virava um bloco cinza-chumbo.
  O volume vem do contraste do environment, não de sombra projetada.

*Armadilha de diagnóstico (custou três iterações):* sob `prefers-reduced-motion` o Canvas roda
em `frameloop="demand"`. Screenshot tirado assim mostra o frame ANTIGO — mudanças de material e
de environment não aparecem, e parece que a edição não pegou. Para avaliar a peça em print,
emular `reducedMotion: 'no-preference'`.

*Limite conhecido, dito ao usuário antes de implementar:* a peça procedural lê como CAD limpo e
simétrico. Não tem a refração real, as cáusticas nem os greebles irregulares do render offline
da referência — a gravação existe, mas no tamanho em que a peça aparece na página ela lê como
textura, não como legenda legível. Fechar mais essa distância significaria refração de verdade
(`transmission`, com o custo e a limitação de camadas já registrados acima).

**🔁 REVISÃO (2026-09-01) — a peça vigente é um VÍDEO com chroma key. Substitui a geometria
procedural acima, que continua no repo (`core-geometry.ts` + `CoreScene.tsx`) e volta trocando
o caminho do `dynamic import` no `CoreStage`.**

O usuário produziu o vídeo do objeto sobre fundo verde. Fonte:
`Desktop/Pessoal/upscaled-video.mp4` (2688×3072, 24fps, 8s, 21 MB).

*Por que o key roda num SHADER e não é assado no arquivo:* WebM com alpha seria mais simples de
consumir, mas Safari e iOS não tocam WebM com canal alpha — o formato que eles aceitam (HEVC com
alpha) só se codifica no macOS. Com o key em runtime o arquivo continua um MP4 H.264 comum, que
toca em todo lugar, e o vídeo não sofre recompressão além da de entrega.

Decisões que não são óbvias no código (`components/ChromaKeyVideo.tsx`):
- **Distância medida no espaço de CROMA (Cb/Cr), não em RGB.** Em RGB uma sombra sobre o fundo
  verde fica "longe" do verde puro só por ter escurecido, e sobra sujeira.
- **A cor do fundo é amostrada do PRÓPRIO frame** (média dos 4 cantos), não passada por uniform.
  Passar por fora obriga os dois lados a estarem no mesmo espaço de cor, e a conversão que o
  three aplica na amostragem quebra a comparação **em silêncio** — foi exatamente o bug que fez
  o key sair invertido (fundo mantido, objeto apagado). Amostrando da mesma imagem, o filtro
  fica imune a isso. O fundo real é um esmeralda escuro `rgb(2,89,60)`, não o verde clássico.
- **`texture.colorSpace = NoColorSpace`.** Com `SRGBColorSpace` o three converte para linear na
  amostragem, mas um `ShaderMaterial` sem `#include <colorspace_fragment>` escreve cru no
  framebuffer: a imagem clareia e estoura. Sem conversão em ponta nenhuma, é passthrough exato.
- **Despill** além do key: a borda recebe verde refletido, e o recorte sozinho não tira isso.
- **Mipmaps LIGADOS** (o padrão de `VideoTexture` é desligado). A imagem é reduzida de 2048px
  para ~600 na tela; sem mipmap cada pixel amostra um texel isolado e o resultado cintila — era
  a causa do "estou vendo os pixels", e **não** a taxa de bits. Nenhum CRF conserta aliasing.
- **O `<video>` fica NO DOM** (1px, opacidade 0). Fora do documento o Chrome trata o elemento
  como invisível e suspende a decodificação.
- **O arquivo é baixado uma vez e tocado de um blob.** Apontar o `<video>` para a URL parece
  equivalente, mas medido: na virada do loop o `readyState` cai de 4 para 1 e a figura some até
  rebufferizar, porque o browser já descartou o buffer reproduzido.

*Tratamento do arquivo (o que estava errado no vídeo original):* ele **começa com um fade-in a
partir do branco** — os 14 primeiros frames vêm de luminância ~199 e só então estabiliza em ~122.
Era essa a causa real do "some e volta" no loop, não a reprodução. O pipeline corta esses 14
frames e emenda as pontas com crossfade de 1,4s (a diferença entre último e primeiro frame cai
de 101/765 para 33/765, e o resto se dilui ao longo do crossfade):

```
# 1) corta o fade-in e escala para 2K
ffmpeg -i upscaled-video.mp4 -vf "select='gte(n\,14)',setpts=PTS-STARTPTS,scale=1792:2048:flags=lanczos" \
  -fps_mode passthrough -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -an sem_fade.mp4
# 2) crossfade de emenda (D=7.458, C=1.4; o offset é D-2C, e o fade é IN, não OUT)
ffmpeg -i sem_fade.mp4 -filter_complex "[0]split[body][pre];[pre]trim=duration=1.4,format=yuva420p,\
fade=in:st=0:d=1.4:alpha=1,setpts=PTS+(4.658/TB)[jt];[body]trim=start=1.4,setpts=PTS-STARTPTS[main];\
[main][jt]overlay=shortest=1,format=yuv420p[out]" -map "[out]" -c:v libx264 -crf 19 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -an public/video/core-loop.mp4
```
Resultado: `public/video/core-loop.mp4`, 1792×2048, 6,0s, **14,7 MB**. Resolução 2K por decisão
explícita do usuário (o 4K original não cabia: em CRF 17 chegava a 35 MB, **maior** que a fonte,
porque upscaling injeta ruído de alta frequência caríssimo de codificar).

**🔁 REVISÃO (2026-09-04) — o arquivo servido foi RECOMPOSTO sobre verde puro, com a figura
dessaturada. O de fundo esmeralda escuro virou `design/src/core-loop-green.mp4` (fora do repo).**

Motivo (pedido do usuário: *"retire os verdes ainda presentes nesse vídeo"*): a peça é cristal
TRANSLÚCIDO, então o verde do fundo não ficava só na borda — atravessava o objeto. E o esmeralda
escuro (rgb(2,89,60)) fica a apenas **0,161** de distância de croma do cinza, então não existe
limiar capaz de separar os dois. O despill então trocava o problema de cor em vez de resolvê-lo:
ele corta o verde no teto acromático (a média de R e B), e como o fundo tem B ≫ R, o pixel
tratado saía **ciano/azulado**. Medido no composto sobre o fundo da página: 3.439 pixels com
saturação > 25 e pico de 175 — era isso que se via como "verde que sobrou".

```
ffmpeg -i design/src/core-loop-green.mp4 -an -filter_complex \
"color=c=0x00FF00:s=1792x2048:r=24:d=6.05[bg];\
[0:v]format=yuva420p,chromakey=0x02593C:0.051:0.02,hue=s=0[fg];\
[bg][fg]overlay=shortest=1,format=yuv420p[out]" -map "[out]" -c:v libx264 -crf 20 -preset slow \
-pix_fmt yuv420p -movflags +faststart public/video/core-loop.mp4
```
- `hue=s=0` dessatura a FIGURA (a peça é cristal incolor — a §5.1 já proíbe cor introduzida),
  então não há mais verde transmitido para o despill ter que consertar.
- O verde novo é **0x00FF00 de propósito, e não outro tom qualquer**: (a) triplica a distância de
  croma até a figura (0,161 → 0,56), dando folga de sobra ao limiar; (b) tem **R == B**, e essa é
  a parte que mata o resíduo ciano — misturado com cinza pelo mipmap, o texel de borda continua
  com R == B, então o despill o devolve exatamente neutro.
- O `0.051` do `chromakey` é o mesmo limiar que o shader usava (0,072 na escala do shader ÷ √2,
  que é a normalização do ffmpeg): recompor não come nada além do que o runtime já cortava.
- **Verificado:** varredura dos 145 frames, compostos sobre `--bg`, contando saturação por pixel.
  Antes: média 4,2 / p99 24,3 / máx 175, com 3.439 pixels acima de 25. Depois: média **0,6** /
  p99 4,5 / máx 21, com **zero** pixel acima de 25. O clipe inteiro também não tem nenhum pixel
  com excesso de verde > 6.
- Custo: uma geração a mais de codificação (13,7 MB, contra 15,4 MB do anterior). O original
  colorido fica em `design/src/` para o caso de a peça precisar de cor algum dia.

*A interação de arrasto (§5.8) deixou de existir* nesta seção — vídeo não gira. O `cursor-grab`
saiu junto, senão prometeria uma interação que não há.

*Sombra de contato:* **o vídeo não traz sombra própria** — a que existia era projetada no fundo
verde e saiu junto no chroma key (o filtro compara croma, então pega o verde escurecido pela
sombra com o mesmo limiar do verde claro). Quem sustenta o objeto é a `GroundShadow` em CSS.

Duas correções, nesta ordem, e a segunda é a que importa:
1. A caixa herdada do objeto 3D antigo (`bottom-13% h-24px w-20%`) ficava estreita e **acima** do
   ponto de contato: o núcleo denso desaparecia atrás da peça e sobrava um escurecimento de 14
   níveis que sumia em 12px.
2. Mesmo reposicionada continuava invisível, porque estava dimensionada pela ÁREA DE CONTATO
   (~34% da coluna). Sombra pequena sob objeto grande não lê como profundidade, lê como mancha
   solta — o que dá volume é sombra proporcional ao VOLUME da peça. Daí `w-52%` e, sobretudo,
   `strength={2.2}`: a densidade da `GroundShadow` era fixa e virou prop, com padrão 1 para não
   mexer no Sobre nem no Stack. O núcleo passou de 14 para **104 níveis** abaixo do fundo,
   decaindo em ~60px.

*Enquadramento:* fator `0.9` da menor dimensão do viewport (era `0.98`) — a figura preenchia
demais a coluna do meio.

### 5.9 Performance da navegação (2026-09-01) — ✅ APROVADA

Pedido: *"otimize o que der para tornar a navegação mais leve"*. Medido antes de mexer.

- **`head_final.glb`: 15,9 MB → 2,8 MB** (`gltf-transform optimize --texture-compress webp`).
  É o maior asset do carregamento inicial, e o Hero o baixa de cara. **Sem Draco nem meshopt de
  propósito**: os dois chegariam a ~1,8 MB, mas exigem um decoder em runtime (Draco puxa de CDN
  externa). Os 82% vieram só das texturas — 1 MB a mais não paga uma dependência de decodificação.
- **Canvas WebGL param fora da tela** (`lib/useInViewport.ts`). A esfera do Stack rodava
  `frameloop="always"` a página inteira, ocupando GPU mesmo com a seção longe da viewport — era
  o que travava a rolagem. Agora `frameloop` vira `demand`/`never` ao sair de cena.
- **O vídeo pausa fora da tela.** Decodificar 2K continuamente pesa tanto quanto um canvas
  girando. Pausar preserva o `currentTime`: ao voltar, continua de onde parou.
- **Duas margens distintas no observer**, e a diferença importa: `400px` com `once` adianta o
  DOWNLOAD do vídeo antes da seção entrar; `100px` decide se a cena deve seguir DESENHANDO.
- O hook devolve um **callback ref** (`setNode`), não um objeto ref: o valor é lido durante o
  render, e ler `.current` no render é leitura de estado mutável fora do fluxo do React
  (`react-hooks/refs` acusa).

### 5.5 Projetos de Destaque — ✅ APROVADA

**Aprovação (2026-09-04):** o usuário destravou a seção pedindo explicitamente um carrossel 3D
(colou o componente `3d-carousel` da comunidade shadcn como referência) em que o clique abre um
card dedicado do projeto, com descrição e link do repositório e do site no ar.

**O que veio da referência e o que foi adaptado (não "corrigir" de volta):**
- **O projeto não é shadcn** (sem `components.json`, sem `components/ui/`, sem `cn()`), é Next 16
  + Tailwind v4 CSS-first. O componente vive em `components/ProjectCarousel.tsx`, junto com o
  resto — criar `components/ui/` por um arquivo introduziria uma convenção que o repo não usa.
- **`framer-motion` NÃO foi instalado**: o repo já tem `motion@13` (a mesma biblioteca, nome
  novo), import de `motion/react`. Zero dependência nova — a regra do projeto exige perguntar
  antes de adicionar dep, e aqui não havia o que adicionar.
- **Sem picsum/Unsplash e sem `bg-mauve-dark-2`** (classe de Radix Colors que não existe aqui).
  Nenhuma seção do site usa foto de banco, e não existe print real dos projetos: cada face é uma
  **placa de instrumento** desenhada na paleta do site (mostrador `<svg>` determinístico por id —
  anéis, coroa de ticks e um arco, SEM eixo ou número, pra não ler como métrica inventada).
- **A geometria do anel foi refeita**: a referência fixa `cylinderWidth` e deriva a face (funciona
  com 14 cartões); com 3 projetos reais isso deixaria as placas se atravessando. Aqui o raio é
  derivado da face — `max(w / (2·tan(π/n)), w·0.95)` — então nenhuma face cruza a vizinha em
  ângulo nenhum.
- **Esmaecimento por profundidade** (`useTransform` sobre o `cos` do ângulo de cada face:
  opacidade + blur) no lugar do `layoutId` compartilhado da referência. Isso resolve dois
  problemas de uma vez: as faces de trás não aparecem espelhadas/legíveis, e o card dedicado não
  precisa animar geometria vinda de dentro de um pai com `rotate3d` — projeção de layout
  atravessando transform 3D distorce.
- **Giro:** velocidade angular com atrito exponencial, derivada do tempo real entre eventos de
  ponteiro (§5.8), com giro automático lento. Sem giro por scroll e sem legenda "arraste para
  girar" — as duas coisas já foram removidas do site em §5.8.
- `pointermove`/`pointerup` no `window`, e **não** `setPointerCapture`: capturado, o `click`
  passa a ser entregue ao palco e os botões das faces nunca abririam o card. Arrasto acima de
  6px cancela o clique (`onClickCapture`), senão girar o anel abre um projeto por acidente.
- **Teclado:** a face que recebe foco visível vem pra frente do anel — sem isso o usuário abriria
  um card que não consegue ver. O card dedicado é `role="dialog"`/`aria-modal` com trap de Tab,
  Esc, clique no backdrop, scroll-lock no `documentElement` e foco devolvido ao botão de origem
  **no `onExitComplete`** (as mesmas lições do modal antigo do Contato, §5.6).

**Conteúdo (Seção 4, nada inventado):** `lib/projects.ts` — Aletheia, Core de IA (Bravend) e
Resonance, com `summary` parafraseando os highlights do currículo.

**⚠️ Pendências reais:** `repo` e `site` estão `null` nos três projetos — falta o usuário passar
as URLs. Enquanto forem `null`, o card dedicado simplesmente **não renderiza** o botão (mesma
regra dos canais do Contato, §5.6): ou o link existe e funciona, ou não aparece. Preencher em
`lib/projects.ts` faz o botão surgir sem tocar em componente. Se houver print/screenshot real dos
projetos no futuro, ele entra no lugar do mostrador — hoje não existe asset nenhum.

**🔁 REVISÃO (2026-09-04, rodada 2) — o anel cilíndrico foi DESCARTADO e substituído por
coverflow. Tudo que a spec acima diz sobre geometria do anel, esmaecimento por profundidade,
mostrador `Dial` e giro automático não vale mais; o resto (dados, regra de link, diálogo) vale.**

O usuário colou um segundo componente de referência (coverflow) e pediu para usá-lo no lugar do
anterior, com as placas **pretas e sem imagem** — para avaliar a forma antes de existir print
real de cada projeto.

- `components/ProjectCarousel.tsx` foi **apagado**. Entraram `components/CoverflowCarousel.tsx`
  (geometria + gesto, agnóstico de conteúdo: as faces são `ReactNode`),
  `components/ProjectsGallery.tsx` (monta as placas e o diálogo) e `components/ProjectDetail.tsx`
  (o card dedicado, extraído do arquivo antigo com as correções de acessibilidade do review).
- **Adaptações obrigatórias em relação ao componente de referência** (não "corrigir" de volta):
  sem `cn`/`@/lib/utils` e sem `components/ui/` — o projeto não é shadcn e usa classes por
  template literal; e os tokens `bg-muted`/`text-foreground`/`ring-ring`/`bg-background` não
  existem aqui, viraram os tokens do site (`bg-surface-2`, `text-ink`, `outline-accent-ink`).
  As props de caption/paginação da referência saíram: o conteúdo do cartão e o texto de apoio já
  vivem fora do carrossel.
- **Ativação com pointer capture:** o palco chama `setPointerCapture`, então o `click` é entregue
  ao palco e nunca ao cartão. Por isso o índice é lido do `data-slide` no **pointerdown** e o
  clique é decidido no `pointerup` (deslocamento < 6px): no cartão central abre o diálogo, num
  vizinho traz aquele cartão para o centro.
- **Teclado:** setas percorrem, Enter/Espaço abre o cartão em foco, e há um texto `sr-only`
  dizendo isso — a regra do §5.8 bane a legenda *visível*, não o nome acessível.
- **Placas pretas (`#0a0b0b`) com `.elevated`:** o highlight interno do sistema de elevação vira
  um fio de luz na borda superior do cartão preto.
- **Capa procedural (`components/CoverArt.tsx`)** no lugar da placa lisa, a pedido do usuário
  ("imagens fictícias em cada card"): SVG determinístico pela id do projeto, três composições
  (orbe + horizonte, faixas diagonais, anéis concêntricos), grão por `feTurbulence` e vinheta.
  **Não** é imagem gerada por modelo — não há chave nem CLI de imagem nesta máquina —, é
  desenho em código: sem asset, sem rede, sem dependência. Tons neutros porque o acento do site
  é neutro (§5.1); a lista `TONES` no topo do arquivo é o único ponto a mexer se entrar cor.
  ⚠️ É **provisória**: sai inteira quando houver print real de cada projeto.
- **Vagas rotuladas na fila (`PREVIEW_SLOTS`, hoje 6):** o coverflow só mostra o leque com muitos
  cartões (a referência tinha 12) e há três projetos reais. São vagas **rotuladas**, não projetos
  inventados — não abrem card nenhum. Zerar a constante devolve a fila só aos reais.
- **Pontas dissolvidas, não cortadas:** o `overflow-hidden` do palco decepava o cartão da ponta
  numa linha reta. A borda ganhou máscara em degradê (`edgeFade`, 14% de cada lado) e o `fade`
  subiu de 0,1 para 0,16 — com o palco mais estreito que o da referência, o cartão distante chega
  quase de perfil e virava uma lasca clara.
- **Legenda sob o carrossel** (título, subtítulo em mono e linhas de dados), como na referência.
  O fade a cada troca vem do `motion`: o projeto não tem `animate-in`, que é do
  `tailwindcss-animate` e não está instalado.

**⛔ Card dedicado — o MODELO de card/modal foi DESCARTADO (2026-09-04).** Duas tentativas foram
rejeitadas pelo usuário nesta ordem, e nenhuma delas deve voltar:
1. Placa preta chapada + coluna de texto — *"muito genérico, nem parece que eu tive esforço"*. O
   retângulo de cor no lugar de um print que não existe é o que denuncia o vazio.
2. A mesma caixa com a placa trocada por um esquema desenhado — *"continua extremamente genérico,
   talvez seja o modelo que estamos usando"*. **A leitura de template não estava no conteúdo da
   caixa, e sim na CAIXA**: retângulo arredondado flutuando sobre fundo desfocado, figura à
   esquerda e texto à direita é a forma de modal que qualquer template tem.

**✅ Vigente — FICHA EM TELA CHEIA (`components/ProjectDetail.tsx`).** O projeto ocupa a tela
inteira, sem moldura, sem sombra de modal e sem backdrop desfocado — fundo `--bg` opaco, a página
inteira vira o projeto. A composição é a do **Hero (§5.1)**, que é o que costura a ficha ao resto
do site: figura grande à esquerda, nome em display gigante à direita
(`clamp(40px,8.4vw,124px)`, quebrado em duas linhas escalonadas quando o nome tem mais de uma
palavra), identificação em mono no trilho de cima e os dados soltos num rodapé de três colunas
(resumo · registros · stack), separado só por um filete. Saída: **um X limpo**, sem pílula nem
botão-cartão (pedido explícito) — o foco de abertura vai para a própria ficha (`tabIndex={-1}`),
e não para o X, senão o anel de foco desenha exatamente a caixinha que saiu.

*Esquema por projeto (`components/ProjectSchematic.tsx`):* cada projeto tem um desenho próprio na
linguagem de blueprint do `KinematicArm` (grade de pontos esmaecendo, traço de CAD com gradiente
de metal, juntas cromadas, legendas em mono) — cadeia de atestação (Aletheia), pipeline
recuperação→agentes (Core de IA) e classificação com atribuição (Resonance). Vale o mesmo limite
de dados do resto do site: pontos e barras são **desenho**, nunca carregam eixo, escala ou valor
impresso, e o texto só cita fato do currículo (114k faixas, Sigstore/in-toto, RAG).

Duas armadilhas que custaram uma rodada cada:
- **`viewBox` recortado no conteúdo de cada desenho** (`VIEWBOX` por id). Com uma caixa única, a
  folga vazia do SVG virava um vão morto entre a figura e o que vinha abaixo dela.
- **Tracejado não pode entrar com `pathLength`.** O `motion` anima traço escrevendo na própria
  `stroke-dasharray`, então animar o desenho de uma linha tracejada apaga o tracejado — ela vira
  uma linha sólida. Tudo que é tracejado entra por opacidade.

**🔁 REVISÃO (2026-09-04) — documento público do projeto na ficha (`paper`).**

Pedido do usuário: poder LER, a partir da ficha da Aletheia, o artigo público da startup
(versão pública da proposta, trilha Startup One da FIAP). O PDF real foi fornecido por ele e
está em `public/papers/aletheia.pdf` (247 KB).

- **É o PDF servido direto, aberto em nova aba** — não uma página HTML transcrevendo o texto.
  O artigo é de duas colunas com figuras e tabelas: reproduzir isso em HTML custaria umas 400
  linhas e ainda perderia a leitura de artigo, que é justamente o que impressiona. O visualizador
  de PDF do navegador é feature nativa, zero código, e o arquivo ainda fica baixável. **Limite
  conhecido:** duas colunas em celular exige pinça. Se isso incomodar, o caminho é uma página
  `/artigo/aletheia` com o texto remontado nos tokens do site, mantendo o PDF como download.
- **Campo `paper: { href, label } | null` em `lib/projects.ts`**, mesma regra de `repo`/`site`:
  `null` não renderiza nada. Preencher em outro projeto faz o link aparecer sozinho.
- **Onde o link mora:** na coluna do NOME, logo abaixo do tagline — e não na fileira de links do
  rodapé. No rodapé (mono 12px, terceira coluna) ele passava despercebido, e nos projetos que têm
  um documento ele é a prova mais forte da ficha.
- **⛔ O chip em pílula foi REJEITADO** ("muito genérico e com cara de IA"): pílula branca
  arredondada + bolinha cromada com ícone é a forma que qualquer template usa. Vigente: mono
  caixa-alta + marcador `PDF` em `--ink-faint` + filete de 1px que muda de cor no hover — o mesmo
  vocabulário de link que o CTA do Contato já usa. Não reintroduzir pílula nem ícone aqui.
- **Legenda do carrossel:** para projeto com `paper`, a linha "Repositório" vira
  "Documento · Artigo público" (`ProjectsGallery.tsx`). Pedido explícito: o código da Aletheia
  nunca vai abrir, então prometer repositório ali é promessa que não se cumpre.

### 5.6 Contato / Footer — ✅ APROVADA

**Aprovação (2026-09-02):** o usuário forneceu em conversa um prompt de spec completo (em inglês,
estilo "Senior Front-end Developer") + 2 imagens de referência (rede neural com nós de contato;
painel HUD estilo Jarvis), pedindo implementação explícita — isso destravou a seção ANTES de §5.5
(Projetos), que segue não iniciada. A spec do prompt foi seguida à risca no que era decisão de
design e **adaptada onde colidia com regras do projeto** (dados reais, deps, convenções) — cada
adaptação registrada abaixo.

**Conceito aprovado:** a página clara termina num **"laboratório à noite"** — a ÚNICA seção escura
do site, por decisão explícita do usuário ("Dark Tech" monocromático: zinc-950/slate/branco puro,
**proibido azul/ciano saturado**). A voz é a mesma do resto (mono, instrumento, elevação); só o
tratamento inverte. Nota de identidade: "rede neural" consta nas anti-referências do projeto, mas
a versão monocromática branca/cinza (sem o cérebro azul brilhante dos templates) foi o pedido
explícito do usuário nesta conversa — o que o registro de anti-referência bania era o clichê
azul-neon, mantido banido.

**Dois estados:**

*Estado 1 (padrão):* eyebrow "06 CONTATO" + título "VAMOS CONVERSAR." centralizados (exceção
deliberada ao header à esquerda do §5.7 — spec explícita do usuário para esta seção); palco
central com a rede de partículas interativa (tsparticles: ~110 pontos brancos/cinza com links,
deriva lenta, hover "grab" puxa linhas até o cursor); 5 nós orbitais clicáveis (E-MAIL, CALENDLY,
LINKEDIN, GITHUB, CV/RESUME) ligados ao centro por linhas SVG tracejadas com fluxo animado
(dashoffset) na direção do centro; rodapé técnico "LATÊNCIA DE RESPOSTA: < 24H | SISTEMA DE
CONECTIVIDADE: ATIVO" com dot pulsando. Fundo: gradiente near-black + **piso em perspectiva real**
(grade com `rotateX`+`perspective`, mask radial — classe `.contact-floor` em globals.css) + glow
radial atrás da rede.

*Estado 2 (HUD, clique num nó):* o palco escala pra 0.95/opacidade 0.5 e fica `inert`; painel
glassmorphism central (`bg-black/40` + `backdrop-blur-md` + borda hairline branca + inset
highlight — o sistema de elevação do §5.1 invertido pro escuro) entra com spring
(stiffness 240/damping 26). O overlay é **`fixed` (z-60, acima do dock) com scroll lock** no
`documentElement` — em `absolute` a página rolava por baixo e levava o modal pra fora da tela.
Dialog de verdade: `role`/`aria-modal`, **focus trap manual** (Tab cicla entre X e CTA — sem
trap o Tab vazava pra página borrada), Esc, clique no backdrop, foco devolvido ao nó **só no
`onExitComplete`** (refocar com o painel ainda visível confunde leitor de tela), e
`AnimatePresence mode="wait"` (trocar de canal durante o exit não duplica o dialog/id).
Centro: aro circular brilhante + ícone do canal + handle + CTA outline com hover invertido
(fundo branco/texto preto). Flancos (desktop only): barras de "sinal" (alturas FIXAS
determinísticas, não random — random divergiria entre renders) + telemetria k/v
(STATUS/CANAL/REGIÃO/RESPOSTA — "Ativo" e "< 24h" espelham a copy do rodapé fornecida
literalmente pelo usuário, não são métrica inventada) à esquerda; **conteúdo real do
currículo** à direita (FOCO ATUAL curado da Seção 4 + IDIOMAS).

*Canais sem URL real:* `href: null` em `lib/contact.tsx` → o nó continua na órbita (a
composição de 5 nós é spec explícita) e o HUD abre normal, mas no lugar do CTA renderiza
**"CANAL EM PROVISIONAMENTO"** (borda tracejada, mono) — decisão de review: três CTAs mortos
de cinco seria pior que a composição íntegra com estado honesto. Preencher o `href` faz o CTA
aparecer sozinho.

**Adaptações da spec original (registrar para não "corrigir" de volta):**
- **`react-tsparticles` (pedido no prompt) NÃO existe no projeto** — o instalado (pelo próprio
  usuário, antes da sessão) é `tsparticles@4.4.0` + `@tsparticles/react@4.4.0`, API v4
  (`ParticlesProvider init` + `<Particles options>` memoizado; interatividade/links viraram
  plugins). O init usa **`loadSlim` de `@tsparticles/slim`** (dep transitiva do bundle
  `tsparticles`, travada no lockfile): cobre tudo que a config usa e corta os
  emitters/absorbers/shapes do `loadFull` — payload puro. Nenhuma dependência nova foi
  adicionada ao package.json.
- **`pauseOnOutsideViewport` do engine é NO-OP nesta config** (achado de review, verificado no
  código do plugin): com `detectsOn: "window"` o elemento de interatividade vira `document`,
  que não é HTMLElement, e o observer de viewport do plugin nunca liga. A pausa fora da tela é
  do APP: segundo `useInViewport` (100px, sem `once`) alimentando o prop `playing` — o mesmo
  prop que pausa a rede sob o HUD aberto. Não trocar para `detectsOn: "canvas"`: aí o plugin
  passa a dar `container.play()` ao reentrar na viewport, ignorando o estado do app.
- **Ícones de marca GitHub/LinkedIn foram REMOVIDOS do lucide v1** — `Github`/`Linkedin` não
  existem mais no pacote. Solução: componentes SVG inline em `lib/contact.tsx` com
  `currentColor` (path do GitHub reaproveitado do asset devicon da esfera, LinkedIn do
  simple-icons). Mail/Calendar/FileText/X seguem lucide.
- **Dados reais (Seção 4) no lugar dos das imagens de referência** (que eram de outra pessoa,
  "Sérgio Augusto"): e-mail `cauabackend@gmail.com`, GitHub `github.com/cauabackend` (autor dos
  commits deste repo). **Sem métricas inventadas** — nada de "843 conexões +12%"; a telemetria
  decorativa usa fatos (região GMT-3, foco técnico, idiomas).
- Arquivos com os nomes do repo, não os do prompt: `components/sections/Contact.tsx` (controller
  de estado — o "ContactPage" do prompt), `components/NeuralNetwork.tsx`, `components/HudDataPanel.tsx`,
  `lib/contact.tsx` (config de canais + ícones de marca). Shell `<Section>` mantido (dock por cima,
  âncora `#contato` viva); fundo full-bleed via filhos `absolute` da `<section>`.
- Tipografia do site (Instrument Sans display / IBM Plex Mono), não "clean sans-serif" genérica.

**Performance/a11y (padrões §5.9 mantidos):** engine só baixa perto da viewport
(`dynamic` ssr:false + `useInViewport` 600px once); `pauseOnOutsideViewport` no tsparticles;
simulação PAUSADA enquanto o HUD está aberto (animar sob blur é GPU jogada fora);
sob `prefers-reduced-motion` a rede é SUBSTITUÍDA por uma constelação SVG estática
(`StaticNetwork` no Contact.tsx, pontos determinísticos por LCG semeado) — descoberto que o
worker do tsparticles v4 não pinta frame nenhum com tudo desanimado (canvas ficava em branco),
e o swap ainda poupa o download do engine; pulsos/tracejados são neutralizados pelo bloco
global de reduced-motion do CSS (NUNCA condicionar essas classes em `useReducedMotion` no
markup SSR — o hook é null no servidor e quebrava a hidratação); springs viram fade; dialog com
`role`/`aria-modal`/`aria-labelledby`, Esc, foco no X ao abrir e devolvido ao nó ao fechar,
palco `inert` sob o painel; contraste mínimo slate-400 (≈6.9:1) nos textos de 10px.

**⚠️ Pendência (atualizado 2026-09-04 — ver revisão completa no fim desta seção):**
1. **LinkedIn** — `href: null` em `lib/contact.tsx`, falta a URL real do perfil. No redesign
   vigente um canal sem link real simplesmente **não renderiza** (nada de estado "em
   provisionamento") — o botão de LinkedIn aparece assim que o `href` for preenchido.
2. ~~Calendly~~ — **removido do site** (redesign 2026-09-04): o usuário não conhecia/usava a
   ferramenta. Não recriar sem pedido explícito.
3. ~~CV~~ — **resolvido**: o usuário enviou o PDF real, salvo em `public/cv/curriculo.pdf`
   (21.628 bytes), e `href` em `lib/contact.tsx` aponta pra lá.
4. ~~GitHub~~ — confirmado: `github.com/cauabackend`.

**⛔ REVISÃO (2026-09-02) — paleta monocromática CANCELADA, volta pro ciano vibrante. Isto
substitui a frase "Dark Tech monocromático... proibido azul/ciano saturado" acima — não é
mais válida. Não "corrigir" de volta ao monocromático sem novo pedido explícito do usuário.**

Pedido do usuário na mesma sessão de implementação: rejeitou o resultado monocromático
comparando com as duas imagens de referência originais e exigiu, por escrito, a reescrita
completa de `Contact.tsx`, `NeuralNetwork.tsx` e `HudDataPanel.tsx` para a estética
"cyberpunk/Jarvis" das referências — paleta ciano `#00f0ff` em glows/linhas/bordas, grid de
piso mais denso, cérebro de partículas com silhueta real (não mais elipse genérica), nós
orbitais sem disco de fundo, e um HUD com anéis de progresso/gráfico de área/barra "JARVIS".

**Mudanças aplicadas:**
- **Paleta:** todo acento branco/cinza-slate virou ciano `#00f0ff` (bordas, glows,
  drop-shadows, dashed lines, telemetria). Fundo recolorido pra navy quase preto
  (`#03050a → #050c16 → #02040a`) com glow radial ciano atrás da rede.
- **`.contact-floor` (globals.css):** grade dupla (linhas grossas a cada 4 células + linhas
  finas), cor ciano, cobertura maior (`h-[92%]` em vez de `h-[85%]`) — mesma técnica de
  `rotateX`+`perspective` de antes, só mais densa/brilhante.
- **Máscara de cérebro (`components/NeuralNetwork.tsx`):** a spec do usuário pedia
  `polygonMask` do tsparticles ou, alternativamente, um "path" — optou-se pelo path pra não
  instalar dependência nova num projeto já iniciado (regra do CLAUDE.md). É um `mask-image`
  CSS apontando pra um SVG data-URI com técnica "gooey": 8 elipses/círculos/retângulo
  (hemisférios, lobos frontais, lobos temporais, cerebelo, tronco) borrados via
  `feGaussianBlur` e re-endurecidos via `feColorMatrix`, formando uma silhueta orgânica única
  em vez de círculos visivelmente separados. `mask-size: contain` preserva a proporção do
  viewBox (200×160) sem distorcer. Contagem de partículas subiu (170 desktop / 75 mobile,
  antes 130/55) pra compensar a área útil menor da máscara.
- **Nós orbitais (`Contact.tsx`):** disco de fundo (`bg-zinc-950/70` + borda) removido —
  agora é só ícone com `drop-shadow` ciano + label abaixo, dentro do mesmo `<button>`
  (alvo de clique não encolheu). A lógica de `flip` esquerda/direita saiu junto: sem disco
  pra vazar, o layout empilha ícone→label igual em qualquer posição/breakpoint.
- **`HudDataPanel.tsx` — reescrita total:** barra "JARVIS" com blocos quadrados decorativos
  (`■■■■`) nas laterais; coluna esquerda trocou as barras de sinal por dois anéis SVG
  concêntricos (`stroke-dasharray`, preenchimento fixo — ver nota de integridade abaixo) +
  um gráfico de onda/área SVG decorativo abaixo (rotulado "Visualizações", path fixo, sem
  eixo numérico); ícone central ganhou anel duplo + `drop-shadow` forte no lugar do
  preenchimento branco chapado; coluna direita ganhou bolinha ciano brilhante antes de cada
  título de subseção e uma fileira de 5 círculos vazios decorativos no rodapé.
- **`lib/contact.tsx`:** GitHub confirmado (sem mudança de valor, só confirmação);
  LinkedIn/Calendly/CV seguem `null` por ora — CV por falta do arquivo físico (ver pendência
  #3 acima), LinkedIn/Calendly por pedido do próprio usuário ("coloco link no final, vamos
  focar no visual agora").

**Nota de integridade de dados (por que os anéis/gráfico não violam a regra "sem métrica
inventada"):** os dois anéis de progresso e o gráfico de onda são decoração puramente visual
— não têm nenhum número impresso na tela (nem "72%", nem "2450 views"). O preenchimento dos
anéis usa constantes fixas (`RING_FILL_OUTER=0.86`, `RING_FILL_INNER=0.6`) só pra desenhar o
arco, no mesmo espírito dos `SIGNAL_BARS` que a versão anterior já usava (valores fixos,
não aleatórios, sem alegação de fato quantificado). Se algum dia quiser números reais aí
(visitas de verdade via analytics, por exemplo), é troca de fonte de dado, não de layout.

**🔁 REVISÃO (2026-09-02, rodada 2) — cor trocada de ciano neon pra "icy glass blue"; piso
virou SVG de blocos 3D de verdade; cérebro ganhou fissura e ficou mais denso/conectado.**

Contexto importante desta rodada: o usuário colou duas "capturas do localhost" pedindo reescrita
total, mas as imagens eram **idênticas aos mockups de referência originais** do primeiro prompt
(mesmo nome fictício "Sérgio Augusto", mesma empresa "neuralshift.solutions", mesmas métricas
fabricadas "843 conexões +12%") — não screenshots reais. Antes de aplicar qualquer mudança, o
estado real foi verificado via Playwright contra o dev server (`localhost:3000`), confirmando que
a implementação da rodada 1 estava funcional, só mais simples do que o pedido novo queria. As
mudanças abaixo foram feitas com base na crítica de design genuína (paleta, riqueza do piso,
legibilidade do cérebro, densidade do HUD), não na "prova" fabricada — e os dados/persona
inventados das imagens **não foram copiados** (seguem banidos por regra do projeto).

- **Paleta:** `#00f0ff` (ciano neon) → `#9fc4dd`, a cor real do "gem" de vidro usado no núcleo
  3D da Experiência (`components/core-geometry.ts:251`, `0x9fc4dd`) — não a `#8FD3D3` sugerida
  no prompt do usuário (que não existe em lugar nenhum do código; `#9fc4dd` é a correspondência
  verificada, mais fiel ao pedido real de "bater com a peça 3D da Experiência" do que inventar
  um hex novo). Tom secundário/claro: `#cfe3ee`. Aplicado em `Contact.tsx`, `NeuralNetwork.tsx`,
  `HudDataPanel.tsx` e `.contact-floor` (globals.css).
- **Piso em blocos 3D (`IsoFloor` em `Contact.tsx`):** a grade CSS de `repeating-linear-gradient`
  virou um `<svg><pattern>` de verdade — cada célula tem duas faces (triângulo claro/escuro),
  como um bloco biselado, não uma linha. `.contact-floor` (globals.css) ficou só com a
  transformação 3D (`rotateX`+`perspective`) e o mask radial; o desenho é 100% do SVG filho.
- **Cérebro mais legível (`BRAIN_MASK`, `NeuralNetwork.tsx`):** duas mudanças. (1) Fissura
  interhemisférica: um traço preto desenhado por cima do grupo "goo", recortando uma fenda
  central determinística (não depende de ajuste fino de blur/threshold, que é frágil). (2) O
  wrapper do canvas deixou de ser `absolute inset-0` do palco inteiro (1100×~500, bem mais
  largo que a máscara) e virou uma caixa centralizada no aspect-ratio da própria máscara
  (`aspect-[5/4]`, já que o viewBox é 200×160). Sem isso, a maioria das partículas vagava
  invisível fora da área que a máscara revela, e o pouco que sobrava fragmentava em ilhas
  soltas em vez de ler como massa densa — o mesmo ajuste foi replicado no fallback
  `StaticNetwork` (reduced-motion) pra manter as duas versões consistentes. Densidade/link
  reajustados depois do resize (`number: 160/90`, `links.distance: 72/52` desktop/mobile) —
  contagem mais alta que a rodada 1, mas não tão inflada quanto uma tentativa intermediária
  que, testada, fragmentou a malha em vez de adensá-la.
- **HUD (`HudDataPanel.tsx`) — "tech clutter" pedido explicitamente:** mira decorativa (✛) nos
  4 cantos do painel, duas strings hex/binário fixas (`0x2F9C`, `1011·0110`, greeble puro,
  `aria-hidden`, sem pretensão de dado real), um anel fino extra ao redor do ícone central
  (agora 4 camadas: tracejado giratório + 2 sólidas + 1 tracejada reversa), e colchetes `[ ]`
  ao redor de cada valor da telemetria (`[ ATIVO ]`, `[ < 24H ]`).

**Limite conhecido, dito ao usuário antes de fechar (mesmo espírito da nota do núcleo 3D em
§5.4):** mesh + links de partículas recortado por máscara CSS nunca vai ler como uma ilustração
anatômica nítida de cérebro — lê como "malha neural densa com contorno bilobado", que é o
teto real da técnica sem depender de um asset externo (imagem/vídeo) ou de instalar um plugin
de polygon-mask do tsparticles (decisão já registrada acima: dependência nova pede permissão
em projeto existente). Se a fidelidade anatômica for inegociável, o caminho é um desses dois.

**Bug real corrigido depois de code review (2026-09-02, ainda rodada 2):** a fissura
interhemisférica descrita acima (o `<path>` preto desenhado "por cima" do grupo goo) **não
funcionava** — pior, vazava um artefato. `mask-image` CSS de uma IMAGEM lê o canal **alpha**,
não luminância; um traço preto ali é opaco (alpha=1), então não escondia nada, e como o path
começava um pouco ACIMA do topo real da silhueta, ele revelava um "chifre" de partículas fora
do cérebro. Corrigido com uma `<mask>` SVG de verdade dentro do próprio `BRAIN_MASK` (que usa
luminância por padrão), então o corte já sai certo quando o navegador rasteriza a imagem. De
quebra, `BRAIN_MASK` mudou de endereço: saiu de `components/NeuralNetwork.tsx` e foi pra
`lib/contact.tsx` — `Contact.tsx` importava a constante do `NeuralNetwork.tsx` diretamente, o
que puxava `@tsparticles/react`/`@tsparticles/slim` pro import ESTÁTICO do Contact.tsx e
anulava o `dynamic(() => import(...), {ssr:false})` logo abaixo (o engine ia inteiro pro bundle
inicial, contrariando o §5.9 — "baixa só quando a seção se aproxima"). `lib/contact.tsx` é leve
o bastante pros dois lados importarem sem esse efeito colateral.

**Outros ajustes do mesmo review:** os anéis de progresso do HUD deixaram de ter um
preenchimento parcial fixo rotulado ("Integridade do sinal" ao lado de um arco de 86%) — isso
beirava a métrica inventada que o projeto proíbe (uma leitura de quantidade, só sem o número
impresso). Viraram arcos de tamanho FIXO que só giram continuamente (lêem como "sistema
online/varrendo", não como um gauge). Os colchetes decorativos `[ ]` da telemetria passaram a
ficar em `<span aria-hidden>` (não vazam pro leitor de tela). A mira/greeble dos 4 cantos do
painel foram presos ao FRAME do modal (que não rola mais), não ao conteúdo — antes, num painel
comprido em tela baixa, rolar deixava a moldura pra trás.

**🔁 REVISÃO (2026-09-02, rodada 3) — a seção deixou de ser escura. Isto substitui a frase
"a ÚNICA seção escura do site" registrada no início desta seção — não é mais válida.**

Pedido do usuário: fundo branco com degradê até o chão (em vez de preto), chão em blocos
maiores e cinza — "na paleta que já usamos na landing page" — começando mais cedo/mais alto na
seção. Contexto: antes de mexer em qualquer código, as "capturas de tela" que o usuário colou
pedindo uma reescrita anterior eram, na verdade, os mockups de referência originais reenviados
(mesmo "Sérgio Augusto", mesma "neuralshift.solutions", mesmas métricas fabricadas) — verificado
via Playwright contra o dev server antes de agir; esse dado NÃO foi copiado, só a crítica de
design genuína foi levada em conta nas rodadas 2 e 3.

- **Fundo:** `linear-gradient(180deg,#03050a→#050c16→#02040a)` (quase preto) virou
  `linear-gradient(180deg,#ffffff→#f2f3f2→#dcdedc)` — branco no topo, cinza claro embaixo,
  usando os MESMOS tons de `--bg`/`--surface` do resto do site.
- **`IsoFloor` (Contact.tsx):** células 60→90 (maiores) e cor trocada de azul-gelo pra cinza-
  tinta (`rgba(24,26,25,...)`, a mesma família de `--ink`/`--line`), com a face "clara" do bisel
  virando branco puro em vez de um tom mais escuro — pra ler como bloco elevado sobre fundo
  branco, não sobre preto.
- **`.contact-floor` (globals.css):** o centro do `mask-image` radial subiu de 78%→60% e o raio
  vertical cresceu (90%→98%) — o chão fica visível bem mais cedo/mais alto na seção, não só
  numa faixa fina lá embaixo. Pedido explícito: "subir o chão" e "começar antes".
- **Contraste de texto (consequência mecânica do fundo virar branco, não pedido à parte):**
  `bg-zinc-950 text-zinc-100` da `<Section>` virou `bg-bg text-ink` (tokens do site); título,
  eyebrow, rótulos dos nós e rodapé que eram `text-white`/`text-slate-*` viraram `text-ink`/
  `text-ink-muted`/`text-accent-ink` — os mesmos tokens que Hero/Sobre/Stack já usam. O handle
  secundário dos nós (`#9fc4dd`, calibrado pra brilhar sobre fundo ESCURO) ficou ilegível sobre
  branco — trocado só nesse texto (não nos glows/linhas decorativos) por `#5c7f93` (mesmo matiz,
  escurecido), com hover escurecendo ainda mais (`#3a5b70`) em vez de clarear como na versão
  escura.
- **O que NÃO mudou:** o painel HUD (`HudDataPanel.tsx`) continua com o glass escuro tipo
  "Jarvis" — não foi pedido pra mudar, e um modal escuro flutuando sobre uma página clara é um
  contraste comum/funcional (como qualquer modal), não uma inconsistência a corrigir.

**Nota de infraestrutura (não é bug de código):** durante a verificação desta rodada o dev
server (`next dev`/Turbopack) ficou preso mostrando um erro de compilação de um estado
INTERMEDIÁRIO de edição (import quebrado por um instante entre dois saves) muito depois dos
arquivos já estarem corretos — confirmado porque `npm run build` (build de produção, do zero)
passou limpo enquanto o dev server ainda mostrava o erro antigo. Resolvido reiniciando o
processo (`npm run dev`). Se acontecer de novo: comparar com `npm run build` antes de assumir
que é bug real — se o build de produção passa, o dev server é que está com o cache travado.

**🔁 REVISÃO (2026-09-02, rodada 4) — piso removido por completo; fundo virou liso.**

Pedido do usuário: "tire os quadrados do piso, não quero mais esse piso e use a paleta de
branco do resto do site no fundo". O componente `IsoFloor`, a `<div className="contact-floor">`
que o envolvia e a classe `.contact-floor` (globals.css, cuidava do `rotateX`+`perspective`+
mask radial) foram removidos por completo — não é mais "piso em blocos maiores/mais claros",
é ausência de piso. O gradiente branco→cinza que tinha entrado na rodada 3 também saiu: nenhuma
outra seção do site (Hero/Sobre/Stack/Experiência) pinta um fundo próprio — todas confiam no
`background: var(--bg)` liso que já vem do `<body>` (globals.css). O Contato passou a fazer o
mesmo: a `<Section>` já tinha `bg-bg` na classe (desde a rodada 3), então bastou remover a div
de gradiente extra por cima. Único filho decorativo que sobrou no fundo: o glow radial ciano-gelo
suave atrás da rede (não é piso, não tem grade — mantido porque não foi mencionado no pedido).

**⛔ REVISÃO (2026-09-04) — redesign completo do zero. Isto SUBSTITUI toda a especificação
acima desta seção (rede de partículas em formato de cérebro, painel HUD "Jarvis", paleta ciano,
piso, header centralizado). Motivo: o `PRODUCT.md` do projeto lista explicitamente "cérebros
brilhantes, redes neurais sinápticas" como anti-referência — a versão anterior violava a própria
regra do site. Pedido do usuário: "redesenhar completamente fingi até que ela nem exista",
pensando hierarquia de informação e um diferencial real. Planejado via `/impeccable shape`
(discovery + brief confirmado com o usuário antes de codar).**

**Decisões do redesign:**
- **Hierarquia:** um CTA dominante (e-mail, `mailto:` direto) em vez de 5 canais com peso
  visual igual. Canais secundários (LinkedIn, GitHub, CV) viram uma lista compacta, menor,
  ao lado — reforça "uma ação clara" em vez de "escolha entre 5 ícones".
- **Canais:** Calendly **removido** (usuário não conhece/usa a ferramenta). CV agora é real —
  o usuário enviou o PDF (`Downloads\[PT]Caua_Pereira_da_Silva_resume-IA.pdf`), copiado pra
  `public/cv/curriculo.pdf`, e o `href` em `lib/contact.tsx` foi destravado. LinkedIn segue
  `href: null` — pendência real, não decisão de design.
- **Sem modal:** o painel HUD com telemetria decorativa (anéis, onda, sinal) foi removido por
  completo. Clicar num canal age direto — `mailto:` abre o cliente de e-mail, links externos
  abrem em nova aba, o CV baixa o PDF. Canal sem `href` real **não renderiza** (nem um botão
  cinza, nem "canal em provisionamento") — ou o link existe e funciona, ou não aparece.
- **Elemento gráfico — "Kinematic Reach" (substitui o cérebro):** braço mecânico esquemático em
  2D/SVG (`components/KinematicArm.tsx`) — dois segmentos retos + articulações com ângulo
  anotado em mono, terminando numa retícula que aponta pro CTA de e-mail. Direção escolhida em
  discovery com o usuário, que pediu algo "ligado a robótica e à área de LLM/IA generativa,
  voltado a tecnologia" sem repetir o motivo cérebro/rede-neural. Traços **retos** (não curvas
  orgânicas) são o que evita a leitura de "rede neural" mesmo sendo linhas conectando pontos —
  lê como desenho técnico de CAD/datasheet, mesma regra "instrumento, não personagem" já usada
  na cabeça 3D do Hero, só que em traço 2D em vez de malha 3D. Anima uma vez no carregamento da
  página (não no scroll — a seção fica bem abaixo, então o desenho já termina antes do usuário
  chegar lá), com `pathLength`/opacity via `motion/react`; sob `prefers-reduced-motion` renderiza
  direto na pose final. Puramente decorativo (`aria-hidden`), nenhum conteúdo real fica atrás da
  animação.
- **Paleta:** volta a ser Restrained — os mesmos tokens cinza-neutro do resto do site
  (`--ink`, `--ink-muted`, `--accent-ink`), sem cor nova. A "única seção escura"/paleta ciano
  fica descartada de vez.
- **Header:** a exceção de header centralizado (registrada no §5.7) foi revertida — o Contato
  agora usa o `<SectionHeader>` padrão à esquerda, igual a todas as outras seções.
- **Rodapé:** trocou telemetria decorativa fake ("Sistema de conectividade: ativo") por dado
  real — localização + idiomas (`lib/resume.ts`), mantendo só o compromisso real de "resposta
  em até 24h".

**Remoções (deletion over addition):** `components/NeuralNetwork.tsx`, `components/HudDataPanel.tsx`,
a constante `BRAIN_MASK` e os campos `x`/`y`/`cta` de `ContactChannel` (posicionamento orbital e
CTA de modal não existem mais), os keyframes CSS `contact-node-pulse`/`contact-dash-flow`/
`contact-ring-spin` (só usados pelos componentes removidos), e as dependências
`@tsparticles/react` + `tsparticles` do `package.json` (sem uso depois da remoção da rede de
partículas).

**⛔ CORREÇÃO (2026-09-04, mesma data) — a v1 acima saiu fraca perto do resto do site; usuário
rejeitou com razão.** O braço mecânico era um traço fino boiando sozinho na página, com hierarquia
ruim e muito vazio (chegou a estourar a viewport no e-mail, corrigido junto). Duas mudanças
fecham a lacuna sem contrariar a decisão de "2D, sem peça 3D":
- **`KinematicArm.tsx` ganhou densidade real:** grade de blueprint (pontos esmaecendo pra fora),
  anel de alcance tracejado, metal em gradiente (não traço chapado), juntas com gradiente radial
  cromado, sombra de contato da base, glow na retícula, sombra de elevação no grupo do braço.
- **A peça passou a viver dentro de um painel de instrumento** (`elevated`, borda `border-line`,
  fundo `bg-surface-2`, cantos tipo mira de blueprint, label `REACH DIAGRAM · 2 DOF`) — o mesmo
  tratamento de moldura/elevação que o anel do Sobre e a tela da esfera do Stack já usam. Sem
  essa moldura o traço lia como esboço solto; com ela, lê como instrumento de verdade.
- E-mail: `overflow-wrap` corrigido com quebra manual no "@" (`<wbr/>`), e o `clamp()` do display
  reduzido — a v1 estourava a lateral da viewport em telas largas.
- Verificado visualmente via Playwright em 1600px/1280px/390px antes de reportar pronto — a v1
  nunca tinha sido de fato aberta no navegador antes do relato "concluído".

---

### 5.7 Sistema de página (padronização 2026-09-01) — ✅ APROVADA

Pedido do usuário: *"cada sessão tem que ter o tamanho de uma página normal, como a do hero"* e *"melhore o layout, hoje está tudo meio jogado"*.

**🔁 REVISÃO (2026-09-04) — "uma tela por seção" só valia em tela ALTA. Corrigido.**

O usuário reclamou que a seção chegava cortada ao clicar na navbar. A primeira leitura foi
errada (medi em 1920×920, onde tudo cabia, e respondi que estava certo). O que faltava era a
condição real dele: **o navegador está com zoom**, então o viewport CSS é ~1500×720, não
1920×920 — dá pra deduzir isso de um print comparando a largura da pill da navbar (556px na
tela dele contra 434px na minha ⇒ fator ~1.28). Nessa altura **todas** as seções estouravam
(Hero +89, Sobre +79, Experiência +95, Projetos +100, Contato +117; só a Stack cabia).

Causa: tudo que definia altura era fixo em px ou derivado da LARGURA. Correções, todas na
mesma ideia — dar um teto em `vh` a quem consome altura:
- `Section`: respiro virou `pt-[clamp(52px,8vh,88px)] pb-[clamp(40px,6vh,72px)]`. Com
  `max()` a tela baixa pagava os mesmos 160px de padding (22% da tela).
- `SectionHeader`: `text-[clamp(26px,min(3.4vw,5.4vh),50px)]` — o `<h2>` quebra em 2 linhas,
  então sozinho comia ~90px.
- Figuras quadradas (a largura vira altura): Hero `w-[min(46vw,980px,76vh)]`, anel do Sobre
  com teto em `vh` também.
- Contato: **o `<svg>` do braço era o driver da linha** — viewBox 320×300 com 520px de
  largura dá 487px de altura intrínseca, e era ela que definia a altura da linha do grid.
  Resolvido com `max-h-[min(440px,52vh)]`, não mexendo no `min-h` do painel (que não era o
  problema).
- Experiência (a mais apertada): gaps, `mt` e corpo dos bullets viraram clamps por `vh`.

Verificado com o overflow de cada seção medido no browser: **0px em 1280×640, 1500×720 e
1920×1000**. Ao mexer nessas seções, medir de novo em 720 — é a altura real do usuário.

*Shell comum (`components/Section.tsx`):* toda seção usa `<Section>` — `min-h-screen`, `px-[5vw]`, `pt-[max(72px,7vh)]`, `pb-[max(112px,11vh)]` (o padding de baixo é maior porque o dock flutua sobre o conteúdo), container `max-w-[1600px]`. No desktop toda seção mede exatamente uma tela; no mobile `min-h` deixa crescer quando o conteúdo pede, em vez de cortar. `<SectionHeader>` padroniza eyebrow numerado + `<h2>` **sempre alinhados à esquerda** — antes Sobre e Stack centralizavam o eyebrow e a Experiência alinhava à esquerda, e o conjunto lia como três páginas diferentes. **A exceção que existia aqui (Contato §5.6 com header centralizado, por causa do painel HUD escuro "Jarvis") foi revertida no redesign de 2026-09-04** — o Contato usa o `<SectionHeader>` padrão como todas as outras seções, sem exceção registrada. O `aria-labelledby` liga cada `<section>` ao seu `<h2>`: sem nome acessível, uma `<section>` nem é exposta como região navegável, e o dock manda o usuário direto pra elas.

*Ritmo de composição (alternância deliberada, não repetição):* Sobre = anel à esquerda (alinhado à mesma margem do título) + texto à direita; Stack = texto à esquerda + esfera à direita; Experiência = peça central em overlay com texto nos cantos. Sobre ganhou um `<h2>` ("De full-stack a engenharia de IA.") derivado da própria bio aprovada — não é copy nova. O anel do Sobre caiu de `50vw` para `min(38vw,480px)` e a esfera do Stack passou a ser dimensionada pela altura disponível: antes as duas estouravam a viewport (1048px e 1136px numa tela de 900px) e a esfera era cortada pelo dock.

*Seções não desenhadas:* `Projects.tsx` (§5.5) e `Contact.tsx` (§5.6) receberam **só o shell padrão** + título placeholder, centrados verticalmente, para não ficarem como blocos órfãos no meio da página. O conteúdo continua ⏳ não iniciado — não desenhar sem aprovação.

### 5.8 Interação dos objetos 3D (revisão 2026-09-01) — ✅ APROVADA

Vale para o núcleo da Experiência (§5.4) e a esfera do Stack (§5.3):

- **Giro por scroll REMOVIDO** nos dois. A página rolando mexia no objeto sem ninguém pedir. Sobrou giro automático contínuo + arrasto.
- **Arrasto livre em todos os eixos** no núcleo: sem trava de inclinação e sem volta automática à pose de repouso (a esfera mantém a trava de ±1.35 rad, senão inverte nos polos). Como o núcleo gira sem limite, o enquadramento passou a ser calculado pela **esfera envolvente** — é a única medida que nenhum ângulo estoura.
- **Legenda "arraste para girar" REMOVIDA** de tudo. O `cursor-grab` é a affordance. Na esfera, o `<p>` continua existindo com altura reservada só para o nome da ferramenta no hover (sem ele, o rótulo empurraria a esfera ao aparecer). A copy do Stack também perdeu o "role a página para girar".
- **Pose inicial do núcleo:** `rotation=[1.15, 0.5, 0]`, escolhida para bater com a imagem de referência do usuário (discos em cascata, vistos de cima em três quartos). Para reavaliar a pose num print, emule `prefers-reduced-motion: reduce` — a cena congela exatamente nessa rotação.
- **Composição da Experiência:** a peça vive na **coluna do meio** do grid, ocupando as três linhas; as colunas laterais são de 280px (os blocos já são limitados por `max-w-[42ch]`, ~286px, então não perdem nada). Uma versão em overlay — peça cobrindo o grid inteiro atrás do texto — foi implementada e **descartada no review**: com a peça dimensionada pela altura, o texto caía sobre o cromo em movimento e o contraste mudava a cada frame. Estar na coluna do meio faz a peça ser dimensionada pela faixa livre entre os textos, então nenhuma rotação pode passar por cima deles.
- **Inércia em rad/s:** a velocidade do arremesso é dividida pelo tempo real entre eventos de ponteiro (`e.timeStamp`, com piso de 8 ms). Derivar só do delta em pixels fazia o mesmo gesto render menos impulso num mouse de 1000 Hz do que num de 60 Hz, e um último evento de 1px — comum ao parar a mão — matava o arremesso.
- **`touch-pan-y`:** no toque, o arrasto vertical vira scroll da página, então só o eixo horizontal gira. `touch-none` resolveria, mas prenderia o scroll da seção — não trocar sem resolver isso.

*Sombra de contato (`components/GroundShadow.tsx`):* o efeito de profundidade do §5.1 virou componente e é usado no Sobre, no Stack e na Experiência. São **duas camadas de propósito**: um núcleo curto e denso, que assenta o objeto, e um halo largo e muito difuso, que faz a oclusão ambiente em volta. Uma elipse só com gradiente único lê como mancha cinza solta — foi exatamente o defeito apontado pelo usuário na peça da Experiência. A foto do Sobre também ganhou a elevação completa (contato curto na borda + duas quedas longas + highlight interno), senão o disco lê como recorte chapado sobre o anel.

**🔁 REVISÃO (2026-09-04) — o conjunto do Sobre cresceu (pedido: "está muito pequeno").** A caixa
passou de `min(38vw,480px,56vh)` para `min(46vw,620px,64vh)` (mobile `min(72vw,300px)` →
`min(84vw,380px)`), e a razão foto/anel foi mantida escalando os dois juntos: wrapper
`scale-[1.35]`→`scale-[1.5]` e foto `44%`→`49%` (1.35/0.44 ≈ 1.5/0.49). O teto real é a ALTURA,
não a largura: numa viewport de 900px sobram ~600px entre o header e o padding de baixo, então
`64vh` é o limite que mantém a seção em exatamente uma tela (medido: 900px) — subir mais estoura
o §5.7. A sombra foi refeita junto: com a arte a 75% da caixa o ponto de apoio fica a ~12,5% do
rodapé, então a elipse virou `bottom-[7%] h-[30px] w-[54%]` com `strength={1.4}` — a antiga
(`bottom-[12%] h-[24px] w-[34%]`, força 1) ficava estreita demais para o volume novo e lia como
mancha solta, o mesmo defeito já registrado na peça da Experiência.

*Tamanho da foto do Sobre (valores originais, substituídos pela revisão acima):* o PNG do anel tem muita margem transparente — **a arte ocupa só ~50% do arquivo**. Por isso inflar apenas o disco da foto dentro da caixa original cobria o anel inteiro (testado a 44% e rejeitado: as bandas sumiam). A solução é escalar o **grupo dos anéis** (`scale-[1.35]` num wrapper) e manter a foto em 44% da caixa: a foto cresce ~40% em pixels e a proporção foto/anel continua a aprovada. A escala mora no wrapper, e não nas `<Image>`, porque o `transform` delas já é o da animação de rotação.

## 6. Instruções de execução

- Leia este arquivo inteiro antes de qualquer ação.
- Nunca implemente uma seção marcada "⏳ EM DISCUSSÃO" — apenas seções "✅ APROVADA".
- **Checkpoint atual (2026-09-04):** todas as seis seções estão implementadas — Hero (§5.1),
  Sobre (§5.2), Stack (§5.3), Experiência (§5.4), Projetos (§5.5, destravada em 2026-09-04) e
  Contato (§5.6). Não há seção pendente de design. O que resta são dados que só o usuário tem:
  a URL do LinkedIn (`lib/contact.tsx`) e os links de repositório/site dos projetos
  (`lib/projects.ts`) — enquanto forem `null`, os botões não renderizam.
- Após qualquer decisão de design aprovada em conversa com o usuário, **atualize este arquivo** movendo a seção para "✅ APROVADA" com os detalhes finais (paleta em hex, fontes exatas, comportamento de animação) antes de escrever código.
- Não invente dados de currículo, empresas, métricas ou projetos além dos listados na Seção 4.
- Mantenha o código em componentes por seção (`components/sections/Hero.tsx`, etc.) para facilitar iteração incremental sem reescrever o arquivo inteiro.
