const User = require('../model/UserModel');
const jwt = require('jsonwebtoken');

//create a token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

//signup user
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    //create a token here
    const token = createToken(user._id);
    res.status(200).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//sign in user
const loginUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all users
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

module.exports = { signupUser, loginUser, getUsers };
