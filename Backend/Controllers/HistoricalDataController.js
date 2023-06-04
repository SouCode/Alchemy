// Backend/Controllers/HistoricalDataController.js
// Fetch in the front end to produce Charts
// You can also produce charts for user performance in the other Transactions code

const HistoricalData = require('../Models/HistoricalData');

exports.getHistoricalData = async (req, res) => {
  try {
    const historicalData = await HistoricalData.find();
    res.json(historicalData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
};

exports.createHistoricalData = async (req, res) => {
  try {
    const { symbol, date, open, high, low, close } = req.body;
    const historicalData = new HistoricalData({
      symbol,
      date,
      open,
      high,
      low,
      close
    });
    await historicalData.save();
    res.status(201).json(historicalData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create historical data' });
  }
};
