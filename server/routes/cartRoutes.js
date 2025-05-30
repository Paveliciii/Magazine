const express = require('express');
const router = express.Router();

// Sample cart data (would typically be stored in a database or session)
let carts = {};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
router.post('/', (req, res) => {
  const { userId, productId, name, image, price, countInStock, qty } = req.body;
  
  // Create cart for user if it doesn't exist
  if (!carts[userId]) {
    carts[userId] = [];
  }
  
  const existingItem = carts[userId].find(item => item.productId === productId);
  
  if (existingItem) {
    // Update quantity if item already exists in cart
    existingItem.qty = qty;
  } else {
    // Add new item to cart
    carts[userId].push({
      productId,
      name,
      image,
      price,
      countInStock,
      qty
    });
  }
  
  res.status(201).json(carts[userId]);
});

// @desc    Get user cart
// @route   GET /api/cart/:userId
// @access  Public
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  
  if (!carts[userId]) {
    carts[userId] = [];
  }
  
  res.json(carts[userId]);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:userId/:productId
// @access  Public
router.delete('/:userId/:productId', (req, res) => {
  const { userId, productId } = req.params;
  
  if (!carts[userId]) {
    res.status(404).json({ message: 'Cart not found' });
    return;
  }
  
  carts[userId] = carts[userId].filter(item => item.productId !== productId);
  
  res.json(carts[userId]);
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:userId/:productId
// @access  Public
router.put('/:userId/:productId', (req, res) => {
  const { userId, productId } = req.params;
  const { qty } = req.body;
  
  if (!carts[userId]) {
    res.status(404).json({ message: 'Cart not found' });
    return;
  }
  
  const item = carts[userId].find(item => item.productId === productId);
  
  if (item) {
    item.qty = qty;
    res.json(carts[userId]);
  } else {
    res.status(404).json({ message: 'Item not found in cart' });
  }
});

// @desc    Clear cart
// @route   DELETE /api/cart/:userId
// @access  Public
router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  
  carts[userId] = [];
  
  res.json({ message: 'Cart cleared' });
});

module.exports = router;
