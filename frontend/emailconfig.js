const EMAILJS_CONFIG = {
    publicKey: '81blDlzCUAngPgJAn',
    serviceId: 'service_1cqs5za',
    templateId: 'template_mimo1tr'
};

document.addEventListener('DOMContentLoaded', function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
});

function handleFormSubmit(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Enviando...';

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

    emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        )
        .then(function(response) {
            showNotification('Mensagem enviada com sucesso! Em breve entrarei em contato.', 'success');
            e.target.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }, function(error) {
            showNotification('Erro ao enviar mensagem. Tente novamente ou entre em contato direto por email.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });

    return false;
}

function showNotification(message, type) {
    type = type || 'success';
    var existing = document.querySelector('.custom-notification');
    if (existing) existing.remove();

    var notification = document.createElement('div');
    notification.className = 'custom-notification ' + type;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(function() { notification.classList.add('show'); }, 100);
    setTimeout(function() {
        notification.classList.remove('show');
        setTimeout(function() { notification.remove(); }, 300);
    }, 5000);
}

function validateEmailExtra() {
    var emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            var email = this.value;
            var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            this.setCustomValidity(email && !isValid ? 'Por favor, insira um email valido' : '');
        });
    }
}

document.addEventListener('DOMContentLoaded', validateEmailExtra);