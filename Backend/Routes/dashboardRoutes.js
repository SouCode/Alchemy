const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // You can update this code to render a specific view or send a response as needed.
  res.send('Welcome to the dashboard!');
});

module.exports = router;
