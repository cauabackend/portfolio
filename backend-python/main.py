"""
Portfolio Backend API — FastAPI + SQLite

Endpoints:
- POST /api/contact - Enviar mensagem de contato
- GET  /api/contact - Listar mensagens
- PATCH /api/contact/{id}/read - Marcar como lida
- DELETE /api/contact/{id} - Deletar
- GET  /api/projects - Listar projetos
- GET  /api/projects/featured - Projetos em destaque
- GET  /api/skills - Listar habilidades
- GET  /api/skills/{categoria} - Skills por categoria

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
    description="API REST para o Portfolio Pessoal",
    version="1.0.0",
    contact={"name": "Caua Pereira da Silva", "email": "cauabackend@gmail.com"}
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
    projects = [
        ("Sistema de Gerenciamento", "API REST para gerenciamento de dados com CRUD completo, validacoes e relacionamentos entre entidades.", "https://github.com/cauabackend/sistema", None, '["Java", "Spring Boot", "MySQL"]', True, 1),
        ("Aplicacao Java Console", "Sistema de cadastro via terminal usando JDBC para conexao com banco de dados.", "https://github.com/cauabackend/java-console", None, '["Java", "JDBC", "PostgreSQL"]', False, 2),
        ("API de Estudos", "API RESTful para registro de anotacoes e recursos de estudo.", "https://github.com/cauabackend/api-estudos", None, '["Java", "Spring Boot", "REST API"]', True, 3),
        ("Portfolio Pessoal", "Site de portfolio responsivo com tema claro/escuro e animacoes.", "https://github.com/cauabackend/portfolio", "https://cauabackend.github.io/portfolio", '["HTML", "CSS", "JavaScript", "Python"]', True, 4),
    ]
    cursor.executemany(
        "INSERT INTO projects (titulo, descricao, github_url, demo_url, tags, destaque, ordem) VALUES (?, ?, ?, ?, ?, ?, ?)",
        projects
    )

    skills = [
        ("Java", "POO, Collections, Streams, Tratamento de Excecoes", "BACKEND", "java", 4, 1),
        ("Spring Boot", "APIs REST, Injecao de Dependencias, Spring Data JPA", "BACKEND", "spring", 4, 2),
        ("Python", "POO, FastAPI, Estruturas de Dados", "BACKEND", "python", 3, 3),
        ("MySQL", "SQL, relacionamentos, queries", "DATABASE", "mysql", 4, 1),
        ("PostgreSQL", "SQL avancado, functions", "DATABASE", "postgresql", 3, 2),
        ("HTML5", "Estrutura semantica, acessibilidade", "FRONTEND", "html", 4, 1),
        ("CSS3", "Flexbox, Grid, animacoes", "FRONTEND", "css", 4, 2),
        ("JavaScript", "DOM, ES6+, APIs Web", "FRONTEND", "javascript", 3, 3),
        ("Git & GitHub", "Versionamento e colaboracao", "FERRAMENTAS", "git", 4, 1),
        ("Postman", "Teste de APIs", "FERRAMENTAS", "postman", 4, 2),
    ]
    cursor.executemany(
        "INSERT INTO skills (nome, descricao, categoria, icone, nivel, ordem) VALUES (?, ?, ?, ?, ?, ?)",
        skills
    )


# --- Models ---

class ContactRequest(BaseModel):
    nome: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    assunto: Optional[str] = Field(None, max_length=200)
    mensagem: str = Field(..., min_length=10, max_length=2000)

class ApiResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict | list] = None


# --- Contact ---

@app.post("/api/contact", response_model=ApiResponse, tags=["Contact"])
async def create_contact(contact: ContactRequest):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO contacts (nome, email, assunto, mensagem) VALUES (?, ?, ?, ?)",
        (contact.nome, contact.email, contact.assunto, contact.mensagem)
    )
    contact_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return ApiResponse(success=True, message="Mensagem enviada com sucesso!", data={"id": contact_id})


@app.get("/api/contact", response_model=ApiResponse, tags=["Contact"])
async def list_contacts():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM contacts ORDER BY data_envio DESC")
    rows = cursor.fetchall()
    conn.close()
    contacts = [dict(row) for row in rows]
    return ApiResponse(success=True, message="OK", data=contacts)


@app.patch("/api/contact/{id}/read", response_model=ApiResponse, tags=["Contact"])
async def mark_as_read(id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE contacts SET lida = TRUE WHERE id = ?", (id,))
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Mensagem nao encontrada")
    conn.commit()
    conn.close()
    return ApiResponse(success=True, message="Mensagem marcada como lida")


@app.delete("/api/contact/{id}", response_model=ApiResponse, tags=["Contact"])
async def delete_contact(id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM contacts WHERE id = ?", (id,))
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Mensagem nao encontrada")
    conn.commit()
    conn.close()
    return ApiResponse(success=True, message="Mensagem deletada com sucesso")


# --- Projects ---

@app.get("/api/projects", response_model=ApiResponse, tags=["Projects"])
async def list_projects():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM projects WHERE ativo = TRUE ORDER BY ordem")
    rows = cursor.fetchall()
    conn.close()
    projects = []
    for row in rows:
        p = dict(row)
        p["tags"] = json.loads(p["tags"]) if p["tags"] else []
        projects.append(p)
    return ApiResponse(success=True, message="OK", data=projects)


@app.get("/api/projects/featured", response_model=ApiResponse, tags=["Projects"])
async def list_featured_projects():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM projects WHERE ativo = TRUE AND destaque = TRUE ORDER BY ordem")
    rows = cursor.fetchall()
    conn.close()
    projects = []
    for row in rows:
        p = dict(row)
        p["tags"] = json.loads(p["tags"]) if p["tags"] else []
        projects.append(p)
    return ApiResponse(success=True, message="OK", data=projects)


# --- Skills ---

@app.get("/api/skills", response_model=ApiResponse, tags=["Skills"])
async def list_skills():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM skills WHERE ativo = TRUE ORDER BY categoria, ordem")
    rows = cursor.fetchall()
    conn.close()
    skills = [dict(row) for row in rows]
    return ApiResponse(success=True, message="OK", data=skills)


@app.get("/api/skills/{categoria}", response_model=ApiResponse, tags=["Skills"])
async def list_skills_by_category(categoria: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM skills WHERE ativo = TRUE AND UPPER(categoria) = UPPER(?) ORDER BY ordem",
        (categoria,)
    )
    rows = cursor.fetchall()
    conn.close()
    skills = [dict(row) for row in rows]
    return ApiResponse(success=True, message="OK", data=skills)


# --- Root ---

@app.get("/", tags=["Info"])
async def root():
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
    print("Portfolio Backend iniciado - http://localhost:8000/docs")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)