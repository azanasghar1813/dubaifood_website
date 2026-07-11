const { deals } = require('../data');

// @desc    Fetch all deals
// @route   GET /api/deals
// @access  Public
const getDeals = async (req, res) => {
  try {
    // Add fake IDs to deals
    const dealsWithIds = deals.map((d, i) => ({ ...d, _id: i }));
    res.json(dealsWithIds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDeals };
