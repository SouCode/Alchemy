// server.js

const express = require('express');
const connectDB = require('./Utils/Database');

// Load environment variables
require('dotenv').config();

// Create Express server
const app = express();

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
