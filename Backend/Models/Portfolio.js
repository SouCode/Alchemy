const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the 'User' model
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
  // Additional fields...
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
