const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

router.post('/create', userController.createUser);
router.get('/:id', userController.getUser);

// ... Other routes as needed

module.exports = router;
