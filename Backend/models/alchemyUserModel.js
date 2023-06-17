const mongoose = require('mongoose');

const alchemyUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  alpacaApiKey: {
    type: String,
    default: null,
  },
  alpacaSecretKey: {
    type: String,
    default: null,
  },
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  // Add more fields as per your requirements
});


const AlchemyUser = mongoose.model('AlchemyUser', alchemyUserSchema);

module.exports = AlchemyUser;
