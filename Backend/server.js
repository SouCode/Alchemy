// Backend/server.js

const express = require('express');
const connectDB = require('./Utils/Database');
const passportSetup = require('./Utils/GoogleAuth');
const passport = require('passport');
const AlpacaUtils = require('./Utils/AlpacaUtils');
const portfolioRoutes = require('./Routes/PortfolioRoutes');
const transactionRoutes = require('./Routes/TransactionRoutes');
const historicalDataRoutes = require('./Routes/HistoricalDataRoutes');
const newsRoutes = require('./Routes/NewsRoutes');

const session = require('express-session');

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
app.use('/transaction', transactionRoutes);
app.use('/historicaldata', historicalDataRoutes);
app.use('/news', newsRoutes);

// Alpaca API routes
app.get('/account', AlpacaUtils.getAccountInformation);
app.get('/portfolio', AlpacaUtils.getPortfolio);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
