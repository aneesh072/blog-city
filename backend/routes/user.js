const express = require('express');

const { signupUser, loginUser } = require('../controller/userController');

const router = express.Router();

//signup router
router.post('/signup', signupUser);

//login router
router.post('/login', loginUser);

module.exports = router;
