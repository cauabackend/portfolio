# 🎨 Portfólio Pessoal - Frontend

Portfólio pessoal moderno e responsivo desenvolvido como projeto pessoal, para fins educacionais e profissionais

- HTML
- CSS
- Java Script

## 📋 Sobre o Projeto

Site portfólio one-page (single page) para apresentar habilidades, projetos e informações de contato. Desenvolvido com foco em:

- ✨ Design moderno e minimalista
- 🌓 Tema claro/escuro (dark mode)
- 📱 Totalmente responsivo
- ⚡ Animações suaves ao scroll
- 🖱️ Indicador de scroll interativo
- 🎯 UX intuitiva

---

## 🚀 Funcionalidades

### **Principais:**
- **Navegação Suave**: Scroll suave entre seções com highlight automático do link ativo
- **Tema Dinâmico**: Alternância entre modo claro e escuro com persistência no localStorage
- **Sistema de Abas**: Organização de habilidades em categorias (Backend, Frontend, Ferramentas)
- **Animações de Scroll**: Cards e elementos aparecem suavemente ao scrollar a página
- **Indicador de Scroll**: Mouse animado que convida o visitante a explorar o site
- **Menu Mobile**: Menu hambúrguer responsivo para dispositivos móveis
- **Formulário de Contato**: Sistema de envio de mensagens com validação
- **Download de Currículo**: Botão para download do CV em PDF

### **Animações:**
- Fade in progressivo dos elementos ao scroll
- Bounce suave no indicador de scroll
- Hover effects em todos os cards
- Transições suaves entre temas
- Menu mobile com animação de ícone X

---

## 🛠️ Tecnologias Utilizadas

### **HTML5**
- Estrutura semântica
- Acessibilidade (ARIA labels)
- Meta tags para SEO
- One-page layout

### **CSS3**
- CSS Custom Properties (variáveis)
- Flexbox e Grid Layout
- Animações e transições CSS
- Media queries para responsividade
- Glassmorphism (efeito de vidro)
- Keyframe animations

### **JavaScript Vanilla**
- Manipulação do DOM
- Event Listeners
- LocalStorage para persistência
- Intersection Observer API
- Smooth scroll
- Validação de formulários
- Sistema de tabs dinâmico

---

## 📁 Estrutura de Arquivos

```
frontend/
│
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos e tema
├── script.js           # Lógica e interatividade
├── curriculo.pdf       # Currículo para download
└── README.md           # Este arquivo
```

---

## 🎨 Paleta de Cores

### **Tema Claro**
- **Background**: `#ffffff` (Branco)
- **Texto**: `#1f2937` (Cinza escuro)
- **Primária**: `#7c3aed` (Roxo vibrante)
- **Secundária**: `#a78bfa` (Roxo claro)
- **Cards**: `#f9fafb` (Cinza muito claro)

### **Tema Escuro**
- **Background**: `#0b0b0f` (Preto profundo)
- **Texto**: `#e5e7eb` (Cinza claro)
- **Primária**: `#8b5cf6` (Roxo)
- **Secundária**: `#a78bfa` (Roxo claro)
- **Cards**: `rgba(17, 17, 24, 0.8)` (Cinza translúcido)

---

## 🖥️ Como Executar

### **Opção 1: Abrir Diretamente no Navegador**

1. Clone o repositório
```bash
git clone https://github.com/seuusuario/portfolio.git
cd portfolio/frontend
```

2. Abra o arquivo `index.html` no navegador
```bash
# Windows
start index.html

# Mac
open index.html

# Linux
xdg-open index.html
```

### **Opção 2: Live Server (Recomendado)**

Se você usa **VS Code**, instale a extensão **Live Server**:

1. Abra a pasta `frontend` no VS Code
2. Clique com botão direito em `index.html`
3. Selecione **"Open with Live Server"**
4. O site abrirá em `http://localhost:5500`

### **Opção 3: Python HTTP Server**

```bash
# Python 3
python -m http.server 8000

# Acesse em: http://localhost:8000
```

---

## 📱 Responsividade

O site é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop** (>768px): Layout em duas colunas, navegação horizontal
- **Tablet** (≤768px): Layout em coluna única, menu mobile
- **Mobile** (≤640px): Textos reduzidos, cards empilhados

**Breakpoints:**
- 1400px: Aumenta tamanho da fonte para 20px
- 768px: Ativa menu hambúrguer
- 640px: Reduz tamanho de títulos

---

## ⚙️ Personalização

### **1. Alterar Informações Pessoais**

Edite o arquivo `index.html`:

```html
<a href="#home" class="logo">Seu Nome Aqui</a>

<p>Sua descrição personalizada...</p>

<a href="https://github.com/SEU_USUARIO">GitHub</a>
```

### **2. Modificar Cores do Tema**

Edite o arquivo `styles.css`:

```css
:root {
    --primary-color: #7c3aed;  /* Sua cor primária */
    --secondary-color: #a78bfa; /* Sua cor secundária */
}
```

### **3. Trocar Currículo**

Substitua o arquivo `curriculo.pdf` pelo seu CV e atualize o link:

```html
<a href="curriculo.pdf" download="Curriculo-SeuNome.pdf">
    📄 Download Currículo
</a>
```

### **4. Mudar Velocidade das Animações**

No `styles.css`:

```css
.fade-in-element {
    transition: opacity 0.6s ease-out; /* Ajuste de 0.6s para o valor desejado */
}
```

---

## ✨ Funcionalidades JavaScript Detalhadas

### **Toggle de Tema**
```javascript
toggleTheme()  // Alterna entre claro/escuro
// Salva automaticamente no localStorage
```

### **Sistema de Tabs**
```javascript
switchTab('backend')  // Troca para aba backend
// Opções: 'backend', 'frontend', 'ferramentas'
```

### **Smooth Scroll**
```javascript
// Automático ao clicar em links #
// Scroll suave para a seção correspondente
```

### **Indicador de Scroll**
- Clique no indicador para scrollar para "Sobre"
- Desaparece automaticamente após 100px de scroll
- Animação bounce contínua

### **Animações de Scroll**
- Usa Intersection Observer API
- 15% do elemento visível para ativar
- Delay progressivo em cards (0.1s, 0.2s, 0.3s...)

---

## 🐛 Problemas Comuns

### **Tema não está mudando**
- Verifique se o JavaScript está carregando
- Abra o console do navegador (F12) e veja se há erros
- Limpe o cache do navegador (Ctrl + Shift + R)

### **Indicador de scroll não aparece**
- Certifique-se de que a classe `.hero` tem `position: relative`
- Verifique se o CSS está carregando corretamente
- O indicador some automaticamente ao scrollar 100px

### **Animações não funcionam**
- Verifique o console (F12) para erros JavaScript
- Certifique-se de que `setupScrollAnimations()` está sendo chamado
- Teste em navegador moderno (Chrome, Firefox, Edge)

### **Menu mobile não aparece**
- Reduza o tamanho da janela do navegador (≤768px)
- Ou abra no modo responsivo do DevTools (F12 → Toggle Device)
- Verifique se há erros no console

---

## 📚 Conceitos Aplicados

Tecnologias e padrões utilizados:

- **CSS Grid & Flexbox**: Layout responsivo moderno
- **CSS Variables**: Tema dinâmico reutilizável
- **Intersection Observer**: Detecção de scroll performática
- **LocalStorage**: Persistência de dados do cliente
- **Event Delegation**: Manipulação eficiente de eventos
- **BEM-like naming**: Classes CSS organizadas
- **Mobile-first**: Abordagem responsiva

---

## 🚀 Melhorias Futuras

Ideias para expandir o projeto:

- [ ] Adicionar modo de alto contraste (acessibilidade)
- [ ] Implementar lazy loading de imagens
- [ ] Adicionar filtros de projetos por tecnologia
- [ ] Integrar Google Analytics
- [ ] Criar seção de blog
- [ ] Adicionar testes automatizados
- [ ] PWA (Progressive Web App)
- [ ] Internacionalização (PT/EN)
- [ ] Cursor customizado
- [ ] Partículas animadas no background

---

## 📊 Performance

- **Lighthouse Score**: Otimizado para 90+ em todas as categorias
- **Zero dependências externas**: Apenas HTML, CSS e JS puro
- **Tamanho pequeno**: ~30KB total (HTML + CSS + JS)
- **Carregamento rápido**: < 1 segundo em rede 3G

---

## 🔗 Integração com Backend

O formulário de contato está pronto para integração:

```javascript
// Em script.js - função handleFormSubmit
fetch('http://localhost:8000/api/contact/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
```

Basta iniciar o backend Python/FastAPI e o formulário enviará os dados automaticamente.

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais

---

## 👤 Autor

**Seu Nome**
- GitHub: [@cauabackend](https://github.com/cauabackend/portfolio)
- LinkedIn: [Caua Pereira da Silva](https://www.linkedin.com/in/cauajava/)
- Email: cauabackend@gmail.com


---

## 🙏 Agradecimentos

- FIAP - Pelo ensino e suporte acadêmico
- Comunidade Dev - Por tutoriais e inspiração

*Última atualização: Janeiro 2025*