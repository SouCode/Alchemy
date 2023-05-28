const AlpacaUtils = require('../Utils/AlpacaUtils');

exports.saveAlpacaKeys = async (req, res) => {
  try {
    const { apiKey, secretKey } = req.body;
    const encryptedApiKey = encrypt(apiKey); // Encrypt the API key
    const encryptedSecretKey = encrypt(secretKey); // Encrypt the secret key
    
    // Save the encrypted API keys to the user's profile
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { alpaca: { apiKey: encryptedApiKey, secretKey: encryptedSecretKey } }
    );
    
    res.status(200).send('Alpaca API keys saved successfully');
  } catch (error) {
    res.status(500).send('Error saving Alpaca API keys');
  }
};

exports.getAlpacaAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const apiKey = decrypt(user.alpaca.apiKey); // Decrypt the API key
    const secretKey = decrypt(user.alpaca.secretKey); // Decrypt the secret key
    
    const account = await AlpacaUtils.getAccountInformation(apiKey, secretKey);
    res.send(account);
  } catch (error) {
    res.status(500).send('Error retrieving Alpaca account');
  }
};

exports.getAlpacaPortfolio = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const apiKey = decrypt(user.alpaca.apiKey); // Decrypt the API key
    const secretKey = decrypt(user.alpaca.secretKey); // Decrypt the secret key
    
    const portfolio = await AlpacaUtils.getPortfolioHistory(apiKey, secretKey);
    res.send(portfolio);
  } catch (error) {
    res.status(500).send('Error retrieving Alpaca portfolio');
  }
};
