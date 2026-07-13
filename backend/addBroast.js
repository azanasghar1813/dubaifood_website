require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
const MenuCategory = require('./models/MenuCategory');

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
    
    // Ensure the Broast category exists
    const category = await MenuCategory.findOne({ name: 'Broast' });
    if (!category) {
      await MenuCategory.create({ name: 'Broast', id: 'broast', label: 'Broast', desc: 'Delicious Crispy Broast' });
      console.log("Category Broast created");
    }

    // Check if Broast already exists
    const existing = await MenuItem.findOne({ name: 'Delicious Spicy Injected Broast' });
    if (existing) {
      existing.isFeatured = true;
      existing.sizes = [
        { name: "Half 4 Piece", price: 1100 },
        { name: "Full 8 Piece", price: 2100 }
      ];
      await existing.save();
      console.log("Broast updated and marked as featured");
    } else {
      const broast = new MenuItem({
        name: "Delicious Spicy Injected Broast",
        description: "Introducing First Time in Chowk Azam by Chef Ibrar. 7% Service Charges On Every Order.",
        category: "Broast",
        isFeatured: true,
        sizes: [
          { name: "Half 4 Piece", price: 1100 },
          { name: "Full 8 Piece", price: 2100 }
        ]
      });
      await broast.save();
      console.log("Broast added successfully");
    }
    
    process.exit(0);
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
}

run();
