const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function register(req, res) {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).send({ message: 'User registration failed', error: err.message });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send({ message: 'Invalid username or password' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send({ message: 'Invalid username or password' });
  }
  const token = jwt.sign({ username: user.username }, 'your_jwt_secret');
  res.send({ message: 'Login successful', token });
}

module.exports = {
  register,
  login
};
