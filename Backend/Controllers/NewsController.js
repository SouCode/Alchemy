const axios = require('axios');
require('dotenv').config();

exports.getNews = async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'stocks',
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    const news = response.data.articles.slice(0, 2); // Limit to 2 articles
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

