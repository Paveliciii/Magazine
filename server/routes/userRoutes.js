const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sample users data (would typically come from a database)
let users = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    _id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    _id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'abc123', {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (user && bcrypt.compareSync(password, user.password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  const userExists = users.find((u) => u.email === email);

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const newUser = {
    _id: Date.now().toString(),
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    isAdmin: false,
  };

  users.push(newUser);

  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    token: generateToken(newUser._id),
  });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', (req, res) => {
  // In a real app, this would use middleware to verify the token
  // and get the user ID from the token
  const userId = req.headers.authorization?.split(' ')[1];
  
  if (!userId) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }

  const user = users.find((u) => u._id === userId);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', (req, res) => {
  // In a real app, this would use middleware to verify the token
  // and get the user ID from the token
  const userId = req.headers.authorization?.split(' ')[1];
  
  if (!userId) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }

  const userIndex = users.findIndex((u) => u._id === userId);

  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      name: req.body.name || users[userIndex].name,
      email: req.body.email || users[userIndex].email,
      password: req.body.password 
        ? bcrypt.hashSync(req.body.password, 10) 
        : users[userIndex].password,
    };

    res.json({
      _id: users[userIndex]._id,
      name: users[userIndex].name,
      email: users[userIndex].email,
      isAdmin: users[userIndex].isAdmin,
      token: generateToken(users[userIndex]._id),
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get('/', (req, res) => {
  // In a real app, this would use middleware to verify admin status
  const isAdmin = req.headers.isadmin === 'true';
  
  if (!isAdmin) {
    res.status(401).json({ message: 'Not authorized as an admin' });
    return;
  }

  res.json(users.map(user => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  })));
});

module.exports = router;
