const Alpaca = require('@alpacahq/alpaca-trade-api');

// Initialize Alpaca API with credentials
const alpaca = new Alpaca({
  keyId: process.env.ALPACA_API_KEY,
  secretKey: process.env.ALPACA_SECRET_KEY,
  paper: true, // Set to true for paper trading
  usePolygon: false
});

// Utility function to create an Alpaca account for a user
const createAlpacaAccount = async (userId) => {
  try {
    // Check if the user already has an Alpaca account
    const existingAccount = await alpaca.getAccount();
    if (existingAccount) {
      throw new Error('Alpaca account already exists for this user');
    }

    // Create a new Alpaca account
    const account = await alpaca.createAccount({
      // Set account properties as per your requirements
      // For example: userId, initial funds, account type, etc.
      userId,
      initialFunds: 10000,
      accountType: 'individual'
    });

    return account;
  } catch (error) {
    console.error('Failed to create Alpaca account:', error);
    throw new Error('Failed to create Alpaca account');
  }
};

// Utility function to get the Alpaca account information for a user
const getAlpacaAccount = async () => {
  try {
    const account = await alpaca.getAccount();
    return account;
  } catch (error) {
    console.error('Failed to get Alpaca account:', error);
    throw new Error('Failed to get Alpaca account');
  }
};

// Utility function to place an order using the Alpaca API
const placeOrder = async (symbol, qty, side, type, timeInForce) => {
  try {
    const order = await alpaca.createOrder({
      symbol,
      qty,
      side,
      type,
      time_in_force: timeInForce
    });

    return order;
  } catch (error) {
    console.error('Failed to place order:', error);
    throw new Error('Failed to place order');
  }
};

module.exports = {
  createAlpacaAccount,
  getAlpacaAccount,
  placeOrder
};
