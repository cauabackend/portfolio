"""

Endpoints:
- POST /api/contact - Enviar mensagem de contato
- GET  /api/contact - Listar mensagens
- GET  /api/projects - Listar projetos
- GET  /api/skills - Listar habilidades

Executar: uvicorn main:app --reload
Docs: http://localhost:8000/docs
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
import sqlite3
import json


app = FastAPI(
    title="Portfolio Backend API",
    description="API REST para o Portfólio Pessoal",
    version="1.0.0",
    contact={"name": "Cauã Pereira da Silva", "email": "cauabackend@gmail.com"}
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    conn = sqlite3.connect("portfolio.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            assunto TEXT,
            mensagem TEXT NOT NULL,
            data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            lida BOOLEAN DEFAULT FALSE,
            respondida BOOLEAN DEFAULT FALSE
        )
    """)
    
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT NOT NULL,
            github_url TEXT,
            demo_url TEXT,
            tags TEXT,
            destaque BOOLEAN DEFAULT FALSE,
            ordem INTEGER DEFAULT 0,
            ativo BOOLEAN DEFAULT TRUE
        )
    """)
    
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT,
            categoria TEXT NOT NULL,
            icone TEXT,
            nivel INTEGER DEFAULT 3,
            ordem INTEGER DEFAULT 0,
            ativo BOOLEAN DEFAULT TRUE
        )
    """)
    
    
    cursor.execute("SELECT COUNT(*) FROM projects")
    if cursor.fetchone()[0] == 0:
        init_sample_data(cursor)
    
    conn.commit()
    conn.close()

def init_sample_data(cursor):
    """Insere dados de exemplo"""
    
    
    projects = [
        ("Sistema de Gerenciamento", "API REST para gerenciamento de dados com CRUD completo, validações e relacionamentos entre entidades.", "https://github.com/cauabackend/sistema", None, '["Java", "Spring Boot", "MySQL"]', True, 1),
        ("Aplicação Java Console", "Sistema de cadastro via terminal usando JDBC para conexão com banco de dados.", "https://github.com/cauabackend/java-console", None, '["Java", "JDBC", "PostgreSQL"]', False, 2),
        ("API de Estudos", "API RESTful para registro de anotações e recursos de estudo.", "https://github.com/cauabackend/api-estudos", None, '["Java", "Spring Boot", "REST API"]', True, 3),
        ("Portfólio Pessoal", "Site de portfólio responsivo com tema claro/escuro e animações.", "https://github.com/cauabackend/portfolio", "https://cauabackend.github.io/portfolio", '["HTML", "CSS", "JavaScript", "Python"]', True, 4),
    ]
    cursor.executemany(
        "INSERT INTO projects (titulo, descricao, github_url, demo_url, tags, destaque, ordem) VALUES (?, ?, ?, ?, ?, ?, ?)",
        projects
    )
    
    
    skills = [
        ("Java", "POO, Collections, Streams, Tratamento de Exceções", "BACKEND", "☕", 4, 1),
        ("Spring Boot", "APIs REST, Injeção de Dependências, Spring Data JPA", "BACKEND", "🍃", 4, 2),
        ("Python", "POO, FastAPI, Estruturas de Dados", "BACKEND", "🐍", 3, 3),
        ("MySQL", "SQL, relacionamentos, queries", "DATABASE", "🗄️", 4, 1),
        ("PostgreSQL", "SQL avançado, functions", "DATABASE", "🐘", 3, 2),
        ("HTML5", "Estrutura semântica, acessibilidade", "FRONTEND", "📄", 4, 1),
        ("CSS3", "Flexbox, Grid, animações", "FRONTEND", "🎨", 4, 2),
        ("JavaScript", "DOM, ES6+, APIs Web", "FRONTEND", "⚡", 3, 3),
        ("Git & GitHub", "Versionamento e colaboração", "FERRAMENTAS", "🐙", 4, 1),
        ("Postman", "Teste de APIs", "FERRAMENTAS", "📮", 4, 2),
    ]
    cursor.executemany(
        "INSERT INTO skills (nome, descricao, categoria, icone, nivel, ordem) VALUES (?, ?, ?, ?, ?, ?)",
        skills
    )


class ContactRequest(BaseModel):
    nome: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    assunto: Optional[str] = Field(None, max_length=200)
    mensagem: str = Field(..., min_length=10, max_length=2000)

class ContactResponse(BaseModel):
    id: int
    nome: str
    email: str
    assunto: Optional[str]
    mensagem: str
    data_envio: str
    lida: bool
    respondida: bool

class ProjectResponse(BaseModel):
    id: int
    titulo: str
    descricao: str
    github_url: Optional[str]
    demo_url: Optional[str]
    tags: list
    destaque: bool
    ordem: int

class SkillResponse(BaseModel):
    id: int
    nome: str
    descricao: Optional[str]
    categoria: str
    icone: Optional[str]
    nivel: int
    ordem: int

class ApiResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict | list] = None


@app.post("/api/contact", response_model=ApiResponse, tags=["Contact"])
async def create_contact(contact: ContactRequest):
    """Envia uma mensagem de contato (usado pelo formulário do frontend)"""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute(
        "INSERT INTO contacts (nome, email, assunto, mensagem) VALUES (?, ?, ?, ?)",
        (contact.nome, contact.email, contact.assunto, contact.mensagem)
    )
    contact_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return ApiResponse(
        success=True,
        message="Mensagem enviada com sucesso! Entrarei em contato em breve.",
        data={"id": contact_id}
    )

@app.get("/api/contact", response_model=ApiResponse, tags=["Contact"])
async def list_contacts():
    """Lista todas as mensagens de contato"""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM contacts ORDER BY data_envio DESC")
    rows = cursor.fetchall()
    conn.close()
    
    contacts = [
        ContactResponse(
            id=row["id"],
            nome=row["nome"],
            email=row["email"],
            assunto=row["assunto"],
            mensagem=row["mensagem"],
            data_envio=row["data_envio"],
            lida=bool(row["lida"]),
            respondida=bool(row["respondida"])
        ).model_dump()
        for row in rows
    ]
    
    return ApiResponse(success=True, message="OK", data=contacts)

@app.patch("/api/contact/{id}/read", response_model=ApiResponse, tags=["Contact"])
async def mark_as_read(id: int):
    """Marca uma mensagem como lida"""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("UPDATE contacts SET lida = TRUE WHERE id = ?", (id,))
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Mensagem não encontrada")
    
    conn.commit()
    conn.close()
    
    return ApiResponse(success=True, message="Mensagem marcada como lida")

@app.delete("/api/contact/{id}", response_model=ApiResponse, tags=["Contact"])
async def delete_contact(id: int):
    """Deleta uma mensagem"""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("DELETE FROM contacts WHERE id = ?", (id,))
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Mensagem não encontrada")
    
    conn.commit()
    conn.close()
    
    return ApiResponse(success=True, message="Mensagem deletada com sucesso")


@app.get("/api/projects", response_model=ApiResponse, tags=["Projects"])
async def list_projects():
    """Lista todos os projetos ativos"""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM projects WHERE ativo = TRUE ORDER BY ordem")
    rows = cursor.fetchall()
    conn.close()
    
    projects = [
        ProjectResponse(
            id=row["id"],
            titulo=row["titulo"],
            descricao=row["descricao"],
            github_url=row["github_url"],
            demo_url=row["demo_url"],
            tags=json.loads(row["tags"]) if row["tags"] else [],
            destaque=bool(row["destaque"]),
            ordem=row["ordem"]
        ).model_dump()
        for row in rows
    ]
    
    return ApiResponse(success=True, message="OK", data=projects)

@app.get("/api/projects/featured", response_model=ApiResponse, tags=["Projects"])
async def list_featured_projects():
    """Lista projetos em destaque"""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM projects WHERE ativo = TRUE AND destaque = TRUE ORDER BY ordem")
    rows = cursor.fetchall()
    conn.close()
    
    projects = [
        ProjectResponse(
            id=row["id"],
            titulo=row["titulo"],
            descricao=row["descricao"],
            github_url=row["github_url"],
            demo_url=row["demo_url"],
            tags=json.loads(row["tags"]) if row["tags"] else [],
            destaque=bool(row["destaque"]),
            ordem=row["ordem"]
        ).model_dump()
        for row in rows
    ]
    
    return ApiResponse(success=True, message="OK", data=projects)


@app.get("/api/skills", response_model=ApiResponse, tags=["Skills"])
async def list_skills():
    """Lista todas as skills ativas"""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM skills WHERE ativo = TRUE ORDER BY categoria, ordem")
    rows = cursor.fetchall()
    conn.close()
    
    skills = [
        SkillResponse(
            id=row["id"],
            nome=row["nome"],
            descricao=row["descricao"],
            categoria=row["categoria"],
            icone=row["icone"],
            nivel=row["nivel"],
            ordem=row["ordem"]
        ).model_dump()
        for row in rows
    ]
    
    return ApiResponse(success=True, message="OK", data=skills)

@app.get("/api/skills/{categoria}", response_model=ApiResponse, tags=["Skills"])
async def list_skills_by_category(categoria: str):
    """Lista skills por categoria (BACKEND, FRONTEND, DATABASE, FERRAMENTAS)"""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute(
        "SELECT * FROM skills WHERE ativo = TRUE AND UPPER(categoria) = UPPER(?) ORDER BY ordem",
        (categoria,)
    )
    rows = cursor.fetchall()
    conn.close()
    
    skills = [
        SkillResponse(
            id=row["id"],
            nome=row["nome"],
            descricao=row["descricao"],
            categoria=row["categoria"],
            icone=row["icone"],
            nivel=row["nivel"],
            ordem=row["ordem"]
        ).model_dump()
        for row in rows
    ]
    
    return ApiResponse(success=True, message="OK", data=skills)


@app.get("/", tags=["Info"])
async def root():
    """Informações da API"""
    return {
        "app": "Portfolio Backend API",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "contact": "/api/contact",
            "projects": "/api/projects",
            "skills": "/api/skills"
        }
    }


@app.on_event("startup")
async def startup():
    init_db()
    print("""
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║   🚀 PORTFOLIO BACKEND INICIADO COM SUCESSO!                ║
    ║                                                              ║
    ║   📌 API:      http://localhost:8000                        ║
    ║   📖 Swagger:  http://localhost:8000/docs                   ║
    ║   📘 ReDoc:    http://localhost:8000/redoc                  ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
    """)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)