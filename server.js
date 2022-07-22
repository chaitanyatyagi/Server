// Server Listening
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const app = require('./app');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;

dotenv.config({
  path: './config.env',
});

const DB = process.env.DATABASE;
mongooseOptions = {
  useFindAndModify: false,
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  minPoolSize: 3,
};

mongoose.connect(DB, mongooseOptions).then(() => {
  console.log('DB Connected');
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join('frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.solve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is listening on port ${PORT}`);
});
