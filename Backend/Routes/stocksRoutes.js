// Backend/routes/stocksRoutes.js
const express = require('express');
const router = express.Router();
const {
  getTrendingStocksController,
  searchStockBySymbolController,
  saveStockController,
  getIndicesDataController
} = require('../controllers/stocksController');

// Get trending stocks
router.get('/trending', getTrendingStocksController);

// Search stock by symbol
router.get('/search', searchStockBySymbolController);

// Save a stock
router.post('/save', saveStockController);

// Get indices data
router.get('/indices', getIndicesDataController);

module.exports = router;
