const AlpacaUtils = require('../Utils/AlpacaUtils');
const User = require('../Models/User');

exports.saveAlpacaKeys = async (req, res) => {
  try {
    const { apiKey, secretKey } = req.body;
    const encryptedApiKey = encrypt(apiKey); // Encrypt the API key
    const encryptedSecretKey = encrypt(secretKey); // Encrypt the secret key

    // Save the encrypted API keys to the user's profile
    await User.findOneAndUpdate(
      { googleId: req.user.googleId },
      { alpaca: { apiKey: encryptedApiKey, secretKey: encryptedSecretKey } }
    );

    res.status(200).send('Alpaca API keys saved successfully');
  } catch (error) {
    res.status(500).send('Error saving Alpaca API keys');
  }
};

exports.getAccountInformation = async (req, res) => {
  try {
    // Retrieve the user's Alpaca API keys from the database
    const user = await User.findById(mongoose.Types.ObjectId(req.user.id));
    const { apiKey, secretKey } = user.alpaca;

    // Get the account information using the Alpaca API
    const account = await AlpacaUtils.getAccountInformation(apiKey, secretKey);

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving Alpaca account information' });
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    // Retrieve the user's Alpaca API keys from the database
    const user = await User.findById(mongoose.Types.ObjectId(req.user.id));
    const { apiKey, secretKey } = user.alpaca;

    // Get the portfolio information using the Alpaca API
    const portfolio = await AlpacaUtils.getPortfolio(apiKey, secretKey);

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving Alpaca portfolio' });
  }
};
