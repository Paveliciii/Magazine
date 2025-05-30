const express = require('express');
const router = express.Router();

// Sample products data (would typically come from a database)
const products = [
  {
    _id: '1',
    name: 'Wireless Headphones',
    imageUrl: 'https://via.placeholder.com/300',
    description: 'High-quality wireless headphones with noise cancellation.',
    price: 129.99,
    rating: 4.5,
    numReviews: 12,
    countInStock: 10,
    category: 'Electronics',
    brand: 'AudioTech'
  },
  {
    _id: '2',
    name: 'Smartphone',
    imageUrl: 'https://via.placeholder.com/300',
    description: 'Latest smartphone with advanced camera and long battery life.',
    price: 699.99,
    rating: 4.8,
    numReviews: 24,
    countInStock: 7,
    category: 'Electronics',
    brand: 'TechGiant'
  },
  {
    _id: '3',
    name: 'Laptop',
    imageUrl: 'https://via.placeholder.com/300',
    description: 'Powerful laptop for work and gaming with high-performance specs.',
    price: 1299.99,
    rating: 4.7,
    numReviews: 18,
    countInStock: 5,
    category: 'Electronics',
    brand: 'ComputerPro'
  },
  {
    _id: '4',
    name: 'Smartwatch',
    imageUrl: 'https://via.placeholder.com/300',
    description: 'Feature-rich smartwatch with health monitoring and notifications.',
    price: 199.99,
    rating: 4.2,
    numReviews: 9,
    countInStock: 15,
    category: 'Electronics',
    brand: 'WearableTech'
  },
  {
    _id: '5',
    name: 'Wireless Earbuds',
    imageUrl: 'https://via.placeholder.com/300',
    description: 'Compact wireless earbuds with great sound quality and long battery life.',
    price: 89.99,
    rating: 4.4,
    numReviews: 14,
    countInStock: 20,
    category: 'Electronics',
    brand: 'AudioTech'
  },
  {
    _id: '6',
    name: 'Digital Camera',
    imageUrl: 'https://via.placeholder.com/300',
    description: 'Professional digital camera with high-resolution sensor and multiple lenses.',
    price: 849.99,
    rating: 4.6,
    numReviews: 7,
    countInStock: 3,
    category: 'Electronics',
    brand: 'PhotoMaster'
  },
];

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', (req, res) => {
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', (req, res) => {
  const { name, price, description, imageUrl, brand, category, countInStock } = req.body;
  
  const newProduct = {
    _id: Date.now().toString(),
    name,
    price,
    description,
    imageUrl,
    brand,
    category,
    countInStock,
    rating: 0,
    numReviews: 0
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', (req, res) => {
  const { name, price, description, imageUrl, brand, category, countInStock } = req.body;
  
  const productIndex = products.findIndex(p => p._id === req.params.id);
  
  if (productIndex !== -1) {
    products[productIndex] = {
      ...products[productIndex],
      name: name || products[productIndex].name,
      price: price || products[productIndex].price,
      description: description || products[productIndex].description,
      imageUrl: imageUrl || products[productIndex].imageUrl,
      brand: brand || products[productIndex].brand,
      category: category || products[productIndex].category,
      countInStock: countInStock || products[productIndex].countInStock
    };
    
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', (req, res) => {
  const productIndex = products.findIndex(p => p._id === req.params.id);
  
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
