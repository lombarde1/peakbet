const express = require('express');
const router = express.Router();
const betsController = require('../controllers/betsController');
const { auth } = require('../middleware/auth');

// Todas as rotas de apostas requerem autenticação
router.use(auth);

// Obter apostas do usuário
router.get('/', betsController.getUserBets);

// Obter detalhes de uma aposta
router.get('/:id', betsController.getBetById);

// Criar nova aposta
router.post('/', betsController.createBet);

// Cancelar aposta
router.put('/:id/cancel', betsController.cancelBet);

module.exports = router; 