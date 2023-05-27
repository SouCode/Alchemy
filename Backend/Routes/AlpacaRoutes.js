const express = require('express');
const router = express.Router();
const alpacaController = require('../Controllers/AlpacaController');

router.post('/create', alpacaController.createAlpacaUser);
router.get('/:id', alpacaController.getAlpacaUser);


module.exports = router;
