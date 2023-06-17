const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./utils/database');
const newsRoutes = require('./routes/newsRoutes');

require('dotenv').config();

const { PORT, SESSION_SECRET } = require('./config');

// Import alchemyAuthRoutes
const alchemyAuthRoutes = require('./routes/alchemyAuthRoutes');
const AlchUsers = require('./models/alchemyUserModel');
const stocksRoutes = require('./routes/stocksRoutes');
const tradeRoutes = require('./routes/tradeRoutes'); 

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up session middleware
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
  })
);

// Initialize Passport
app.use(passport.initialize());

// Passport session management
app.use(passport.session());

// Configure Passport local strategy
const LocalStrategy = require('passport-local').Strategy;
passport.use(
  new LocalStrategy((username, password, done) => {
    // Implement your own authentication logic here
    AlchUsers.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      if (!user.verifyPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    });
  })
);

// Configure Passport's session management and serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  AlchUsers.findById(id, (err, user) => {
    done(err, user);
  });
});

// Use alchemyAuthRoutes
app.use('/auth', alchemyAuthRoutes);
app.use('/stocks', stocksRoutes);
app.use('/news', newsRoutes);
app.use('/trade', tradeRoutes); 

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
