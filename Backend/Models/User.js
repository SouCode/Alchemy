const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String
  },
  alpaca: {
    apiKey: {
      type: String
    },
    secretKey: {
      type: String
    }
  }
});

module.exports = mongoose.model('User', UserSchema);
