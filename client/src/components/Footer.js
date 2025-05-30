import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>E-Shop</h5>
            <p>Your one-stop shop for all your needs.</p>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/cart" className="text-light">Cart</a></li>
              <li><a href="/login" className="text-light">Login</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><i className="fas fa-envelope me-2"></i> contact@eshop.com</li>
              <li><i className="fas fa-phone me-2"></i> +1 (123) 456-7890</li>
              <li><i className="fas fa-map-marker-alt me-2"></i> 123 E-Commerce St</li>
            </ul>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="row">
          <div className="col text-center">
            <p className="mb-0">© {new Date().getFullYear()} E-Shop. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
