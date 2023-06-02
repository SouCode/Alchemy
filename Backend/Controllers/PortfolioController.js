const Portfolio = require('../Models/Portfolio');

exports.addHolding = async (req, res) => {
  try {
    const { symbol, quantity, averagePrice } = req.body;
    const userId = req.user._id;

    const holding = await Portfolio.create({
      userId,
      symbol,
      quantity,
      averagePrice
    });

    res.status(201).json(holding);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add holding' });
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

    res.json(holding);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update holding' });
  }
};

exports.getAllHoldings = async (req, res) => {
  try {
    const userId = req.user._id;
    const holdings = await Portfolio.find({ userId });

    res.json(holdings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch holdings' });
  }
};

exports.deleteHolding = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const holding = await Portfolio.findOneAndDelete({ _id: id, userId });

    if (!holding) {
      return res.status(404).json({ error: 'Holding not found' });
    }

    res.json({ message: 'Holding deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete holding' });
  }
};
