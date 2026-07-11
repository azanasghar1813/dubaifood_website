const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional if guest checkout is allowed
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String },
      price: { type: Number, required: true },
      size: { type: String }, // For pizzas
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        // Depending on if it's a product or deal, this might need logic, but keeping simple for now
      },
      deal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deal'
      }
    }
  ],
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    altPhone: { type: String },
    city: { type: String, required: true },
    area: { type: String, required: true },
    address: { type: String, required: true },
    landmark: { type: String },
    specialInstructions: { type: String },
    deliveryType: { type: String, enum: ['Delivery', 'Pickup'], default: 'Delivery' }
  },
  paymentMethod: { type: String, required: true, default: 'Cash on Delivery' },
  itemsPrice: { type: Number, required: true, default: 0.0 },
  deliveryFee: { type: Number, required: true, default: 0.0 },
  totalPrice: { type: Number, required: true, default: 0.0 },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, required: true, default: false },
  deliveredAt: { type: Date },
  status: {
    type: String,
    enum: ['Order Received', 'Preparing', 'Cooking', 'Packing', 'Out For Delivery', 'Delivered', 'Cancelled'],
    default: 'Order Received'
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
