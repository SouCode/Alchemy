const express = require('express');
const router = express.Router();
const transactionController = require('../Controllers/TransactionController');

router.post('/add', transactionController.addTransaction);
router.get('/holding/:symbol', transactionController.getHoldingTransactions);
router.get('/all', transactionController.getAllTransactions);

module.exports = router;
