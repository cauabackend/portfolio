# Contexto do Projeto — Portfólio Cauã Pereira da Silva

> **Este arquivo é a fonte de verdade do projeto.** Ele deve ser lido por completo antes de qualquer implementação. Toda decisão de design/UX/conteúdo aprovada com o usuário é registrada aqui, na seção "Decisions Log", para que o contexto nunca se perca entre sessões do Claude Code.
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
> - **Experiência / Timeline (§5.4)** — segue ⏳ EM DISCUSSÃO. Um mockup de fio 3D foi tentado e **rejeitado pelo usuário** ("ficou horrível"); a direção final ainda não foi decidida. Não implementar nada desta seção, nem a versão 2D em canvas nem a 3D.
> - **Projetos de Destaque (§5.5)** — não iniciado.
> - **Contato / Footer (§5.6)** — não iniciado.
>
> **STATUS (2026-09-01): Hero + Sobre + Stack implementados, build/lint verdes.** As três seções estão em
> `components/sections/Hero.tsx`, `Sobre.tsx` e `Expertise.tsx` (esfera em `components/StackSphere.tsx`,
> cabeça 3D em `components/HeadStage.tsx`/`HeadScene.tsx`). `Experience.tsx`, `Projects.tsx` e `Contact.tsx`
> continuam sendo os scaffolds crus pré-existentes — não foram desenhados.
>
> Ao terminar Hero + Sobre + Stack, **pare e avise que está aguardando a próxima seção ser decidida com o usuário** — não prossiga para as seções seguintes "pra não deixar incompleto". Essa é uma instrução temporária desta rodada de implementação; será atualizada aqui quando §5.4 for aprovada.

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
4. Experiência Profissional / Timeline — ⏳ em decisão (ver §5.4)
5. Projetos de Destaque — não iniciado (ver §5.5)
6. Contato / Footer — não iniciado (ver §5.6)

Para cada seção: propor 2–3 direções visuais concretas (paleta, tipografia, elementos interativos) → debater com o usuário → só codar após aprovação explícita → registrar a decisão neste arquivo → avançar para a próxima.

**Nunca gerar o site completo de uma vez.**

## 4. Dados Reais do Currículo (fonte única de conteúdo — não inventar dados)

**Nome:** Cauã Pereira da Silva
**Localização:** São Paulo, SP
**Contato:** cauabackend@gmail.com _(telefone fica fora do repo por escolha do usuário — está só no currículo)_
**Educação:** Bacharelado em Engenharia de Software — FIAP (2025 – jun/2029), cursando o 3º semestre
**Idiomas:** Português (nativo), Inglês (B2), Espanhol (B1)

### Experiências & Projetos

**Bravend — Estágio em Engenharia de IA & ML** (jun/2026 – presente)
- Atuação central no core de IA da empresa
- Automação inteligente com ganho de eficiência de ~50%
- Fine-tuning de múltiplos agentes LLM (Claude, OpenAI, Codex), reduzindo custos operacionais em 15%
- Pipelines RAG e assistentes analíticos

**Aletheia — Co-Founder & AI Engineer** (2025 – presente)
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

Claude Code implementa:
1. `components/RobotHead.tsx`: carrega o `.glb` via `useGLTF` (drei), roda dentro de um `<Canvas>`.
2. Comportamento IDLE (sempre ativo, via `useFrame`): rotação leve senoidal no eixo Y (±2–4°, período lento ~4-6s), "respiração" sutil (scale ou emissive intensity oscilando muito discretamente), sem qualquer movimento de olhos independente (não segmentamos os olhos — ficou fora do escopo simplificado).
3. Comportamento AWAKENING/TRACKING (opcional, nice-to-have): pequena rotação adicional respondendo à posição do mouse ou ao progresso de scroll do Hero — bem sutil, não é obrigatório pra v1.
4. Canvas carregado só no client: `dynamic(() => import(...), { ssr: false })` no Next.js, já que Three.js precisa de WebGL do navegador.
5. `<Suspense>` com fallback simples (ex.: texto/HUD "BOOTING SYSTEM…") enquanto o modelo carrega.
6. **Não é mais necessário:** hero `sticky`/pinned, `scrollYProgress` controlando múltiplas fases, sistema de partículas, fase de desmontagem/rebuild — tudo isso foi removido do escopo (ver nota de mudança de escopo acima).
7. Resultado final: um componente `<RobotHead />` autocontido, pronto pra ser encaixado dentro do `Hero.tsx` assim que o layout do texto ao redor for decidido.

**✅ CONFIRMADO — `public/models/head_final.glb` presente e validado.** 30.000 triângulos, 1 mesh/node único (`model`), 3 texturas PBR embutidas (cor/normal/metálico-rugosidade) intactas. Pronto para o Claude Code implementar o `RobotHead.tsx` assim que `three`/`@react-three/fiber`/`@react-three/drei` forem instalados via npm.

*(Decisão final do usuário sobre A/B/C/D e ajustes devem ser adicionados aqui assim que aprovados — Hero segue ⏳ EM DISCUSSÃO até então.)*

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

**⚠️ Pendência não resolvida:** XGBoost, SHAP, Sigstore, in-toto e as Soft Skills não têm logo de marca disponível — ficaram de fora da esfera. Falta decidir onde essas entram (índice complementar abaixo da esfera? outra seção?) — **não implementar essa parte até essa decisão ser tomada com o usuário.**

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

### 5.4 Experiência / Timeline — ⏳ EM DISCUSSÃO

*(opções visuais a apresentar ao usuário; nada aprovado ainda)*

### 5.5 Projetos de Destaque — não iniciado

### 5.6 Contato / Footer — não iniciado

---

## 6. Instruções para o Claude Code

- Leia este arquivo inteiro antes de qualquer ação.
- Nunca implemente uma seção marcada "⏳ EM DISCUSSÃO" — apenas seções "✅ APROVADA".
- **Checkpoint desta rodada:** implemente Hero (§5.1) → Sobre (§5.2) → Stack (§5.3), nessa ordem, e então **pare**. Não crie `Experiencia.tsx`, `Projetos.tsx` ou `Contato.tsx`/`Footer.tsx` — essas seções não estão aprovadas (ver instrução no topo do arquivo). Se o usuário pedir explicitamente pra seguir além do checkpoint numa conversa futura, essa nota deve ser atualizada/removida antes.
- Após qualquer decisão de design aprovada em conversa com o usuário, **atualize este arquivo** movendo a seção para "✅ APROVADA" com os detalhes finais (paleta em hex, fontes exatas, comportamento de animação) antes de escrever código.
- Não invente dados de currículo, empresas, métricas ou projetos além dos listados na Seção 4.
- Mantenha o código em componentes por seção (`components/sections/Hero.tsx`, etc.) para facilitar iteração incremental sem reescrever o arquivo inteiro.
