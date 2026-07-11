const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String, default: 'default_food_image.jpg' },
  isAvailable: { type: Boolean, default: true },
  isPizza: { type: Boolean, default: false },
  // For standard items
  price: { type: Number },
  // For Pizzas (S, M, L, XL)
  sizes: [{
    name: { type: String }, // e.g., 'Small', 'Medium'
    price: { type: Number }
  }],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  preparationTime: { type: String, default: '15-20 mins' },
  isVeg: { type: Boolean, default: false }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
