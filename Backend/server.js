const express = require('express');
const connectDB = require('./utils/Database');
const passportSetup = require('./Utils/GoogleAuth');
const passport = require('passport');
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

const authRoutes = require('./routes/AuthRoutes');
const dashboardRoutes = require('./routes/DashboardRoutes');
const userRoutes = require('./Routes/UserRoutes');

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/user', userRoutes); // Add this line to use UserRoutes

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
