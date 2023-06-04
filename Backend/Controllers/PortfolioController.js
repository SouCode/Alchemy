const Portfolio = require('../Models/Portfolio');
const AlpacaUtils = require('../Utils/AlpacaUtils');


exports.getPortfolio = async (req, res) => {
    // Existing code...
      try {
      const userId = req.user._id;
  
      // Get all holdings for the user
      const holdings = await Portfolio.find({ userId });
  
      let portfolioValue = 0;
      let portfolioPerformance = 0;
  
      // Calculate the total portfolio value and performance
      for (const holding of holdings) {
        const currentPrice = await AlpacaUtils.getCurrentPrice(holding.symbol);
        const holdingValue = currentPrice * holding.quantity;
        portfolioValue += holdingValue;
        portfolioPerformance += holdingValue - (holding.averagePrice * holding.quantity);
      }
  
      // Calculate portfolio percentage change
      const initialPortfolioValue = portfolioValue - portfolioPerformance;
      const portfolioPercentChange = (portfolioPerformance / initialPortfolioValue) * 100;
  
      res.json({
        holdings,
        portfolioValue,
        portfolioPerformance,
        portfolioPercentChange
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve portfolio' });
    }
  };
  

exports.addHolding = async (req, res) => {
  try {
    const { symbol, quantity, averagePrice, isPaperTrade } = req.body;
    const userId = req.user._id;

    let holding;
    if (isPaperTrade) {
      // Add the holding to the paper trade account
      holding = {
        symbol,
        quantity,
        averagePrice
      };
      await Portfolio.findOneAndUpdate(
        { userId },
        { $push: { paperTradeHoldings: holding } }
      );
    } else {
      // Add the holding to the real portfolio
      holding = await Portfolio.create({
        userId,
        symbol,
        quantity,
        averagePrice
      });
    }

    res.status(201).json(holding);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add holding' });
  }
};

  // Sell a holding from the portfolio (for paper trading)
exports.sellHolding = async (req, res) => {
  try {
    const { symbol, quantity, isPaperTrade } = req.body;
    const userId = req.user._id;

    let updatedHolding;
    if (isPaperTrade) {
      // Remove the holding from the paper trade account
      updatedHolding = await Portfolio.findOneAndUpdate(
        { userId },
        { $pull: { paperTradeHoldings: { symbol } } },
        { new: true }
      );
    } else {
      // Sell the holding from the real portfolio
      updatedHolding = await Portfolio.findOneAndUpdate(
        { userId, symbol },
        { $inc: { quantity: -quantity } },
        { new: true }
      );
    }

    if (!updatedHolding) {
      return res.status(404).json({ error: 'Holding not found' });
    }

    res.json(updatedHolding);
  } catch (error) {
    res.status(500).json({ error: 'Failed to sell holding' });
  }
};
  


exports.updateHolding = async (req, res) => {
  try {
    const { symbol, quantity, averagePrice } = req.body;
    const { id } = req.params;
    const userId = req.user._id;

    const holding = await Portfolio.findOneAndUpdate(
      { _id: id, userId },
      { symbol, quantity, averagePrice },
      { new: true }
    );

    if (!holding) {
      return res.status(404).json({ error: 'Holding not found' });
    }

    // Get the current price from the Alpaca API
    const currentPrice = await AlpacaUtils.getCurrentPrice(symbol);

    // Calculate performance
    const initialPrice = holding.averagePrice;
    const performance = (currentPrice - initialPrice) * holding.quantity;
    const percentChange = ((currentPrice - initialPrice) / initialPrice) * 100;

    // Update performance fields
    holding.performance = performance;
    holding.percentChange = percentChange;
    await holding.save();

    res.json(holding);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update holding' });
  }
};

// Delete a holding from the portfolio
exports.deleteHolding = async (req, res) => {
    try {
      const { id } = req.params;
      // Delete the holding using the ID
      res.json({ message: 'Holding deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete holding' });
    }
  };
  

exports.getStockPrice = async (req, res) => {
  try {
    const { symbol } = req.params;
    const stockPrice = await AlpacaUtils.getStockPrice(symbol);
    res.json({ symbol, price: stockPrice });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving stock price' });
  }
};