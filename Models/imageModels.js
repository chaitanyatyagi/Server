const mongoose = require('mongoose');
const slugify = require('slugify');

const imageSchema = new mongoose.Schema({
  imgName: {
    type: String,
    required: [true, 'An image must have name!'],
    unique: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  Deity: {
    type: String,
    required: [true, 'If you dont know, simply write not know!'],
  },
  usedBy: {
    type: String,
    required: [true, 'If you dont know, simply write not know!'],
  },
  slug: String,
  imgDescription: {
    type: String,
    required: true,
    max: [50, 'It should not exceed 50 characters!'],
    min: [5, 'It should be more than 5 characters!'],
  },
});

// Updating Slug
imageSchema.pre('save', function (next) {
  this.slug = slugify(this.imgName, { lower: true });
  next();
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
