require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Deal = require('./models/Deal');
const Settings = require('./models/Settings');
const { products, deals } = require('./data');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log('MongoDB connected for seeding');

    await Product.deleteMany({});
    await Deal.deleteMany({});
    await Settings.deleteMany({});
    
    // Map products to the new schema
    const mappedProducts = products.map(p => ({
      name: p.name,
      category: p.categoryName || p.category,
      price: p.price,
      sizes: p.sizes || []
    }));

    await Product.insertMany(mappedProducts);
    console.log('Products seeded');

    await Deal.insertMany(deals);
    console.log('Deals seeded');

    const defaultSettings = new Settings({
      announcementText: "Free delivery above Rs 1500",
      heroImage: "" // Empty so user can upload later
    });
    await defaultSettings.save();
    console.log('Settings seeded');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
