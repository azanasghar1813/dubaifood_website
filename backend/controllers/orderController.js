const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (or Private depending on if we force login)
const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      deliveryFee,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        deliveryFee,
        totalPrice,
      });

      const createdOrder = await order.save();

      // OPTIONAL: Socket.io logic to notify admin would go here
      // OPTIONAL: Nodemailer logic to send email to customer would go here
      
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrderItems };
