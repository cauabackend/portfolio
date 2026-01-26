# 🚀 Portfolio Backend - Python/FastAPI

Backend simples e eficiente em Python para o portfólio pessoal.

## 📋 Estrutura

```
backend-python/
├── main.py           # Toda a aplicação (API + banco)
├── requirements.txt  # Dependências
├── portfolio.db      # Banco SQLite (criado automaticamente)
└── README.md
```

## 🚀 Como Executar

```bash
# 1. Instalar dependências
pip install -r requirements.txt

# 2. Executar
python main.py
# ou
uvicorn main:app --reload
```

## 📖 Acessar

- **API**: http://localhost:8000
- **Swagger (docs interativos)**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔗 Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/contact` | Enviar mensagem |
| GET | `/api/contact` | Listar mensagens |
| PATCH | `/api/contact/{id}/read` | Marcar como lida |
| DELETE | `/api/contact/{id}` | Deletar |
| GET | `/api/projects` | Listar projetos |
| GET | `/api/projects/featured` | Projetos em destaque |
| GET | `/api/skills` | Listar skills |
| GET | `/api/skills/{categoria}` | Skills por categoria |

## 📝 Exemplo de Uso

```bash
# Enviar mensagem de contato
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João",
    "email": "joao@email.com",
    "assunto": "Contato",
    "mensagem": "Olá, gostei do seu portfólio!"
  }'
```

## 🔧 Integração com Frontend

No `script.js`, atualize a função `handleFormSubmit`:

```javascript
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        assunto: document.getElementById('assunto').value,
        mensagem: document.getElementById('mensagem').value
    };

    try {
        const response = await fetch('http://localhost:8000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Mensagem enviada! 🎉');
            e.target.reset();
        }
    } catch (error) {
        alert('Erro ao enviar mensagem');
    }
}
```
**Autor:** Cauã Pereira da Silva  
**Tecnologias:** Python 3.10+, FastAPI, SQLite, Pydantic