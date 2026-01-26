// ============================================
// SISTEMA DE INTERNACIONALIZAÇÃO (i18n) HÍBRIDO
// PT/EN: Traduções manuais
// Outros idiomas: Tradução automática via API
// ============================================

var translations = {
    en: {
        meta: {
            title: "My Portfolio"
        },
        nav: {
            home: "Home",
            about: "About",
            skills: "Skills",
            projects: "Projects",
            contact: "Contact"
        },
        hero: {
            eyebrow: "Welcome To My Portfolio",
            title: "Hi, I am Cauã<br>Back-End developer",
            description: "I turn ideas into robust digital systems, designing and developing scalable, secure, and high-performance web applications.",
            cta: "View My Work",
            scroll: "Scroll Down"
        },
        about: {
            title: "About Me",
            subtitle: "Learn more about my journey",
            p1: "Programming student, exploring my path in software development. I'm currently studying Software Engineering at FIAP and actively seeking an internship opportunity. My main focus is backend development, with a strong interest in building robust, well-structured systems using Java.",
            p2: "I enjoy learning through practice, developing projects that help me understand how real applications work behind the scenes. I'm motivated by problem solving, clean code, and understanding system architecture, and I'm constantly improving my technical skills to grow as a backend developer.",
            card1: {
                title: "Education",
                text: "Software Engineering",
                detail: "FIAP - Currently pursuing"
            },
            card2: {
                title: "Objective",
                text: "Development Internship",
                detail: "Backend with Java"
            },
            card3: {
                title: "Focus",
                text: "Continuous Learning",
                detail: "Projects & Practice"
            },
            downloadCV: "Download My Resume"
        },
        skills: {
            title: "Skills",
            subtitle: "Technologies and Tools I Master",
            tabs: {
                tools: "Tools"
            },
            backend: {
                java: "Object-Oriented Programming, Collections, Streams, Exception Handling",
                spring: "REST APIs, Dependency Injection, Spring Data JPA",
                dbTitle: "Database",
                db: "SQL, MySQL, PostgreSQL, database relationship concepts",
                api: "Endpoint design, HTTP methods, JSON",
                testsTitle: "Tests",
                tests: "JUnit, unit testing concepts",
                python: "Object-Oriented Programming, Data Structures, Modules, Exception Handling",
                nodejs: "Asynchronous Programming, REST APIs, Express.js, Middleware, Package Management (npm)"
            },
            frontend: {
                responsive: "Responsive Design",
                dom: "DOM Manipulation"
            },
            tools: {
                git: "Code Versioning and Collaboration",
                maven: "Dependency Management",
                intellij: "Primary IDE for Java",
                postman: "API Testing",
                vscode: "Code Editor",
                mysql: "Database Management"
            }
        },
        projects: {
            title: "Projects",
            subtitle: "Academic and Personal Projects Developed",
            project1: {
                title: "Management System",
                desc: "REST API for data management with full CRUD, validations, and relationships between entities."
            },
            project2: {
                title: "Java Console Application",
                desc: "Terminal-based registration system using JDBC for database connection and data manipulation."
            },
            project3: {
                title: "Study API",
                desc: "RESTful API for registering notes and study resources, with documented endpoints and testing."
            },
            project4: {
                title: "Personal Portfolio",
                desc: "Responsive portfolio website with light/dark theme, smooth animations, and modern design."
            }
        },
        contact: {
            title: "Get in Touch",
            subtitle: "Interested in Working Together?",
            phone: "Phone",
            form: {
                name: "Name",
                subject: "Subject",
                message: "Message",
                send: "Send Message"
            }
        }
    },
    pt: {
        meta: {
            title: "Meu Portfólio"
        },
        nav: {
            home: "Início",
            about: "Sobre",
            skills: "Habilidades",
            projects: "Projetos",
            contact: "Contato"
        },
        hero: {
            eyebrow: "Bem-vindo ao Meu Portfólio",
            title: "Olá, eu sou Cauã<br>Desenvolvedor Back-End",
            description: "Transformo ideias em sistemas digitais robustos, projetando e desenvolvendo aplicações web escaláveis, seguras e de alta performance.",
            cta: "Ver Meus Trabalhos",
            scroll: "Role para Baixo"
        },
        about: {
            title: "Sobre Mim",
            subtitle: "Conheça mais sobre minha jornada",
            p1: "Estudante de programação, explorando meu caminho no desenvolvimento de software. Atualmente estudo Engenharia de Software na FIAP e busco ativamente uma oportunidade de estágio. Meu foco principal é desenvolvimento backend, com forte interesse em construir sistemas robustos e bem estruturados usando Java.",
            p2: "Gosto de aprender na prática, desenvolvendo projetos que me ajudam a entender como aplicações reais funcionam por trás dos panos. Sou motivado pela resolução de problemas, código limpo e compreensão de arquitetura de sistemas, e estou constantemente aprimorando minhas habilidades técnicas para crescer como desenvolvedor backend.",
            card1: {
                title: "Educação",
                text: "Engenharia de Software",
                detail: "FIAP - Cursando"
            },
            card2: {
                title: "Objetivo",
                text: "Estágio em Desenvolvimento",
                detail: "Backend com Java"
            },
            card3: {
                title: "Foco",
                text: "Aprendizado Contínuo",
                detail: "Projetos & Prática"
            },
            downloadCV: "Baixar Meu Currículo"
        },
        skills: {
            title: "Habilidades",
            subtitle: "Tecnologias e Ferramentas que Domino",
            tabs: {
                tools: "Ferramentas"
            },
            backend: {
                java: "Programação Orientada a Objetos, Collections, Streams, Tratamento de Exceções",
                spring: "APIs REST, Injeção de Dependências, Spring Data JPA",
                dbTitle: "Banco de Dados",
                db: "SQL, MySQL, PostgreSQL, conceitos de relacionamento de banco de dados",
                api: "Design de endpoints, métodos HTTP, JSON",
                testsTitle: "Testes",
                tests: "JUnit, conceitos de testes unitários",
                python: "Programação Orientada a Objetos, Estruturas de Dados, Módulos, Tratamento de Exceções",
                nodejs: "Programação Assíncrona, APIs REST, Express.js, Middlewares, Gerenciamento de Pacotes (npm)"
            },
            frontend: {
                responsive: "Design Responsivo",
                dom: "Manipulação do DOM"
            },
            tools: {
                git: "Versionamento de Código e Colaboração",
                maven: "Gerenciamento de Dependências",
                intellij: "IDE Principal para Java",
                postman: "Teste de APIs",
                vscode: "Editor de Código",
                mysql: "Gerenciamento de Banco de Dados"
            }
        },
        projects: {
            title: "Projetos",
            subtitle: "Projetos Acadêmicos e Pessoais Desenvolvidos",
            project1: {
                title: "Sistema de Gerenciamento",
                desc: "API REST para gerenciamento de dados com CRUD completo, validações e relacionamentos entre entidades."
            },
            project2: {
                title: "Aplicação Java Console",
                desc: "Sistema de cadastro via terminal usando JDBC para conexão com banco de dados e manipulação de dados."
            },
            project3: {
                title: "API de Estudos",
                desc: "API RESTful para registro de anotações e recursos de estudo, com endpoints documentados e testes."
            },
            project4: {
                title: "Portfólio Pessoal",
                desc: "Site de portfólio responsivo com tema claro/escuro, animações suaves e design moderno."
            }
        },
        contact: {
            title: "Entre em Contato",
            subtitle: "Interessado em Trabalhar Junto?",
            phone: "Telefone",
            form: {
                name: "Nome",
                subject: "Assunto",
                message: "Mensagem",
                send: "Enviar Mensagem"
            }
        }
    }
};

// ============================================
// IDIOMAS SUPORTADOS
// ============================================

var supportedLanguages = {
    en: { name: "English", flag: "🇺🇸", manual: true },
    pt: { name: "Português", flag: "🇧🇷", manual: true },
    es: { name: "Español", flag: "🇪🇸", manual: false },
    fr: { name: "Français", flag: "🇫🇷", manual: false },
    de: { name: "Deutsch", flag: "🇩🇪", manual: false },
    it: { name: "Italiano", flag: "🇮🇹", manual: false },
    ja: { name: "日本語", flag: "🇯🇵", manual: false },
    zh: { name: "中文", flag: "🇨🇳", manual: false },
    ko: { name: "한국어", flag: "🇰🇷", manual: false },
    ru: { name: "Русский", flag: "🇷🇺", manual: false },
    ar: { name: "العربية", flag: "🇸🇦", manual: false, rtl: true }
};

// ============================================
// CACHE DE TRADUÇÕES AUTOMÁTICAS
// ============================================

var translationCache = {};

// Carrega cache do localStorage
function loadCache() {
    try {
        var cached = localStorage.getItem('translationCache');
        if (cached) {
            var parsed = JSON.parse(cached);
            for (var key in parsed) {
                translationCache[key] = parsed[key];
            }
        }
    } catch (e) {
        console.warn('Erro ao carregar cache de traduções:', e);
    }
}

// Salva cache no localStorage
function saveCache() {
    try {
        localStorage.setItem('translationCache', JSON.stringify(translationCache));
    } catch (e) {
        console.warn('Erro ao salvar cache de traduções:', e);
    }
}

// ============================================
// API DE TRADUÇÃO (MyMemory - Gratuita)
// ============================================

function translateWithAPI(text, targetLang) {
    return new Promise(function(resolve) {
        // Cria chave única para cache
        var cacheKey = targetLang + ':' + text;

        // Verifica cache primeiro
        if (translationCache[cacheKey]) {
            resolve(translationCache[cacheKey]);
            return;
        }

        var url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=en|' + targetLang;

        fetch(url)
            .then(function(response) {
                if (!response.ok) throw new Error('API error');
                return response.json();
            })
            .then(function(data) {
                if (data.responseStatus === 200) {
                    var translated = data.responseData.translatedText;
                    // Salva no cache
                    translationCache[cacheKey] = translated;
                    saveCache();
                    resolve(translated);
                } else {
                    throw new Error('Translation failed');
                }
            })
            .catch(function(error) {
                console.warn('Erro na tradução para ' + targetLang + ':', error);
                resolve(text); // Retorna texto original em caso de erro
            });
    });
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

/**
 * Achata objeto de traduções para array de textos
 */
function flattenTranslations(obj, prefix) {
    prefix = prefix || '';
    var result = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var fullKey = prefix ? prefix + '.' + key : key;
            var value = obj[key];

            if (typeof value === 'object' && value !== null) {
                var nested = flattenTranslations(value, fullKey);
                for (var i = 0; i < nested.length; i++) {
                    result.push(nested[i]);
                }
            } else {
                result.push({ key: fullKey, text: value });
            }
        }
    }

    return result;
}

/**
 * Reconstrói objeto de traduções a partir de array
 */
function unflattenTranslations(items) {
    var result = {};

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var parts = item.key.split('.');
        var current = result;

        for (var j = 0; j < parts.length - 1; j++) {
            if (!current[parts[j]]) {
                current[parts[j]] = {};
            }
            current = current[parts[j]];
        }

        current[parts[parts.length - 1]] = item.text;
    }

    return result;
}

/**
 * Obtém o texto traduzido a partir de uma chave
 */
function getTranslation(lang, key) {
    if (!translations[lang]) return null;

    var parts = key.split('.');
    var obj = translations[lang];

    for (var i = 0; i < parts.length; i++) {
        if (obj && obj.hasOwnProperty(parts[i])) {
            obj = obj[parts[i]];
        } else {
            return null;
        }
    }

    return obj;
}

// ============================================
// TRADUÇÃO AUTOMÁTICA DE IDIOMAS
// ============================================

var isTranslating = false;

function translateToLanguage(targetLang) {
    return new Promise(function(resolve) {
        // Se já temos traduções manuais, usa elas
        if (translations[targetLang]) {
            resolve(translations[targetLang]);
            return;
        }

        // Pega textos em inglês como base
        var englishTexts = flattenTranslations(translations.en);

        // Verifica se já está em cache completo
        var cacheKey = 'full:' + targetLang;
        if (translationCache[cacheKey]) {
            translations[targetLang] = translationCache[cacheKey];
            resolve(translationCache[cacheKey]);
            return;
        }

        // Mostra indicador de loading
        showLoadingIndicator(true);

        // Traduz todos os textos
        var translatedItems = [];
        var index = 0;

        function translateNext() {
            if (index >= englishTexts.length) {
                // Reconstrói objeto
                var translatedObj = unflattenTranslations(translatedItems);

                // Salva em cache
                translations[targetLang] = translatedObj;
                translationCache[cacheKey] = translatedObj;
                saveCache();

                // Remove indicador de loading
                showLoadingIndicator(false);

                resolve(translatedObj);
                return;
            }

            var item = englishTexts[index];
            // Remove tags HTML antes de traduzir
            var cleanText = item.text.replace(/<br>/g, '|||BR|||');

            translateWithAPI(cleanText, targetLang).then(function(translated) {
                // Restaura tags HTML
                var finalText = translated.replace(/\|\|\|BR\|\|\|/g, '<br>');
                translatedItems.push({ key: item.key, text: finalText });
                index++;

                // Pequeno delay para não sobrecarregar a API
                setTimeout(translateNext, 100);
            });
        }

        translateNext();
    });
}

// ============================================
// APLICAÇÃO DE TRADUÇÕES
// ============================================

function applyTranslations(lang) {
    return new Promise(function(resolve) {
        // Garante que temos as traduções
        var doApply = function() {
            // Atualiza o atributo lang do HTML
            document.documentElement.lang = lang;

            // Verifica se é idioma RTL (direita para esquerda)
            var langData = supportedLanguages[lang];
            if (langData && langData.rtl) {
                document.documentElement.dir = 'rtl';
            } else {
                document.documentElement.dir = 'ltr';
            }

            // Traduz elementos com data-i18n
            var elements = document.querySelectorAll('[data-i18n]');
            for (var i = 0; i < elements.length; i++) {
                var el = elements[i];
                var key = el.getAttribute('data-i18n');
                var text = getTranslation(lang, key);
                if (text) {
                    el.innerHTML = text;
                }
            }

            // Traduz placeholders
            var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
            for (var j = 0; j < placeholders.length; j++) {
                var ph = placeholders[j];
                var phKey = ph.getAttribute('data-i18n-placeholder');
                var phText = getTranslation(lang, phKey);
                if (phText) {
                    ph.placeholder = phText;
                }
            }

            // Atualiza título da página
            var titleText = getTranslation(lang, 'meta.title');
            if (titleText) {
                document.title = titleText;
            }

            resolve();
        };

        if (!translations[lang]) {
            translateToLanguage(lang).then(doApply);
        } else {
            doApply();
        }
    });
}

// ============================================
// UI DO SELETOR DE IDIOMAS
// ============================================

function createLanguageSelector() {
    var container = document.querySelector('.lang-switcher');
    if (!container) return;

    // Limpa conteúdo existente
    container.innerHTML = '';

    // Botão atual (mostra idioma selecionado)
    var currentLang = localStorage.getItem('language') || detectLanguage();
    var currentLangData = supportedLanguages[currentLang] || supportedLanguages.en;

    var toggleBtn = document.createElement('button');
    toggleBtn.className = 'lang-toggle';
    toggleBtn.innerHTML = currentLangData.flag + ' <span class="lang-code">' + currentLang.toUpperCase() + '</span>';
    toggleBtn.onclick = function() {
        toggleDropdown();
    };

    // Dropdown com todos os idiomas
    var dropdown = document.createElement('div');
    dropdown.className = 'lang-dropdown';
    dropdown.id = 'langDropdown';

    for (var code in supportedLanguages) {
        if (supportedLanguages.hasOwnProperty(code)) {
            var data = supportedLanguages[code];
            var option = document.createElement('button');
            option.className = 'lang-option' + (code === currentLang ? ' active' : '');
            option.setAttribute('data-lang', code);

            var autoBadge = data.manual ? '' : '<span class="auto-badge">Auto</span>';
            option.innerHTML = data.flag + ' ' + data.name + ' ' + autoBadge;

            option.onclick = function(e) {
                var langCode = e.currentTarget.getAttribute('data-lang');
                selectLanguage(langCode);
            };

            dropdown.appendChild(option);
        }
    }

    container.appendChild(toggleBtn);
    container.appendChild(dropdown);

    // Fecha dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        if (!container.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
}

function toggleDropdown() {
    var dropdown = document.getElementById('langDropdown');
    if (dropdown) {
        dropdown.classList.toggle('open');
    }
}

function selectLanguage(lang) {
    // Fecha dropdown
    var dropdown = document.getElementById('langDropdown');
    if (dropdown) {
        dropdown.classList.remove('open');
    }

    // Define idioma
    setLanguage(lang).then(function() {
        // Atualiza botão principal
        var langData = supportedLanguages[lang];
        var toggleBtn = document.querySelector('.lang-toggle');
        if (toggleBtn && langData) {
            toggleBtn.innerHTML = langData.flag + ' <span class="lang-code">' + lang.toUpperCase() + '</span>';
        }

        // Atualiza opção ativa
        var options = document.querySelectorAll('.lang-option');
        for (var i = 0; i < options.length; i++) {
            options[i].classList.remove('active');
            if (options[i].getAttribute('data-lang') === lang) {
                options[i].classList.add('active');
            }
        }
    });
}

// ============================================
// INDICADOR DE LOADING
// ============================================

function showLoadingIndicator(show) {
    var loader = document.getElementById('translationLoader');

    if (show) {
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'translationLoader';
            loader.innerHTML = '<div class="loader-content"><div class="loader-spinner"></div><span>Translating...</span></div>';
            document.body.appendChild(loader);
        }
        loader.classList.add('visible');
    } else {
        if (loader) {
            loader.classList.remove('visible');
        }
    }
}

// ============================================
// FUNÇÕES PRINCIPAIS
// ============================================

function setLanguage(lang) {
    return new Promise(function(resolve) {
        if (isTranslating) {
            resolve();
            return;
        }
        isTranslating = true;

        // Salva preferência
        localStorage.setItem('language', lang);

        // Aplica traduções
        applyTranslations(lang).then(function() {
            isTranslating = false;
            resolve();
        }).catch(function(error) {
            console.error('Erro ao definir idioma:', error);
            isTranslating = false;
            resolve();
        });
    });
}

function detectLanguage() {
    // 1. Verifica se há idioma salvo
    var saved = localStorage.getItem('language');
    if (saved && supportedLanguages[saved]) {
        return saved;
    }

    // 2. Detecta idioma do navegador
    var browserLang = navigator.language.slice(0, 2).toLowerCase();
    if (supportedLanguages[browserLang]) {
        return browserLang;
    }

    // 3. Padrão: inglês
    return 'en';
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Carrega cache de traduções
    loadCache();

    // Cria seletor de idiomas
    createLanguageSelector();

    // Detecta e aplica idioma
    var lang = detectLanguage();
    setLanguage(lang);
});