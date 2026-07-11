const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
  restaurantName: { type: String, default: 'Dubai Fast Food' },
  phoneNumber: { type: String, default: '03001234567' },
  whatsappNumber: { type: String, default: '923001234567' },
  deliveryCharges: { type: Number, default: 150 },
  businessHours: { type: String, default: '10:00 AM - 2:00 AM' },
  googleMapUrl: { type: String },
  facebookUrl: { type: String },
  instagramUrl: { type: String },
  logoUrl: { type: String },
  heroBannerUrl: { type: String },
  freeDeliveryThreshold: { type: Number, default: 1500 },
  announcementText: { type: String, default: '🔥 Today\'s Special Deal' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
