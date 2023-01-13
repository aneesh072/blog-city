require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.listen(4000, () => {
  console.log('Successfully running');
});
