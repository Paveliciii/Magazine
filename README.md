# E-Commerce Store

A complete e-commerce solution with product catalog, shopping cart, checkout process, and admin panel.

## Features

- **Product Catalog**: Browse products with details
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout Process**: Shipping, payment, and order confirmation
- **User Authentication**: Register, login, and profile management
- **Admin Panel**: Manage products, orders, and users

## Tech Stack

### Frontend
- React
- Redux Toolkit for state management
- React Router for navigation
- Bootstrap for styling

### Backend
- Node.js
- Express.js
- JWT for authentication

## Project Structure

```
e-commerce-store/
├── client/                # Frontend React application
│   ├── public/            # Static files
│   └── src/               # React source code
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       │   └── admin/     # Admin panel pages
│       ├── redux/         # Redux store and slices
│       └── utils/         # Utility functions
└── server/                # Backend Node.js/Express application
    ├── routes/            # API routes
    └── server.js          # Express server setup
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd e-commerce-store
   ```

2. Install backend dependencies
   ```
   cd server
   npm install
   ```

3. Install frontend dependencies
   ```
   cd ../client
   npm install
   ```

### Running the Application

1. Start the backend server
   ```
   cd server
   npm start
   ```

2. Start the frontend development server
   ```
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create a product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Users
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin only)

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (admin only)
- `GET /api/orders/myorders` - Get logged in user orders
- `GET /api/orders` - Get all orders (admin only)

### Cart
- `POST /api/cart` - Add item to cart
- `GET /api/cart/:userId` - Get user cart
- `DELETE /api/cart/:userId/:productId` - Remove item from cart
- `PUT /api/cart/:userId/:productId` - Update cart item quantity
- `DELETE /api/cart/:userId` - Clear cart

## Demo Accounts

For testing purposes, you can use the following accounts:

- Admin User:
  - Email: admin@example.com
  - Password: 123456

- Customer:
  - Email: john@example.com
  - Password: 123456
