const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

// My User Login/register
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Google OAuth
router.post('/create', userController.createUser);
router.get('/:id', userController.getUser);

// Update user leaderboard visibility

module.exports = router;
