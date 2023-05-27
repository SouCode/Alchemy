const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

// Handle POST request for user registration
router.post('/register', userController.createUser);

// Handle GET request for retrieving a user by ID
router.get('/:id', userController.getUser);

module.exports = router;
