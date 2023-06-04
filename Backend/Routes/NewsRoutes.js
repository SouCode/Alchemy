const express = require('express');
const router = express.Router();
const newsController = require('../Controllers/NewsController');

router.get('/', newsController.getNews);

module.exports = router;
