// Backend/utils/database.js
const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

const connectDB = async () => {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected...');
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
};
  
module.exports = connectDB;
