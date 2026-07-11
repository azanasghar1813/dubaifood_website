const categories = [
  { name: 'Pizza', order: 1 },
  { name: 'Premium Pizza', order: 2 },
  { name: 'Square Pizza', order: 3 },
  { name: 'Burgers', order: 4 },
  { name: 'Pratha Rolls', order: 5 },
  { name: 'Special Rolls', order: 6 },
  { name: 'Pasta', order: 7 },
  { name: 'Appetizers', order: 8 },
  { name: 'Sandwich', order: 9 },
  { name: 'Shawarma', order: 10 },
  { name: 'Special Drinks', order: 11 },
  { name: 'Special Ice Cream Flavors', order: 12 },
  { name: 'Rices', order: 13 },
  { name: 'Chinies Gravy', order: 14 },
  { name: 'Noodles', order: 15 },
  { name: 'Mutton', order: 16 },
  { name: 'Beef', order: 17 },
  { name: 'Starters', order: 18 },
  { name: 'Soups', order: 19 },
  { name: 'Bar B-Q', order: 20 },
  { name: 'Salads', order: 21 },
  { name: 'Tandoor', order: 22 },
  { name: 'Hot & Cold', order: 23 },
  { name: 'Chicken', order: 24 },
  { name: 'Broast', order: 25 },
];

const pizzaSizes = [
  { name: 'Small', price: 600 },
  { name: 'Medium', price: 1050 },
  { name: 'Large', price: 1500 },
  { name: 'X-Large', price: 2000 }
];

const premiumPizzaSizes = [
  { name: 'Small', price: 700 },
  { name: 'Medium', price: 1150 },
  { name: 'Large', price: 1650 },
  { name: 'X-Large', price: 2200 }
];

const squarePizzaSizes = [
  { name: 'Small', price: 750 },
  { name: 'Medium', price: 1350 },
  { name: 'Large', price: 1750 }
];

const specialDrinkSizes = [
  { name: 'Regular', price: 70 },
  { name: 'Large', price: 100 }
];

const falsaDrinkSizes = [
  { name: 'Regular', price: 80 },
  { name: 'Large', price: 100 }
];

const mintDrinkSizes = [
  { name: 'Regular', price: 150 },
  { name: 'Large', price: 150 }
];

const halfFullSizes = (halfPrice, fullPrice) => {
  const sizes = [];
  if (halfPrice) sizes.push({ name: 'Half', price: halfPrice });
  if (fullPrice) sizes.push({ name: 'Full', price: fullPrice });
  return sizes;
};

const products = [
  // Pizzas
  { name: 'Chicken Tikka Pizza', categoryName: 'Pizza', isPizza: true, sizes: pizzaSizes },
  { name: 'Chicken Fajita Pizza', categoryName: 'Pizza', isPizza: true, sizes: pizzaSizes },
  { name: 'Shahi Pizza', categoryName: 'Pizza', isPizza: true, sizes: pizzaSizes },
  { name: 'Bone Fire Pizza', categoryName: 'Pizza', isPizza: true, sizes: pizzaSizes },
  { name: 'Max Pizza', categoryName: 'Pizza', isPizza: true, sizes: pizzaSizes },
  { name: 'Vegetable Pizza', categoryName: 'Pizza', isPizza: true, sizes: pizzaSizes, isVeg: true },
  { name: 'Chicken Supreme', categoryName: 'Pizza', isPizza: true, sizes: pizzaSizes },
  { name: 'Chicken Achari Pizza', categoryName: 'Pizza', isPizza: true, sizes: pizzaSizes },
  { name: 'Chicken Tandori Pizza', categoryName: 'Pizza', isPizza: true, sizes: pizzaSizes },
  { name: 'Hot & Spicy Pizza', categoryName: 'Pizza', isPizza: true, sizes: pizzaSizes },

  // Premium Pizzas
  { name: 'Malai Boti Pizza', categoryName: 'Premium Pizza', isPizza: true, sizes: premiumPizzaSizes },
  { name: 'Cheesy Lover Pizza', categoryName: 'Premium Pizza', isPizza: true, sizes: premiumPizzaSizes },
  { name: 'Special Lazania Pizza', categoryName: 'Premium Pizza', isPizza: true, sizes: premiumPizzaSizes },
  { name: 'Behari Kabab', categoryName: 'Premium Pizza', isPizza: true, sizes: premiumPizzaSizes },
  { name: 'Dubai Special Pizza', categoryName: 'Premium Pizza', isPizza: true, sizes: premiumPizzaSizes },
  { name: 'Kabab Crown Crust Pizza', categoryName: 'Premium Pizza', isPizza: true, sizes: premiumPizzaSizes },
  { name: 'Afghani Malai Boti Pizza', categoryName: 'Premium Pizza', isPizza: true, sizes: premiumPizzaSizes },
  { name: 'BBQ Pizza', categoryName: 'Premium Pizza', isPizza: true, sizes: premiumPizzaSizes },

  // Square Pizzas
  { name: 'Square Pizza Special Edition', categoryName: 'Square Pizza', isPizza: true, sizes: squarePizzaSizes },

  // Burgers
  { name: 'Zinger Burger', categoryName: 'Burgers', price: 350 },
  { name: 'Grilled Burger', categoryName: 'Burgers', price: 380 },
  { name: 'Chicken Burger', categoryName: 'Burgers', price: 180 },
  { name: 'Chapli Kabab Burger', categoryName: 'Burgers', price: 300 },
  { name: 'Tower Burger', categoryName: 'Burgers', price: 550 },
  { name: 'Patty Burger', categoryName: 'Burgers', price: 260 },
  { name: 'Turkish Burger', categoryName: 'Burgers', price: 260 },
  { name: 'Pizza Burger', categoryName: 'Burgers', price: 520 },
  { name: 'Double Decker Burger', categoryName: 'Burgers', price: 550 },

  // Pratha Rolls
  { name: 'Zinger Pratha Roll', categoryName: 'Pratha Rolls', price: 300 },
  { name: 'Chicken Pratha Roll', categoryName: 'Pratha Rolls', price: 300 },
  { name: 'Turkish Pratha Roll', categoryName: 'Pratha Rolls', price: 300 },
  { name: 'Kabab Pratha Roll', categoryName: 'Pratha Rolls', price: 300 },

  // Special Rolls
  { name: 'Italian Roll', categoryName: 'Special Rolls', price: 500 },
  { name: 'Malai Boti Roll', categoryName: 'Special Rolls', price: 550 },

  // Pasta
  { name: 'Chicken Cheez Pasta (Small)', categoryName: 'Pasta', price: 500 },
  { name: 'Chicken Cheez Pasta (Large)', categoryName: 'Pasta', price: 750 },

  // Appetizers
  { name: 'Chicken Hot Wings (12pcs)', categoryName: 'Appetizers', price: 840 },
  { name: 'Chicken Hot Wings (06pcs)', categoryName: 'Appetizers', price: 420 },
  { name: 'Nuggets (10pcs)', categoryName: 'Appetizers', price: 600 },
  { name: 'Fries (Small)', categoryName: 'Appetizers', price: 150 },
  { name: 'Fries (Medium)', categoryName: 'Appetizers', price: 250 },
  { name: 'Fries (Large)', categoryName: 'Appetizers', price: 300 },
  { name: 'Loaded Fries', categoryName: 'Appetizers', price: 750 },
  { name: 'White Sauce', categoryName: 'Appetizers', price: 50 },

  // Sandwiches
  { name: 'Turkish Sandwich', categoryName: 'Sandwich', price: 300 },
  { name: 'Chicken Club Sandwich', categoryName: 'Sandwich', price: 300 },
  { name: 'Grilled Cheesy Sandwich', categoryName: 'Sandwich', price: 520 },

  // Shawarma
  { name: 'Turkish Shawarma (Regular)', categoryName: 'Shawarma', price: 200 },
  { name: 'Turkish Shawarma (Large)', categoryName: 'Shawarma', price: 250 },
  { name: 'Chicken Shawarma (Regular)', categoryName: 'Shawarma', price: 150 },
  { name: 'Chicken Shawarma (Large)', categoryName: 'Shawarma', price: 170 },
  { name: 'Zinger Shawarma', categoryName: 'Shawarma', price: 300 },
  { name: 'Plater Shawarma', categoryName: 'Shawarma', price: 350 },
  { name: 'Kabab Shawarma', categoryName: 'Shawarma', price: 300 },

  // Special Drinks
  { name: 'BlueBerry', categoryName: 'Special Drinks', sizes: specialDrinkSizes },
  { name: 'PineApple', categoryName: 'Special Drinks', sizes: specialDrinkSizes },
  { name: 'Imli', categoryName: 'Special Drinks', sizes: specialDrinkSizes },
  { name: 'Red Anar', categoryName: 'Special Drinks', sizes: specialDrinkSizes },
  { name: 'Lychee', categoryName: 'Special Drinks', sizes: specialDrinkSizes },
  { name: 'Guava', categoryName: 'Special Drinks', sizes: specialDrinkSizes },
  { name: 'Strawberry', categoryName: 'Special Drinks', sizes: specialDrinkSizes },
  { name: 'Falsa', categoryName: 'Special Drinks', sizes: falsaDrinkSizes },
  { name: 'Mint Margarita', categoryName: 'Special Drinks', sizes: mintDrinkSizes },

  // Special Ice Cream Flavors
  { name: 'Surprise special', categoryName: 'Special Ice Cream Flavors', price: 280 },
  { name: '3 scoop ice cream', categoryName: 'Special Ice Cream Flavors', price: 240 },
  { name: '2 scoop ice cream', categoryName: 'Special Ice Cream Flavors', price: 160 },
  { name: '1 scoop ice cream', categoryName: 'Special Ice Cream Flavors', price: 80 },

  // Rices
  { name: 'Special Fried Rice', categoryName: 'Rices', sizes: halfFullSizes(700, 1000) },
  { name: 'Chicken Fried Rice', categoryName: 'Rices', sizes: halfFullSizes(650, 950) },
  { name: 'Chicken Masala Rice', categoryName: 'Rices', sizes: halfFullSizes(650, 950) },
  { name: 'Chicken Shashlik with Rice', categoryName: 'Rices', price: 1100 },
  { name: 'Vegetable Fried Rice', categoryName: 'Rices', sizes: halfFullSizes(400, 800) },
  { name: 'Chicken Biryani', categoryName: 'Rices', sizes: halfFullSizes(550, 1000) },
  { name: 'Beef Bannu Pulao', categoryName: 'Rices', sizes: halfFullSizes(480, 900) },
  { name: 'Jangi Pulao', categoryName: 'Rices', sizes: halfFullSizes(650, 1200) },
  { name: 'Plain Rice', categoryName: 'Rices', price: 600 },

  // Chinies Gravy
  { name: 'Special Pineapple Cherry', categoryName: 'Chinies Gravy', price: 1200 },
  { name: 'Chicken Manchurian', categoryName: 'Chinies Gravy', price: 1000 },
  { name: 'Chicken Almond', categoryName: 'Chinies Gravy', price: 1100 },
  { name: 'Chicken Chili Dry', categoryName: 'Chinies Gravy', price: 1000 },

  // Noodles
  { name: 'Special Chow Mein', categoryName: 'Noodles', price: 900 },
  { name: 'Chicken Chow Mein', categoryName: 'Noodles', price: 800 },
  { name: 'Vegetable Chow Mein', categoryName: 'Noodles', price: 700 },

  // Mutton
  { name: 'Special Mutton Karahi', categoryName: 'Mutton', sizes: halfFullSizes(1850, 3600) },
  { name: 'Mutton Karahi', categoryName: 'Mutton', sizes: halfFullSizes(1850, 3400) },
  { name: 'Mutton White Karahi', categoryName: 'Mutton', sizes: halfFullSizes(1850, 3500) },
  { name: 'Mutton Shinwari Karahi', categoryName: 'Mutton', sizes: halfFullSizes(1850, 3500) },
  { name: 'Mutton Handi', categoryName: 'Mutton', sizes: halfFullSizes(1850, 3600) },
  { name: 'Mutton White Handi', categoryName: 'Mutton', sizes: halfFullSizes(1850, 3600) },
  { name: 'Mutton Achari Handi', categoryName: 'Mutton', sizes: halfFullSizes(1850, 3600) },
  { name: 'Mutton Arabian', categoryName: 'Mutton', price: 2050 },
  { name: 'Mutton Hari Mirch', categoryName: 'Mutton', price: 1890 },
  { name: 'Mutton Chili Lemon', categoryName: 'Mutton', price: 1890 },
  { name: 'Mutton Machli', categoryName: 'Mutton', price: 1900 },

  // Beef
  { name: 'Special Beef Karahi', categoryName: 'Beef', sizes: halfFullSizes(1100, 2200) },
  { name: 'Beef Karahi', categoryName: 'Beef', sizes: halfFullSizes(1000, 1900) },
  { name: 'Beef White Karahi', categoryName: 'Beef', sizes: halfFullSizes(1050, 1950) },
  { name: 'Beef Namkeen Fry', categoryName: 'Beef', price: 600 },

  // Starters
  { name: 'Chicken Dhaka', categoryName: 'Starters', price: 1050 },
  { name: 'Chicken Pakora', categoryName: 'Starters', price: 900 },
  { name: 'Honey Wings', categoryName: 'Starters', price: 690 },
  { name: 'Fish Crackers', categoryName: 'Starters', price: 300 },

  // Soups
  { name: 'Special Soup', categoryName: 'Soups', sizes: halfFullSizes(600, 1100) },
  { name: 'Hot & Sour Soup', categoryName: 'Soups', sizes: halfFullSizes(550, 900) },
  { name: 'Chicken Corn Soup', categoryName: 'Soups', sizes: halfFullSizes(550, 900) },
  { name: 'Vegetable Soup', categoryName: 'Soups', sizes: halfFullSizes(400, 700) },

  // Bar B-Q
  { name: 'Bar B-Q Platter (Full)', categoryName: 'Bar B-Q', price: 3600 },
  { name: 'Bar B-Q Platter (Half)', categoryName: 'Bar B-Q', price: 2400 },

  // Salads
  { name: 'SP Salad Platter', categoryName: 'Salads', price: 1090 },
  { name: 'Russian Salad', categoryName: 'Salads', price: 690 },
  { name: 'Ch Pineapple Salad', categoryName: 'Salads', price: 890 },
  { name: 'Kachumar Salad', categoryName: 'Salads', price: 90 },
  { name: 'Fresh Green Salad', categoryName: 'Salads', price: 70 },
  { name: 'Raita', categoryName: 'Salads', price: 70 },

  // Tandoor
  { name: 'SP Ch Cheez Naan', categoryName: 'Tandoor', price: 400 },
  { name: 'Garlic Naan', categoryName: 'Tandoor', price: 90 },
  { name: 'Ginjer Naan', categoryName: 'Tandoor', price: 90 },
  { name: 'Kalwanji Naan', categoryName: 'Tandoor', price: 70 },
  { name: 'Roghni Naan', categoryName: 'Tandoor', price: 80 },
  { name: 'Tandoori Paratha', categoryName: 'Tandoor', price: 90 },
  { name: 'Sada Naan', categoryName: 'Tandoor', price: 70 },
  { name: 'Sada Roti', categoryName: 'Tandoor', price: 14 },
  { name: 'Roti Per Head', categoryName: 'Tandoor', price: 140 },

  // Hot & Cold
  { name: 'Mint Margarita', categoryName: 'Hot & Cold', price: 150 },
  { name: 'Lemonade', categoryName: 'Hot & Cold', price: 120 },
  { name: 'Fresh Lime 7up', categoryName: 'Hot & Cold', price: 90 },
  { name: 'Regular Soft Drink', categoryName: 'Hot & Cold', price: 70 },
  { name: 'Tin Pack', categoryName: 'Hot & Cold', price: 120 },
  { name: 'Soft Drink 1.5', categoryName: 'Hot & Cold', price: 220 },
  { name: 'Mineral Water (L)', categoryName: 'Hot & Cold', price: 90 },
  { name: 'SP Tea', categoryName: 'Hot & Cold', price: 80 },
  { name: 'SP Gurh Tea', categoryName: 'Hot & Cold', price: 100 },
  { name: 'Green Tea', categoryName: 'Hot & Cold', price: 60 },

  // Chicken
  { name: 'Special Chicken Karahi', categoryName: 'Chicken', sizes: halfFullSizes(950, 1850) },
  { name: 'Chicken Karahi', categoryName: 'Chicken', sizes: halfFullSizes(750, 1650) },
  { name: 'Chicken White Karahi', categoryName: 'Chicken', sizes: halfFullSizes(850, 1750) },
  { name: 'Chicken Handi', categoryName: 'Chicken', sizes: halfFullSizes(950, 1750) },
  { name: 'Chicken White Handi', categoryName: 'Chicken', sizes: halfFullSizes(950, 1850) },
  { name: 'Chicken Achari Handi', categoryName: 'Chicken', sizes: halfFullSizes(850, 1650) },
  { name: 'Chicken Madrasi', categoryName: 'Chicken', sizes: halfFullSizes(850, 1550) },
  { name: 'Chicken Makhni', categoryName: 'Chicken', sizes: halfFullSizes(850, 1550) },
  { name: 'Chicken Bharta', categoryName: 'Chicken', sizes: halfFullSizes(850, 1550) },
  { name: 'Chicken Hari Mirch', categoryName: 'Chicken', sizes: halfFullSizes(850, 1550) },
  { name: 'Chicken Chili Lemon', categoryName: 'Chicken', sizes: halfFullSizes(850, 1550) },
  { name: 'Chicken Nawabi', categoryName: 'Chicken', sizes: halfFullSizes(850, 1550) },
  { name: 'Chicken Rajasthani', categoryName: 'Chicken', sizes: halfFullSizes(850, 1550) },
  { name: 'Chicken Jalfrezi', categoryName: 'Chicken', price: 1400 },
  { name: 'Chicken Ginger', categoryName: 'Chicken', price: 1300 },
  { name: 'Kabab Masala', categoryName: 'Chicken', price: 990 },
  { name: 'Tikka Piece Masala', categoryName: 'Chicken', price: 990 },
  { name: 'Shahi Daal', categoryName: 'Chicken', price: 550 },
  { name: 'Mix Veg', categoryName: 'Chicken', price: 500 },
  { name: 'Daal Makhni', categoryName: 'Chicken', price: 650 },
  { name: 'Daal Mash', categoryName: 'Chicken', price: 450 },

  // Additional Bar B-Q
  { name: 'Special Qalmi Tikka (6 Piece)', categoryName: 'Bar B-Q', price: 1400 },
  { name: 'Lebanese Kabab (6 Piece)', categoryName: 'Bar B-Q', price: 1380 },
  { name: 'Makhmali Kabab (6 Piece)', categoryName: 'Bar B-Q', price: 1400 },
  { name: 'Reshmi Kabab (6 Piece)', categoryName: 'Bar B-Q', price: 1200 },
  { name: 'Chicken Kabab (6 Piece)', categoryName: 'Bar B-Q', price: 1080 },
  { name: 'Malai Boti (12 Piece)', categoryName: 'Bar B-Q', price: 1200 },
  { name: 'Shish Tawook Boti (12 Piece)', categoryName: 'Bar B-Q', price: 1200 },
  { name: 'Kastoori Boti (12 Piece)', categoryName: 'Bar B-Q', price: 1200 },
  { name: 'Bihari Boti (12 Piece)', categoryName: 'Bar B-Q', price: 1200 },
  { name: 'Green Boti (12 Piece)', categoryName: 'Bar B-Q', price: 1200 },
  { name: 'Tikka Boti (12 Piece)', categoryName: 'Bar B-Q', price: 1080 },
  { name: 'Tikka Piece (Chest)', categoryName: 'Bar B-Q', price: 430 },
  { name: 'Tikka Piece (Leg)', categoryName: 'Bar B-Q', price: 390 },
  { name: 'Malai Piece (Chest)', categoryName: 'Bar B-Q', price: 450 },
  { name: 'Malai Piece (Leg)', categoryName: 'Bar B-Q', price: 410 },
  { name: 'Fish Tikka (8 Piece)', categoryName: 'Bar B-Q', price: 1650 },
  { name: 'Lahori Grilled Fish (1 KG)', categoryName: 'Bar B-Q', price: 1600 },

  // Broast
  { name: 'Spicy Injected Broast', categoryName: 'Broast', sizes: halfFullSizes(1100, 2100) }
];

const deals = [
  { dealNumber: 'Deal #1', price: 1250, includedItems: ['2 Small Pizza', '500 ml Drink'] },
  { dealNumber: 'Deal #2', price: 2200, includedItems: ['2 Medium Pizza', '1.5 L Drink'] },
  { dealNumber: 'Deal #3', price: 3000, includedItems: ['2 Large Pizza', '1.5 L Drink'] },
  { dealNumber: 'Deal #4', price: 3100, includedItems: ['1 XL Pizza', '1 Medium Pizza', '2.5 L Drink'] },
  { dealNumber: 'Deal #5', price: 4750, name: 'Birthday Deal', includedItems: ['2 Large Pizza', '3 Zinger Burger', '3 Chicken Shawarma', '2 L Drink'] },
  { dealNumber: 'Deal #6', price: 2000, includedItems: ['1 Medium Pizza', '2 Zinger Burger', '1 Small Fries', '1.5 L Drink'] },
  { dealNumber: 'Deal #7', price: 1500, includedItems: ['1 Small Pizza', '2 Zinger Burger', '1 Large Shawarma', '1 L Drink'] },
  { dealNumber: 'Deal #8', price: 1850, includedItems: ['5 Zinger Burger', '1.5 L Drink'] },
  { dealNumber: 'Deal #9', price: 1150, includedItems: ['3 Zinger Burger', '1 L Drink'] },
  { dealNumber: 'Deal #10', price: 800, includedItems: ['2 Zinger Burger', '500 ml Drink'] },
  { dealNumber: 'Deal #11', price: 680, includedItems: ['1 Zinger Burger', '5 Chicken Hot Wings', '500 ml Drink'] },
  { dealNumber: 'Deal #12', price: 680, includedItems: ['10 Chicken Nuggets', '500 ml Drink'] },
  { dealNumber: 'Deal #13', price: 1050, includedItems: ['5 Chicken Burger', '1.5 L Drink'] },
  { dealNumber: 'Deal #14', price: 950, includedItems: ['5 Chicken Shawarma L', '1 L Drink'] },
  { dealNumber: 'Deal #15', price: 1600, includedItems: ['2 L Chicken Cheese Pasta', '1 L Drink'] },
  { dealNumber: 'Deal #16', price: 1000, includedItems: ['2 Small Chicken Cheese Pasta', '500ml Drink'] },
  { dealNumber: 'Deal #17', price: 780, includedItems: ['1 Malai Boti Roll', '1 Small Fries', '500ml Drink'] },
  { dealNumber: 'Deal #18', price: 1350, includedItems: ['3 Turkish Sandwich', '1 Zinger Burger', '1 L Drink'] },
  { dealNumber: 'Deal #19', price: 750, includedItems: ['1 Pizza Burger', '1 Small Fries', '500 ml Drink'] },
  { dealNumber: 'Deal #20', price: 900, includedItems: ['1 Tower Burger', '4 Chicken Hot Wings', '500ml Drink'] },
  { dealNumber: 'Deal #21', price: 600, includedItems: ['1 Chicken Patty Burger', '1 Medium Fries', '500 ml Drink'] },
  { dealNumber: 'Deal #22', price: 500, includedItems: ['1 Chapli Kebab Burger', '1 Small Fries', '500ml Drink'] },
  { dealNumber: 'Deal #23', price: 600, includedItems: ['1 Grilled Burger', '1 Small Fries', '500ml Drink'] },
  { dealNumber: 'Deal #24', price: 700, includedItems: ['2 Zinger Paratha', '1 Small Fries'] },
  { dealNumber: 'Deal #25', price: 630, includedItems: ['1 Kebab Paratha', '1 Medium Fries', '500ml Drink'] },
  { dealNumber: 'Deal #26', price: 780, includedItems: ['10 Hot wings', '500ml Drink'] },
  { dealNumber: 'Deal #27', price: 1100, includedItems: ['1 Loaded Fries', '4 Chicken Wings', '500ml Drink'] },
  { dealNumber: 'Deal #28', price: 1500, includedItems: ['20 Chicken Hot Wings', '1 L Drink'] },
  { dealNumber: 'Deal #29', price: 1300, includedItems: ['20 Chicken Nuggets', '1 L Drink'] },
  { dealNumber: 'Deal #30', price: 730, includedItems: ['1 Italian Roll', '1 Small Fries', '500 ml Drink'] },
  { dealNumber: 'Deal #31', price: 680, includedItems: ['2 Turkish Paratha', '500ml Drink'] },
  { dealNumber: 'Deal #32', price: 850, includedItems: ['1 Chicken Cheese Small Pasta', '4 Chicken Hot Wings', '500ml Drink'] },
  { dealNumber: 'Deal #33', price: 900, includedItems: ['1 Malai Boti Roll', '4 Chicken Hot Wings', '500ml Drink'] },
  { dealNumber: 'Deal #34', price: 980, includedItems: ['1 Zinger Burger', '1 Turkish Paratha', '1 Medium Fries', '500ml Drink'] },
  { dealNumber: 'Deal #35', price: 1320, includedItems: ['1 L Chicken Cheese Pasta', '6 Chicken Nuggets', '1 Small Fries', '500ml Drink'] },
  { dealNumber: 'Deal #36', price: 1800, includedItems: ['10 L Chicken Shawarma', '1 L Drink'] }
];

module.exports = { categories, products, deals };
