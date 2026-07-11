const mongoose = require('mongoose');

const dealSchema = mongoose.Schema({
  dealNumber: { type: String, required: true, unique: true }, // e.g., 'Deal #1'
  name: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number }, // To calculate savings
  image: { type: String, default: 'default_deal_image.jpg' },
  includedItems: [{ type: String }],
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

const Deal = mongoose.model('Deal', dealSchema);
module.exports = Deal;
