const User = require('../Models/User');

exports.createUser = (req, res) => {
  // Get the necessary user information from the request body
  const { name, email, password } = req.body;

  // Create a new user object
  const newUser = new User({
    name,
    email,
    password
  });

  // Save the new user to the database
  newUser.save()
    .then(savedUser => {
      res.status(200).json(savedUser);
    })
    .catch(error => {
      res.status(500).json({ message: 'Failed to create user', error: error.message });
    });
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to retrieve user', error: error.message });
  }
};

