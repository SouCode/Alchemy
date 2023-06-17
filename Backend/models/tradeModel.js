const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AlchemyUser',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  side: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  // Add other relevant trade details
});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
