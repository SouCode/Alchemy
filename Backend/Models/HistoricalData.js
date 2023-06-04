const mongoose = require('mongoose');

const HistoricalDataSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  open: {
    type: Number,
    required: true
  },
  high: {
    type: Number,
    required: true
  },
  low: {
    type: Number,
    required: true
  },
  close: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('HistoricalData', HistoricalDataSchema);
