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
