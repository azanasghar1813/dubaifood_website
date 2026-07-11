const { categories, products } = require('../data');

// @desc    Fetch all products with categories
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // Mocking the database query
    const menu = categories.map(cat => {
      return {
        category: { _id: cat.name, name: cat.name },
        items: products.filter(p => p.categoryName === cat.name).map((p, i) => ({ ...p, _id: p.name + i }))
      };
    });

    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  res.json({}); // Mocked
};

module.exports = { getProducts, getProductById };
