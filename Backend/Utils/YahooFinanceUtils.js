const axios = require('axios');

const getHistoricalData = async (symbol, startDate, endDate) => {
  const apiKey = process.env.RAPIDAPI_KEY;
  const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data?symbol=${symbol}&region=US&from=${startDate}&to=${endDate}`;
  
  const response = await axios.get(url, {
    headers: {
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      'x-rapidapi-key': apiKey
    }
  });

  return response.data;
};

module.exports = { getHistoricalData };
