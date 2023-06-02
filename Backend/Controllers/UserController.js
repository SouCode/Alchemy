const User = require('../Models/User');
const bcrypt = require('bcrypt');
const { encrypt } = require('../Utils/EncryptionUtils');

// My User Login/Register
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptedPassword = encrypt(password); // Encrypt the password

    const newUser = await User.create({
      email,
      password: encryptedPassword,
      createdAt: new Date()
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};

// Google Oauth
exports.createUser = async (req, res) => {
  try {
    // Code to create a new user and save it to the database
    const newUser = await User.create({
      googleId: req.body.googleId,
      displayName: req.body.displayName,
      email: req.body.email,
      createdAt: new Date()
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.getUser = async (req, res) => {
  try {
    // Code to retrieve a user by their ID from the database
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

// save api key 

