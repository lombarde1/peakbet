const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  selection: {
    type: String,
    required: true,
  },
  odds: {
    type: Number,
    required: true,
  },
  potentialWinnings: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'won', 'lost', 'canceled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Calcular os ganhos potenciais
betSchema.pre('save', function (next) {
  if (this.isModified('amount') || this.isModified('odds')) {
    this.potentialWinnings = this.amount * this.odds;
  }
  next();
});

const Bet = mongoose.model('Bet', betSchema);

module.exports = Bet; 