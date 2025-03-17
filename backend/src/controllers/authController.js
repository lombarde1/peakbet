const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registrar um novo usuário
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar se o username já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Este nome de usuário já está em uso.' });
    }

    // Criar novo usuário
    const user = new User({
      username,
      password,
    });

    await user.save();

    // Gerar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      user: {
        id: user._id,
        username: user.username,
        balance: user.balance,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Nome de usuário ou senha incorretos.' });
    }

    // Verificar senha
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Nome de usuário ou senha incorretos.' });
    }

    // Gerar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      message: 'Login realizado com sucesso!',
      user: {
        id: user._id,
        username: user.username,
        balance: user.balance,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};

// Obter perfil do usuário
exports.getProfile = async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        username: req.user.username,
        balance: req.user.balance,
        role: req.user.role,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter perfil', error: error.message });
  }
}; 