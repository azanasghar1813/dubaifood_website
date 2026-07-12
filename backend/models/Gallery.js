const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  section: { type: String, required: true },
  images: [{
    url: { type: String, required: true },
    publicId: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
