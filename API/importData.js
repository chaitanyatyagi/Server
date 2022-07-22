// connecting our express app to database
const dotenv = require('dotenv');
dotenv.config({ path: './../config.env' });

const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database has been connected!');
  });

// REQUIRED IMPORTS
const fs = require('fs');
const Image = require('../Models/imageModels');

// READ JSON FILE
const images = JSON.parse(fs.readFileSync('./images.json', 'utf-8'));

// Import Data into our Database
const importData = async () => {
  try {
    await Image.create(images);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit;
};

// Deleting Data from our Database
const deleteData = async () => {
  try {
    await Image.deleteMany();
    console.log('Data deleted successfully!');
  } catch (err) {
    console.log(err);
  }
  process.exit;
};

if (process.argv[2] === '--import') {
  // node import-dev-data.js --import
  importData();
} else if (process.argv[2] === '--delete') {
  // node import-dev-data.js --delete
  deleteData();
}
