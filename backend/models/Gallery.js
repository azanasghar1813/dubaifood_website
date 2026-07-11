const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String }, // For Cloudinary
  caption: { type: String },
  order: { type: Number, default: 0 }, // For reordering images
  category: { type: String, enum: ['Pizza', 'Burger', 'Shawarma', 'Cafe', 'Interior', 'Kitchen', 'Other'], default: 'Other' }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
