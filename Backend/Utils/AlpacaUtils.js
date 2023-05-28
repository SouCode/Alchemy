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

const getPortfolioHistory = async (apiKey, secretKey) => {
  const alpaca = new Alpaca({
    keyId: apiKey,
    secretKey,
    paper: true,
    usePolygon: false
  });
  return alpaca.getPortfolioHistory();
};

module.exports = { getAccountInformation, getPortfolioHistory };
