const axios = require('axios');
require('dotenv').config();

exports.getNews = async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'stocks', // You can modify the search query as per your requirements
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    const news = response.data.articles;
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};
