const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  averagePrice: {
    type: Number,
    required: true
  },
  performance: {
    type: Number,
    default: 0
  },
  percentChange: {
    type: Number,
    default: 0
  },
  isPaperTrade: {
    type: Boolean,
    default: false
  },
  paperTradeHoldings: [{
    symbol: String,
    quantity: Number,
    averagePrice: Number
  }],
  paperTradePerformance: {
    type: Number,
    default: 0
  },
  paperTradePercentChange: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
