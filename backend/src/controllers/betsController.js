const Bet = require('../models/Bet');
const User = require('../models/User');
const Game = require('../models/Game');

// Obter apostas do usuário logado
exports.getUserBets = async (req, res) => {
  try {
    const bets = await Bet.find({ user: req.user._id })
      .populate('game', 'title startTime status')
      .sort({ createdAt: -1 });

    res.json({ bets });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter apostas', error: error.message });
  }
};

// Obter detalhes de uma aposta
exports.getBetById = async (req, res) => {
  try {
    const bet = await Bet.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('game');

    if (!bet) {
      return res.status(404).json({ message: 'Aposta não encontrada' });
    }

    res.json({ bet });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter aposta', error: error.message });
  }
};

// Criar nova aposta
exports.createBet = async (req, res) => {
  try {
    const { gameId, amount, selection, odds } = req.body;

    // Verificar se o jogo existe
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Jogo não encontrado' });
    }

    // Verificar se o jogo ainda está aberto para apostas
    if (game.status !== 'upcoming' && game.status !== 'live') {
      return res.status(400).json({ message: 'Este jogo não está aberto para apostas' });
    }

    // Verificar se o usuário tem saldo suficiente
    if (req.user.balance < amount) {
      return res.status(400).json({ message: 'Saldo insuficiente para realizar esta aposta' });
    }

    // Criar a aposta
    const bet = new Bet({
      user: req.user._id,
      game: gameId,
      amount,
      selection,
      odds,
      potentialWinnings: amount * odds,
    });

    await bet.save();

    // Atualizar o saldo do usuário
    req.user.balance -= amount;
    await req.user.save();

    res.status(201).json({
      message: 'Aposta realizada com sucesso!',
      bet,
      newBalance: req.user.balance,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar aposta', error: error.message });
  }
};

// Cancelar uma aposta (somente se o jogo ainda não começou)
exports.cancelBet = async (req, res) => {
  try {
    const bet = await Bet.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('game');

    if (!bet) {
      return res.status(404).json({ message: 'Aposta não encontrada' });
    }

    // Verificar se a aposta pode ser cancelada
    if (bet.status !== 'pending') {
      return res.status(400).json({ message: 'Esta aposta não pode ser cancelada' });
    }

    if (bet.game.status !== 'upcoming') {
      return res.status(400).json({ message: 'Não é possível cancelar apostas em jogos que já iniciaram' });
    }

    // Atualizar status da aposta
    bet.status = 'canceled';
    await bet.save();

    // Reembolsar o valor para o usuário
    const user = await User.findById(req.user._id);
    user.balance += bet.amount;
    await user.save();

    res.json({
      message: 'Aposta cancelada com sucesso!',
      bet,
      newBalance: user.balance,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cancelar aposta', error: error.message });
  }
}; 