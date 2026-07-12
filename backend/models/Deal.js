const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  dealNumber: { type: String, required: true },
  name: { type: String },
  price: { type: Number, required: true },
  includedItems: [{ type: String }],
  image: { type: String }, // Keep for backward compatibility
  imagePublicId: { type: String },
  images: [{
    url: { type: String },
    publicId: { type: String }
  }],
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Deal', dealSchema);
