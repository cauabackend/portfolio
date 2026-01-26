const API_URL = 'https://portfolio-backend-nkp4.onrender.com';

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const btn = document.querySelector('.theme-toggle-btn');

    if (document.body.classList.contains('dark-theme')) {
        btn.textContent = '☀️';
    } else {
        btn.textContent = '🌙';
    }

    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const btn = document.querySelector('.theme-toggle-btn');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (btn) btn.textContent = '☀️';
    } else {
        if (btn) btn.textContent = '🌙';
    }
}


function switchTab(tabName) {
    const allButtons = document.querySelectorAll('.tab-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));

    const allPanels = document.querySelectorAll('.tab-panel');
    allPanels.forEach(panel => panel.classList.remove('active'));

    event.target.classList.add('active');

    const targetPanel = document.getElementById(tabName);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
}


function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}


function setupScrollHeader() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}


function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', () => {
        const sobreSection = document.querySelector('#sobre');
        if (sobreSection) {
            sobreSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    });
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(`
        .info-card,
        .project-card,
        .skill-card,
        .contact-card,
        .page-header,
        .hero-content,
        .hero-visual
    `);

    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        assunto: document.getElementById('assunto').value,
        mensagem: document.getElementById('mensagem').value
    };

    if (!formData.nome || !formData.email || !formData.mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            alert('✅ Mensagem enviada com sucesso!\nEntrarei em contato em breve.');
            e.target.reset();
        } else {
            alert('❌ Erro ao enviar: ' + (data.message || 'Erro desconhecido'));
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('❌ Erro de conexão com o servidor.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}


function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function setupEmailValidation() {
    const emailInput = document.querySelector('input[type="email"]');

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ef4444';
                this.style.boxShadow = '0 0 0 2px rgba(239, 68, 68, 0.2)';
            } else {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
    }
}


function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.mobile-menu-toggle');

    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function setupMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.mobile-menu-toggle');

    if (navLinks && menuToggle) {
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

async function loadProjects() {
    try {
        const response = await fetch(`${API_URL}/projects`);
        const data = await response.json();

        if (data.success && data.data) {
            console.log('📦 Projetos carregados:', data.data);
            // Aqui você pode renderizar os projetos dinamicamente se quiser
        }
    } catch (error) {
        console.log('Backend não disponível, usando dados estáticos');
    }
}


async function loadSkills() {
    try {
        const response = await fetch(`${API_URL}/skills`);
        const data = await response.json();

        if (data.success && data.data) {
            console.log('🛠️ Skills carregadas:', data.data);
            // Aqui você pode renderizar as skills dinamicamente se quiser
        }
    } catch (error) {
        console.log('Backend não disponível, usando dados estáticos');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Tema
    loadSavedTheme();

    // Navegação
    setupSmoothScroll();
    highlightActiveSection();
    setupScrollHeader();
    setupScrollIndicator();
    setupMobileMenu();

    // Animações
    setupScrollAnimations();

    // Formulário
    setupEmailValidation();

    // 🔗 Conecta o formulário ao backend
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Carrega dados do backend (opcional)
    loadProjects();
    loadSkills();

    console.log('✅ Portfólio inicializado!');
    console.log('🔗 Backend:', API_URL);
});


function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

function applySystemTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        const systemTheme = detectSystemTheme();
        if (systemTheme === 'dark') {
            document.body.classList.add('dark-theme');
            const btn = document.querySelector('.theme-toggle-btn');
            if (btn) btn.textContent = '☀️';
        }
    }
}

window.addEventListener('load', applySystemTheme);