const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  displayName: {
    type: String
  },
  email: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  alpaca: {
    apiKey: {
      type: String,
      required: true
    },
    secretKey: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('User', UserSchema);
