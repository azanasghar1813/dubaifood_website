const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const Deal = require('../models/Deal');
const Settings = require('../models/Settings');
const Gallery = require('../models/Gallery');
const Review = require('../models/Review');
const Order = require('../models/Order');

// Get all menu items
router.get('/menuitems', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all deals
router.get('/deals', async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const MenuCategory = require('../models/MenuCategory');
const HomeCategory = require('../models/HomeCategory');
const Filter = require('../models/Filter');

// Get all featured items (Menu Items marked as featured)
router.get('/featured', async (req, res) => {
  try {
    const featuredMenuItems = await MenuItem.find({ isFeatured: true });
    res.json(featuredMenuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get menu categories
router.get('/categories/menu', async (req, res) => {
  try {
    const categories = await MenuCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get home categories
router.get('/categories/home', async (req, res) => {
  try {
    const categories = await HomeCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get filters
router.get('/filters', async (req, res) => {
  try {
    const filters = await Filter.find();
    res.json(filters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get gallery
router.get('/gallery', async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get approved reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'Approved' }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit a review
router.post('/reviews', async (req, res) => {
  try {
    const review = new Review({
      name: req.body.name,
      comment: req.body.comment,
      rating: req.body.rating,
      status: 'Pending' // Requires admin approval
    });
    await review.save();
    res.status(201).json({ message: 'Review submitted for approval' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit an order
router.post('/orders', async (req, res) => {
  try {
    const order = new Order({
      customerName: req.body.customerName,
      phone: req.body.phone,
      address: req.body.address,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      status: 'Pending'
    });
    await order.save();
    res.status(201).json({ message: 'Order created successfully', orderId: order._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
