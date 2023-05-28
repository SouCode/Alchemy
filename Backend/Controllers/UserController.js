const User = require('../Models/User');

exports.createUser = async (req, res) => {
  try {
    // Code to create a new user and save it to the database
    const newUser = await User.create({
      googleId: req.body.googleId,
      displayName: req.body.displayName,
      email: req.body.email,
      createdAt: new Date()
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.getUser = async (req, res) => {
  try {
    // Code to retrieve a user by their ID from the database
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};
