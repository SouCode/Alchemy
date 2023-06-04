const Alpaca = require('@alpacahq/alpaca-trade-api');

const getAccountInformation = async (apiKey, secretKey) => {
  const alpaca = new Alpaca({
    keyId: apiKey,
    secretKey,
    paper: true,
    usePolygon: false
  });
  return alpaca.getAccount();
};

const getPortfolio = async (apiKey, secretKey) => {
  const alpaca = new Alpaca({
    keyId: apiKey,
    secretKey,
    paper: true,
    usePolygon: false
  });
  return alpaca.getPortfolio();
};

const getCurrentPrice = async (symbol) => {
  const alpaca = new Alpaca({
    keyId: process.env.ALAPCA_API_KEY,
    secretKey: process.env.ALAPCA_SECRET_KEY,
    paper: true,
    usePolygon: false
  });

  const quote = await alpaca.getQuote(symbol);
  return quote.last.price;
};

const getStockPrice = async (symbol) => {
  const alpaca = new Alpaca({
    keyId: process.env.ALAPCA_API_KEY,
    secretKey: process.env.ALAPCA_SECRET_KEY,
    paper: true,
    usePolygon: false
  });

  const quote = await alpaca.getQuote(symbol);
  return quote.last.price;
};

module.exports = { getAccountInformation, getPortfolio, getCurrentPrice, getStockPrice };
