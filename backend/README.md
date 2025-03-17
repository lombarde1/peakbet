# PeakBet - Backend

Backend para a plataforma de apostas PeakBet, construído com Node.js, Express e MongoDB.

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB (com Mongoose)
- JWT para autenticação
- bcrypt para criptografia de senhas

## Estrutura do Projeto

```
backend/
  ├── src/
  │   ├── controllers/    # Controladores da aplicação
  │   ├── middleware/     # Middleware personalizado
  │   ├── models/         # Modelos do MongoDB
  │   ├── routes/         # Rotas da API
  │   └── index.js        # Arquivo principal
  ├── .env                # Variáveis de ambiente
  └── package.json        # Dependências do projeto
```

## Instalação

1. Certifique-se de ter o Node.js e MongoDB instalados.
2. Clone o repositório.
3. Configure o arquivo `.env` com suas credenciais.
4. Instale as dependências:
   ```
   npm install
   ```
5. Inicie o servidor:
   ```
   npm run dev
   ```

## API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login de usuário

### Apostas
- `GET /api/bets` - Listar apostas do usuário
- `POST /api/bets` - Criar nova aposta
- `GET /api/bets/:id` - Obter detalhes de uma aposta

### Jogos
- `GET /api/games` - Listar jogos disponíveis
- `GET /api/games/:id` - Obter detalhes de um jogo 