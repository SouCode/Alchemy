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
  },
  leaderboardVisible: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('User', UserSchema);
