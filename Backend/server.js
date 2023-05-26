const express = require('express');
const session = require('express-session');
const connectDB = require('./Utils/Database');
const passportSetup = require('./Utils/GoogleAuth');
const passport = require('passport');
const dashboardRoutes = require('./Routes/dashboardRoutes');

require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set it to true if you are using https
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./Routes/AuthRoutes');
app.use('/', authRoutes);

app.use('/dashboard', dashboardRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
