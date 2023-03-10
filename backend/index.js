require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/user');

const app = express();

//middleware
app.use(express.json());

app.use(cors());

//routes
app.use('/api/blogs', blogRoutes);
app.use('/api/user', userRoutes);

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log('SUCCESSFULLY CONNECTED TO THE PORT');
    });
  })
  .catch((error) => {
    console.log(error);
  });
