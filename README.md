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

# Configurar banco de dados
# Edite o arquivo .env com as seguintes informações:
# PORT=5000
# MONGODB_URI=mongodb://darkvips:lombarde1@147.79.111.143:27017/peakbet
# JWT_SECRET=sua_chave_secreta_jwt_123_mude_em_producao

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

## Sincronização com GitHub

Para manter o projeto sincronizado com o repositório GitHub, utilize os seguintes comandos:

### Enviar alterações para o GitHub
```bash
# Adicionar todas as alterações
git add .

# Commit com mensagem descritiva
git commit -m "Descrição das alterações realizadas"

# Enviar para o GitHub
git push
```

### Obter alterações do GitHub
```bash
# Receber as alterações mais recentes
git pull
``` 