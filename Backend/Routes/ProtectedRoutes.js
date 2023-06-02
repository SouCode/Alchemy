const express = require('express');
const router = express.Router();

router.get('/protected-route', (req, res) => {
  // This route is no longer protected
  res.send('Protected route');
});

module.exports = router;
