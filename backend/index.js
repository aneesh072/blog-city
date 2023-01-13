require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

//middleware
app.use(express.json());

app.use(cors());

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI),
  then(() => {
    app.listen(process.env.PORT, () => {
      console.log('SUCCESSFULLY CONNECTED TO THE PORT');
    });
  }).catch((error) => {
    console.log(error);
  });
