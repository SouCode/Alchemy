require('dotenv').config();
const axios = require('axios');

const API_BASE_URL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com';

const getTrendingStocks = async () => {
  const response = await axios.get(`${API_BASE_URL}/market/get-trending-tickers`, {
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    },
  });
  return response.data.finance.result[0].quotes;
};


const searchStockBySymbol = async (symbol) => {
  const response = await axios.get(`${API_BASE_URL}/market/v2/get-quotes`, {
    params: { symbols: symbol },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    },
  });
  return response.data.quoteResponse.result[0];
};

const getStockPrice = async (symbol) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/market/v2/get-quotes`, {
      params: { symbols: symbol },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      },
    });
    const stockData = response.data.quoteResponse.result[0];
    const price = stockData?.regularMarketPrice;
    return price ? parseFloat(price).toFixed(2) : null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch stock price');
  }
};

module.exports = { getTrendingStocks, searchStockBySymbol, getStockPrice };
