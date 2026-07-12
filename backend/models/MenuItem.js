const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const imageSchema = new mongoose.Schema({
  url: { type: String },
  publicId: { type: String }
});

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  category: { type: String, required: true },
  image: { type: String },
  imagePublicId: { type: String },
  images: [imageSchema], // Support multiple images
  tags: [String],
  sizes: [sizeSchema],
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
