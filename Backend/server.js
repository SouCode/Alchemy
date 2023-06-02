const express = require('express');
const connectDB = require('./Utils/Database');
const passport = require('passport');
const portfolioRoutes = require('./Routes/PortfolioRoutes');
const session = require('express-session');
const AlpacaUtils = require('./Utils/AlpacaUtils'); // Import AlpacaUtils

require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./Routes/AuthRoutes');
const dashboardRoutes = require('./Routes/dashboardRoutes');
const userRoutes = require('./Routes/UserRoutes');
const protectedRoutes = require('./Routes/ProtectedRoutes');

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/user', userRoutes);
app.use('/protected', protectedRoutes);
app.use('/portfolio', portfolioRoutes);

// Alpaca API routes
app.get('/account', AlpacaUtils.getAccountInformation);
app.get('/portfolio', AlpacaUtils.getPortfolio);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
