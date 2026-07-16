const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String },
  publicId: { type: String }
});

const featuredItemSchema = new mongoose.Schema({
  itemType: { 
    type: String, 
    required: true,
    enum: ['deal', 'menuitem', 'custom']
  },
  referenceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    refPath: 'itemModel'
  },
  itemModel: {
    type: String,
    enum: ['Deal', 'MenuItem']
  },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  includedItems: [{ type: String }],
  sizes: [{
    name: { type: String },
    price: { type: Number }
  }],
  category: { type: String },
  images: [imageSchema],
  image: { type: String },
  imagePublicId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('FeaturedItem', featuredItemSchema);
