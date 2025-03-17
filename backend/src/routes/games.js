const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');
const { auth, isAdmin } = require('../middleware/auth');

// Rotas públicas
router.get('/', gamesController.getGames);
router.get('/:id', gamesController.getGameById);

// Rotas protegidas (somente admin)
router.post('/', auth, isAdmin, gamesController.createGame);
router.put('/:id', auth, isAdmin, gamesController.updateGame);
router.delete('/:id', auth, isAdmin, gamesController.deleteGame);

module.exports = router; 