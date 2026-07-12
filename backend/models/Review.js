const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, default: 5 },
  status: { type: String, default: 'Pending' } // Pending, Approved
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
