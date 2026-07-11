require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Deal = require('./models/Deal');
const { categories, products, deals } = require('./data');

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing old data...');
    await Category.deleteMany();
    await Product.deleteMany();
    await Deal.deleteMany();

    console.log('Inserting categories...');
    const insertedCategories = await Category.insertMany(categories);

    console.log('Inserting products...');
    const productsWithCategoryIds = products.map(product => {
      const category = insertedCategories.find(c => c.name === product.categoryName);
      return {
        ...product,
        category: category._id
      };
    });
    await Product.insertMany(productsWithCategoryIds);

    console.log('Inserting deals...');
    await Deal.insertMany(deals);

    console.log('Data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
