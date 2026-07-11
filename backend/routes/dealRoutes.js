const express = require('express');
const router = express.Router();
const { getDeals } = require('../controllers/dealController');

router.route('/').get(getDeals);

module.exports = router;
