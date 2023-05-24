const express = require('express');
const connectDB = require('./Utils/Database');
const passportSetup = require('./Utils/GoogleAuth');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('dotenv').config();

const app = express();
connectDB();

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRoutes = require('./Routes/AuthRoutes');
app.use('/', authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
