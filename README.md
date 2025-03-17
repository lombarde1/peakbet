# PeakBet - Casa de Apostas

Projeto de uma plataforma de apostas online completa, desenvolvida com Node.js (backend) e React/Vite (frontend).

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

### Backend (Node.js + Express + MongoDB)

- API RESTful para gerenciar usuários, jogos e apostas
- Autenticação com JWT
- Permissões baseadas em papéis (usuário comum e admin)
- MongoDB como banco de dados

### Frontend (React + Vite + TypeScript)

- Interface de usuário moderna e responsiva
- Gerenciamento de estado com Context API
- Roteamento com React Router
- Estilização com CSS moderno e componentes estilizados

## Como Iniciar

### Backend

```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Iniciar o servidor em modo de desenvolvimento
npm run dev
```

### Frontend

```bash
# Entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

## Recursos Principais

- Cadastro e login de usuários
- Listagem de jogos disponíveis para apostas
- Realização de apostas em diferentes categorias
- Gestão de saldo de usuário
- Histórico de apostas do usuário
- Painel administrativo para gerenciamento de jogos

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- MongoDB com Mongoose
- JWT para autenticação
- bcrypt para criptografia de senhas

### Frontend
- React
- TypeScript
- Vite
- React Router
- Axios para requisições HTTP
- Styled Components 