const express = require('express');
const router = express.Router();
const transactionController = require('../Controllers/TransactionController');

router.post('/add', transactionController.addTransaction);
router.get('/holding/:symbol', transactionController.getHoldingTransactions);
router.get('/all', transactionController.getAllTransactions);

router.post('/buy', transactionController.buyStock);
router.post('/sell', transactionController.sellStock);

module.exports = router;
