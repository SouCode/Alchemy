const mongoose = require('mongoose');

const AlpacaModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  transactionDate: {
    type: Date,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  orderType: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currentStocks: {
    type: Map,
    of: Number,
    default: {}
  },
  accountBalance: {
    type: Number,
    default: 0
  },
  transactionHistory: [
    {
      transactionDate: {
        type: Date,
        required: true
      },
      symbol: {
        type: String,
        required: true
      },
      orderType: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      // Additional fields for fees, transaction status, etc.
    }
  ],
  orderHistory: [
    {
      orderType: {
        type: String,
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
      orderStatus: {
        type: String,
        required: true
      },
      executionStatus: {
        type: String,
        required: true
      },
      // Additional fields for order details, timestamps, etc.
    }
  ],
  watchlists: [
    {
      name: {
        type: String,
        required: true
      },
      assets: [
        {
          symbol: {
            type: String,
            required: true
          },
          // Additional fields for asset details, preferences, etc.
        }
      ]
    }
  ],
  // Additional fields as per your requirements
});

module.exports = mongoose.model('AlpacaUser', AlpacaModel);
