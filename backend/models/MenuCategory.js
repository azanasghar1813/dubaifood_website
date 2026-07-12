const mongoose = require('mongoose');

const menuCategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // slug, e.g. 'fastfood'
  label: { type: String, required: true }, // e.g. '🍔 Fast Food & Pizza'
  categories: [{ type: String }] // subcategories, e.g. ['Pizza', 'Burgers']
}, { timestamps: true });

module.exports = mongoose.model('MenuCategory', menuCategorySchema);
