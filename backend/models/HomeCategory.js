const mongoose = require('mongoose');

const homeCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }, // e.g. emoji or icon string
  desc: { type: String },
  link: { type: String, default: '/menu' },
  image: { type: String }, // cloudinary url
  imagePublicId: { type: String } // cloudinary public id
}, { timestamps: true });

module.exports = mongoose.model('HomeCategory', homeCategorySchema);
