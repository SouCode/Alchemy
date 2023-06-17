const express = require('express');
const router = express.Router();
const { encrypt, decrypt } = require('../utils/encryptionUtils');
const AlchUsers = require('../models/alchemyUserModel');
const keys = require('../utils/keys.json');

// Rest of the code...

// Register a new user
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log('Received registration request:', username, password);

    const encryptedPassword = encrypt(password, keys.encryptionKey, keys.encryptionIV);

    const newUser = new AlchUsers({ username, password: encryptedPassword });
    await newUser.save();

    console.log('User registered successfully:', username);
    res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    next(err);
  }
});

// Login user
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log('Received login request:', username, password);

    const user = await AlchUsers.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(404).json({ message: 'User not found' });
    }

    const decryptedPassword = decrypt(user.password, keys.encryptionKey, keys.encryptionIV);
    if (decryptedPassword !== password) {
      console.log('Incorrect password for user:', username);
      return res.status(401).json({ message: 'Incorrect password' });
    }

    console.log('Login successful:', username);
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error logging in:', err);
    next(err);
  }
});

// Save API Keys to account
// Save Alpaca trade API keys for a user
router.post('/saveKeys', async (req, res, next) => {
  try {
    const { username, alpacaApiKey, alpacaSecretKey } = req.body;

    // Find the user in the database
    const user = await AlchUsers.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's API keys
    user.alpacaApiKey = encrypt(alpacaApiKey, keys.encryptionKey, keys.encryptionIV);
    user.alpacaSecretKey = encrypt(alpacaSecretKey, keys.encryptionKey, keys.encryptionIV);
    await user.save();

    res.status(200).json({ message: 'API keys saved successfully' });
  } catch (err) {
    console.error('Error saving API keys:', err);
    next(err);
  }
});

// Fetch Alpaca trade API keys for a user
router.get('/keys/:username', async (req, res, next) => {
  try {
    const { username } = req.params;

    // Find the user in the database
    const user = await AlchUsers.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Decrypt the API keys
    const decryptedApiKey = decrypt(user.alpacaApiKey, keys.encryptionKey, keys.encryptionIV);
    const decryptedSecretKey = decrypt(user.alpacaSecretKey, keys.encryptionKey, keys.encryptionIV);

    res.status(200).json({ alpacaApiKey: decryptedApiKey, alpacaSecretKey: decryptedSecretKey });
  } catch (err) {
    console.error('Error fetching API keys:', err);
    next(err);
  }
});

// Fetch user by username
router.get('/users/:username', async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await AlchUsers.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('Error fetching user:', err);
    next(err);
  }
});

// Fetch current user
router.get('/users/current', async (req, res, next) => {
  try {
    const username = req.user.username; // Assuming you have a middleware that adds the authenticated user's information to the request object
    const user = await AlchUsers.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('Error fetching current user:', err);
    next(err);
  }
});

router.put('/profile', async (req, res, next) => {
  try {
    const { username, firstName, lastName, email } = req.body;

    // Find the user in the database
    const user = await AlchUsers.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the profile information
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    // Save the updated user to the database
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating profile:', err);
    next(err);
  }
});


module.exports = router;
