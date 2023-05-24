const User = require('../Models/User');

exports.getCurrentUser = async (req, res) => {
  if (!req.user) {
    res.status(401).send('Not logged in');
    return;
  }
  const user = await User.findById(req.user.id);
  res.send(user);
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
