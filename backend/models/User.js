const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  isAdmin: { type: Boolean, required: true, default: false },
  addresses: [{
    city: String,
    area: String,
    address: String,
    landmark: String
  }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
