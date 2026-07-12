const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true } // e.g. 'Spicy', 'Veg', 'Chicken'
}, { timestamps: true });

module.exports = mongoose.model('Filter', filterSchema);
