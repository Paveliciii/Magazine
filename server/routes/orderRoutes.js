const express = require('express');
const router = express.Router();

// Sample orders data (would typically come from a database)
let orders = [
  {
    _id: '1001',
    user: {
      _id: '2',
      name: 'John Doe',
      email: 'john@example.com',
    },
    orderItems: [
      {
        name: 'Wireless Headphones',
        qty: 1,
        image: 'https://via.placeholder.com/300',
        price: 129.99,
        product: '1',
      },
    ],
    shippingAddress: {
      address: '123 Main St',
      city: 'Boston',
      postalCode: '02108',
      country: 'USA',
    },
    paymentMethod: 'PayPal',
    paymentResult: {
      id: 'pay123',
      status: 'COMPLETED',
      update_time: '2025-05-29T10:15:00Z',
      email_address: 'john@example.com',
    },
    itemsPrice: 129.99,
    taxPrice: 19.50,
    shippingPrice: 0,
    totalPrice: 149.49,
    isPaid: true,
    paidAt: '2025-05-29T10:15:00Z',
    isDelivered: true,
    deliveredAt: '2025-05-30T14:20:00Z',
    createdAt: '2025-05-29T09:30:00Z',
  },
  {
    _id: '1002',
    user: {
      _id: '3',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    orderItems: [
      {
        name: 'Smartphone',
        qty: 1,
        image: 'https://via.placeholder.com/300',
        price: 699.99,
        product: '2',
      },
    ],
    shippingAddress: {
      address: '456 Oak Ave',
      city: 'New York',
      postalCode: '10001',
      country: 'USA',
    },
    paymentMethod: 'PayPal',
    paymentResult: {
      id: 'pay456',
      status: 'COMPLETED',
      update_time: '2025-05-28T15:45:00Z',
      email_address: 'jane@example.com',
    },
    itemsPrice: 699.99,
    taxPrice: 105.00,
    shippingPrice: 0,
    totalPrice: 804.99,
    isPaid: true,
    paidAt: '2025-05-28T15:45:00Z',
    isDelivered: false,
    deliveredAt: null,
    createdAt: '2025-05-28T14:20:00Z',
  },
];

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // In a real app, we would get the user from the token
  const userId = req.headers.authorization?.split(' ')[1] || '2';
  
  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }

  const order = {
    _id: Date.now().toString(),
    user: {
      _id: userId,
      name: 'John Doe', // In a real app, this would come from the database
      email: 'john@example.com',
    },
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid: false,
    paidAt: null,
    isDelivered: false,
    deliveredAt: null,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  res.status(201).json(order);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', (req, res) => {
  const order = orders.find((o) => o._id === req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
router.put('/:id/pay', (req, res) => {
  const order = orders.find((o) => o._id === req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = new Date().toISOString();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
router.put('/:id/deliver', (req, res) => {
  // In a real app, this would use middleware to verify admin status
  const isAdmin = req.headers.isadmin === 'true';
  
  if (!isAdmin) {
    res.status(401).json({ message: 'Not authorized as an admin' });
    return;
  }

  const order = orders.find((o) => o._id === req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = new Date().toISOString();

    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders', (req, res) => {
  // In a real app, this would use middleware to verify the token
  // and get the user ID from the token
  const userId = req.headers.authorization?.split(' ')[1] || '2';

  const userOrders = orders.filter((o) => o.user._id === userId);
  res.json(userOrders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', (req, res) => {
  // In a real app, this would use middleware to verify admin status
  const isAdmin = req.headers.isadmin === 'true';
  
  if (!isAdmin) {
    res.status(401).json({ message: 'Not authorized as an admin' });
    return;
  }

  res.json(orders);
});

module.exports = router;
