const AlpacaUser = require('../Models/AlpacaUser');

// Controller function for creating an Alpaca account for a user
exports.createAlpacaUser = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check if the user already has an Alpaca account
    const existingUser = await AlpacaUser.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ error: 'Alpaca account already exists for this user' });
    }
    
    // Create a new Alpaca account
    const alpacaUser = await AlpacaUser.create({ userId });
    res.status(201).json({ message: 'Alpaca account created successfully', alpacaUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function for getting an Alpaca account for a user
exports.getAlpacaUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Retrieve the Alpaca account for the specified user
    const alpacaUser = await AlpacaUser.findOne({ userId: id });
    if (!alpacaUser) {
      return res.status(404).json({ error: 'Alpaca account not found' });
    }
    
    res.status(200).json(alpacaUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
