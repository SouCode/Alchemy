const express = require('express');
const router = express.Router();
const portfolioController = require('../Controllers/PortfolioController');

// Add a holding to the portfolio
router.post('/add', portfolioController.addHolding);

// Fetch all holdings in the portfolio
router.get('/', portfolioController.getPortfolio);

// Update a holding in the portfolio
router.put('/:id', portfolioController.updateHolding);

// Delete a holding from the portfolio
router.delete('/:id', portfolioController.deleteHolding);

module.exports = router;
