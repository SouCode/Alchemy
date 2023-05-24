// The specific functions here would depend on what you want to do with the Alpaca API.
// This is a simplified example.

const Alpaca = require('@alpacahq/alpaca-trade-api');
const alpaca = new Alpaca({
  keyId: process.env.ALPACA_API_KEY,
  secretKey: process.env.ALPACA_SECRET_KEY,
  paper: true,
  usePolygon: false
});

exports.getAlpacaAccount = async (req, res) => {
  const account = await alpaca.getAccount();
  res.send(account);
};

exports.getAlpacaPortfolio = async (req, res) => {
  const portfolio = await alpaca.getPortfolioHistory();
  res.send(portfolio);
};
