// ============================================
// CONFIGURAÇÃO DO EMAILJS - VERSÃO CORRIGIDA ✅
// ============================================

const EMAILJS_CONFIG = {
    publicKey: '81blDlzCUAngPgJAn',
    serviceId: 'service_1cqs5za',
    templateId: 'template_mimo1tr'
};

// ============================================
// INICIALIZAÇÃO DO EMAILJS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log('✅ EmailJS inicializado com sucesso!');
});

// ============================================
// FUNÇÃO DE ENVIO DO FORMULÁRIO - CORRIGIDA
// ============================================

function handleFormSubmit(e) {
    // PREVENÇÃO TRIPLA - garante que não recarrega
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    console.log('🚀 Função handleFormSubmit chamada!');

    // Pega o botão de envio
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Desabilita o botão e mostra loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '⏳ Enviando...';

    // Prepara os dados do formulário
    const templateParams = {
        from_name: e.target.nome.value,
        from_email: e.target.email.value,
        subject: e.target.assunto.value,
        message: e.target.mensagem.value,
        send_date: new Date().toLocaleString('pt-BR', {
            dateStyle: 'full',
            timeStyle: 'short'
        })
    };

    console.log('📧 Enviando email com dados:', templateParams);

    // Envia o email usando EmailJS
    emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        )
        .then(function(response) {
            console.log('✅ Email enviado com sucesso!', response.status, response.text);

            // Mostra mensagem de sucesso
            showNotification('✅ Mensagem enviada com sucesso! Em breve entrarei em contato.', 'success');

            // Limpa o formulário
            e.target.reset();

            // Reativa o botão
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;

        }, function(error) {
            console.error('❌ Erro ao enviar email:', error);

            // Mostra mensagem de erro
            showNotification('❌ Erro ao enviar mensagem. Tente novamente ou entre em contato direto por email.', 'error');

            // Reativa o botão
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });

    // Retorna false para garantir que não recarrega
    return false;
}

// ============================================
// FUNÇÃO PARA MOSTRAR NOTIFICAÇÕES
// ============================================

function showNotification(message, type = 'success') {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Cria a notificação
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.textContent = message;

    // Adiciona ao body
    document.body.appendChild(notification);

    // Mostra a notificação com animação
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove após 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ============================================
// VALIDAÇÃO EXTRA DE EMAIL
// ============================================

function validateEmailExtra() {
    const emailInput = document.querySelector('input[type="email"]');

    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const email = this.value;
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (email && !isValid) {
                this.setCustomValidity('Por favor, insira um email válido');
            } else {
                this.setCustomValidity('');
            }
        });
    }
}

// Inicializa validação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', validateEmailExtra);

// ============================================
// LISTENER ALTERNATIVO (BACKUP)
// ============================================

// Se o onsubmit não funcionar, este listener pega o submit
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            console.log('🎯 Submit capturado pelo listener!');
            handleFormSubmit(e);
        });
    }
});