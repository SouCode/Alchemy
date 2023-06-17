const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/newsController');

router.get('/', NewsController.getNews); // Fix typo: change `newsController` to `NewsController`

module.exports = router;
