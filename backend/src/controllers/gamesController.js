const Game = require('../models/Game');

// Obter todos os jogos
exports.getGames = async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    const games = await Game.find(filter).sort({ startTime: 1 });

    res.json({ games });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter jogos', error: error.message });
  }
};

// Obter um jogo específico
exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: 'Jogo não encontrado' });
    }

    res.json({ game });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter jogo', error: error.message });
  }
};

// Criar novo jogo (somente admin)
exports.createGame = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      startTime,
      endTime,
      participants,
      imageUrl,
    } = req.body;

    const game = new Game({
      title,
      description,
      category,
      startTime,
      endTime,
      participants,
      imageUrl,
    });

    await game.save();

    res.status(201).json({
      message: 'Jogo criado com sucesso!',
      game,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar jogo', error: error.message });
  }
};

// Atualizar jogo (somente admin)
exports.updateGame = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'title',
      'description',
      'status',
      'participants',
      'result',
      'endTime',
      'imageUrl',
    ];
    
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
      return res.status(400).json({ message: 'Atualizações inválidas!' });
    }

    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: 'Jogo não encontrado' });
    }

    updates.forEach((update) => (game[update] = req.body[update]));
    await game.save();

    res.json({
      message: 'Jogo atualizado com sucesso!',
      game,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar jogo', error: error.message });
  }
};

// Deletar jogo (somente admin)
exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);

    if (!game) {
      return res.status(404).json({ message: 'Jogo não encontrado' });
    }

    res.json({ message: 'Jogo deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar jogo', error: error.message });
  }
}; 