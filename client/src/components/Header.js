import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            E-Shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <i className="fas fa-shopping-cart"></i> Cart
                  {cartItems.length > 0 && (
                    <span className="badge bg-danger ms-1">{getCartCount()}</span>
                  )}
                </Link>
              </li>
              <li className="nav-item dropdown">
                
                  <div className="dropdown">
                    <button 
                      className="btn btn-link nav-link dropdown-toggle" 
                      type="button" 
                      id="userDropdown" 
                      data-bs-toggle="dropdown"
                    >
                      <i className="fas fa-user me-1"></i> Account
                    </button>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/login">Login</Link></li>
                      <li><Link className="dropdown-item" to="/register">Register</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                      <li><Link className="dropdown-item" to="/admin">Admin Panel</Link></li>
                    </ul>
                  </div>
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;