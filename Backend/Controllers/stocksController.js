const Stock = require('../models/stock');
const { getTrendingStocks, searchStockBySymbol } = require('../utils/yahooFinanceApi');
const axios = require('axios');


// Get trending stocks
const getTrendingStocksController = async (req, res) => {
  try {
    const trendingStocks = await getTrendingStocks();
    const limitedStocks = trendingStocks.slice(0, 5); // Limiting to 5 stocks

    // Extract the required properties from each stock
    const formattedStocks = limitedStocks.map((stock) => {
      return {
        symbol: stock.symbol,
        name: stock.shortName,
        price: stock.regularMarketPrice,
      };
    });

    res.json(formattedStocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  
const searchStockBySymbolController = async (req, res) => {
  const symbol = req.query.symbol;
  try {
    const stock = await searchStockBySymbol(symbol);
    const stockWithPrice = { ...stock, price: await getStockPrice(symbol) };
    res.json(stockWithPrice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getStockPrice = async (symbol) => {
  try {
    const response = await axios.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes`, {
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

// Save a stock
const saveStockController = async (req, res) => {
  const { symbol, name, price } = req.body;
  try {
    const stock = new Stock({ symbol, name, price });
    await stock.save();
    res.status(201).json({ message: 'Stock saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get indices data
const getIndicesDataController = async (req, res) => {
    try {
      const indices = ['^IXIC', '^GSPC', '^DJI']; // NASDAQ, S&P 500, DOW
      const indexData = [];
      for (const symbol of indices) {
        const stock = await searchStockBySymbol(symbol);
        indexData.push(stock);
      }
      res.json(indexData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }; 

module.exports = {
  getTrendingStocksController,
  searchStockBySymbolController,
  saveStockController, getIndicesDataController
};