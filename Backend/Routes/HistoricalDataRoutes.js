// Backend/Routes/HistoricalDataRoutes.js

const express = require('express');
const router = express.Router();
const historicalDataController = require('../Controllers/HistoricalDataController');

// Get all historical data
router.get('/', historicalDataController.getHistoricalData);

// Create new historical data
router.post('/', historicalDataController.createHistoricalData);

module.exports = router;
