const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  announcementText: { type: String, default: "Free delivery above Rs 1500" },
  heroImage: { type: String, default: "" },
  heroImagePublicId: { type: String, default: "" },
  heroFloatingImage: { type: String, default: "" },
  heroFloatingImagePublicId: { type: String, default: "" },
  heroFloatingImages: [{
    url: String,
    publicId: String
  }],
  logoImage: { type: String, default: "" },
  logoImagePublicId: { type: String, default: "" },
  socialLinks: {
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    tiktok: { type: String, default: "" }
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
