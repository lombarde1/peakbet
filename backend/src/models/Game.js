const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['esportes', 'cassino', 'loteria'],
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'completed', 'canceled'],
    default: 'upcoming',
  },
  participants: [
    {
      name: String,
      odds: Number,
    },
  ],
  result: {
    winner: String,
    score: String,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game; 