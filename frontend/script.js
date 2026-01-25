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
            const sectionHeight = section.clientHeight;


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


    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;
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

    console.log(`✨ ${elementsToAnimate.length} elementos preparados para animação`);
}





function handleFormSubmit(e) {
    e.preventDefault();


    const formData = new FormData(e.target);
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        assunto: formData.get('assunto'),
        mensagem: formData.get('mensagem')
    };


    if (!data.nome || !data.email || !data.mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }


    console.log('Dados do formulário:', data);


    alert('Mensagem enviada com sucesso! 🎉\n(Esta é uma demonstração)');


    e.target.reset();







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





function setupScrollProgress() {
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;



    });
}





function setupTypingEffect() {
    const textElement = document.querySelector('.hero h1');
    if (!textElement) return;

    const originalText = textElement.textContent;
    const shouldAnimate = sessionStorage.getItem('hasVisited') !== 'true';

    if (shouldAnimate) {
        textElement.textContent = '';
        let charIndex = 0;

        function typeChar() {
            if (charIndex < originalText.length) {
                textElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50);
            }
        }

        setTimeout(typeChar, 500);
        sessionStorage.setItem('hasVisited', 'true');
    }
}






document.addEventListener('DOMContentLoaded', function() {

    loadSavedTheme();


    setupSmoothScroll();


    highlightActiveSection();


    setupScrollHeader();


    setupScrollAnimations();


    setupScrollIndicator();


    setupEmailValidation();


    setupMobileMenu();





    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }


    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.textContent.toLowerCase();
            switchTab(tabName);
        });
    });

    console.log('✅ Portfólio inicializado com sucesso!');
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