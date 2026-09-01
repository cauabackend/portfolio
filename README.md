# Portfólio — Cauã Pereira da Silva

Landing page single-page que reposiciona a carreira de Full-Stack para **AI & Machine Learning
Engineer**. Direção estética: instrumento de precisão em tema claro cinza-neutro — nada de
gradiente roxo de "template de IA".

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · three.js / React Three Fiber · motion · lucide-react

## Rodando

```bash
npm install
npm run dev
```

## Estado

| Seção | Situação |
| --- | --- |
| Hero | ✅ implementada — tipografia gigante + cabeça 3D (`head_final.glb`) em pose fixa |
| Sobre | ✅ implementada — foto emoldurada por anéis de instrumento que giram |
| Stack | ✅ implementada — esfera geodésica metálica em R3F, arrastável nos dois eixos |
| Experiência · Projetos · Contato | ⏳ scaffolds crus, design ainda não decidido |

## Onde fica o contexto

**`CLAUDE.md` é a fonte de verdade do projeto.** Toda decisão de design aprovada — paleta em hex,
tipografia, comportamento de animação, o que foi tentado e rejeitado e por quê — está registrada
lá, seção por seção. Leia antes de mexer em qualquer coisa: várias escolhas que parecem
arbitrárias no código têm o motivo documentado (e o motivo costuma ser "já testamos o contrário").

Os mockups HTML aprovados que originaram as seções estão em `design/`.
