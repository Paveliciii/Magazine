import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Calculate prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  const updateCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-shopping-cart fa-4x mb-3 text-muted"></i>
          <h2 className="mb-3">Your cart is empty</h2>
          <p className="mb-4">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <div className="list-group mb-4">
              {cartItems.map((item) => (
                <div key={item.product} className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-3">
                      <Link to={`/product/${item.product}`} className="text-decoration-none">
                        {item.name}
                      </Link>
                    </div>
                    <div className="col-md-2">${item.price.toFixed(2)}</div>
                    <div className="col-md-2">
                      <select
                        className="form-select"
                        value={item.qty}
                        onChange={(e) =>
                          updateCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-2 text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/" className="btn btn-outline-primary">
              <i className="fas fa-arrow-left me-2"></i>
              Continue Shopping
            </Link>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}):</span>
                  <span>${itemsPrice.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>${shippingPrice.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span>${taxPrice}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total:</strong>
                  <strong>${totalPrice}</strong>
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
