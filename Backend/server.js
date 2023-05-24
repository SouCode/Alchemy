const express = require('express');
const connectDB = require('./Utils/Database');
const passport = require('passport');
const cookieSession = require('cookie-session');

// Load environment variables
require('dotenv').config();

// Create Express server
const app = express();

// Connect to MongoDB
connectDB();

// Google OAuth Setup
require('./Utils/GoogleAuth');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware for handling cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: [process.env.COOKIE_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes setup
const AuthRoutes = require('./Routes/AuthRoutes');  // Require Google OAuth routes
app.use('/', AuthRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
