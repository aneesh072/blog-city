const express = require('express');

const {
  signupUser,
  loginUser,
  getUsers,
} = require('../controller/userController');

const router = express.Router();

//signup router
router.post('/signup', signupUser);

//login router
router.post('/login', loginUser);

//get all user routes
router.get('/users', getUsers);

module.exports = router;
