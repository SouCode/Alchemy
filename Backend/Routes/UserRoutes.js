const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

//My User Login/register
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);


//Google Oauth
router.post('/create', userController.createUser);
router.get('/:id', userController.getUser);




module.exports = router;
