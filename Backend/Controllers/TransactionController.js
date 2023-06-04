const Transaction = require('../Models/Transaction');

exports.addTransaction = async (req, res) => {
  try {
    const { symbol, quantity, price, transactionType } = req.body;
    const userId = req.user._id;

    const transaction = await Transaction.create({
      userId,
      symbol,
      quantity,
      price,
      transactionType
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add transaction' });
  }
};

exports.getHoldingTransactions = async (req, res) => {
    try {
      const { symbol } = req.params;
      const userId = req.user._id;
  
      const transactions = await Transaction.find({ userId, symbol });
  
      // Fetch historical data for the symbol
      const historicalData = await YahooFinanceUtils.getHistoricalData(symbol, '2021-01-01', '2023-05-31');
  
      res.json({ transactions, historicalData });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch holding transactions' });
    }
  };

exports.getAllTransactions = async (req, res) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({ userId });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all transactions' });
  }
};

// Buy a stock (for paper trading)
exports.buyStock = async (req, res) => {
  try {
    const { symbol, quantity, price, isPaperTrade } = req.body;
    const userId = req.user._id;

    const transaction = await Transaction.create({
      userId,
      symbol,
      quantity,
      price,
      isPaperTrade
    });

    if (isPaperTrade) {
      // Add the holding to the paper trade account
      await Portfolio.findOneAndUpdate(
        { userId },
        { $push: { paperTradeHoldings: { symbol, quantity, averagePrice: price } } }
      );
    } else {
      // Deduct the quantity from the real portfolio
      await Portfolio.findOneAndUpdate(
        { userId, symbol },
        { $inc: { quantity: -quantity } }
      );
    }

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to buy stock' });
  }
};

// Sell a stock (for paper trading)
exports.sellStock = async (req, res) => {
  try {
    const { symbol, quantity, price, isPaperTrade } = req.body;
    const userId = req.user._id;

    const transaction = await Transaction.create({
      userId,
      symbol,
      quantity: -quantity, // Negative quantity represents selling
      price,
      isPaperTrade
    });

    if (isPaperTrade) {
      // Remove the holding from the paper trade account
      await Portfolio.findOneAndUpdate(
        { userId },
        { $pull: { paperTradeHoldings: { symbol } } }
      );
    } else {
      // Add the quantity back to the real portfolio
      await Portfolio.findOneAndUpdate(
        { userId, symbol },
        { $inc: { quantity } }
      );
    }

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to sell stock' });
  }
};
