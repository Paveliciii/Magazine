import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress, savePaymentMethod } from '../redux/slices/cartSlice';
import { createOrder, resetOrder } from '../redux/slices/orderSlice';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const { loading, success, error } = useSelector((state) => state.orders);
  
  // Form states
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || '',
    paymentMethod: paymentMethod || 'PayPal',
  });
  
  // Calculate prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitShippingAddress = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      })
    );
    setStep(2);
  };

  const submitPaymentMethod = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(formData.paymentMethod));
    setStep(3);
  };

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  // If order is successful, redirect to order confirmation
  React.useEffect(() => {
    if (success) {
      navigate('/order-success');
      dispatch(resetOrder());
    }
  }, [success, navigate, dispatch]);

  return (
    <div className="container py-5">
      <div className="checkout-progress mb-5">
        <div className="row">
          <div className="col-md-4">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-text">Shipping</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-text">Payment</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-text">Place Order</div>
            </div>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="shipping-step">
          <h2 className="mb-4">Shipping Information</h2>
          <form onSubmit={submitShippingAddress}>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postalCode" className="form-label">Postal Code</label>
              <input
                type="text"
                className="form-control"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Continue to Payment
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="payment-step">
          <h2 className="mb-4">Payment Method</h2>
          <form onSubmit={submitPaymentMethod}>
            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="paypal"
                  value="PayPal"
                  checked={formData.paymentMethod === 'PayPal'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="paypal">
                  PayPal or Credit Card
                </label>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="stripe"
                  value="Stripe"
                  checked={formData.paymentMethod === 'Stripe'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="stripe">
                  Stripe
                </label>
              </div>
            </div>
            <div className="d-flex">
              <button 
                type="button" 
                className="btn btn-outline-secondary me-2"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button type="submit" className="btn btn-primary">
                Continue to Review
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="order-review">
          <h2 className="mb-4">Order Summary</h2>
          
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Shipping</h5>
            </div>
            <div className="card-body">
              <p className="mb-0">
                <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </div>
          </div>
          
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Payment Method</h5>
            </div>
            <div className="card-body">
              <p className="mb-0">
                <strong>Method:</strong> {paymentMethod}
              </p>
            </div>
          </div>
          
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Order Items</h5>
            </div>
            <div className="card-body">
              <div className="list-group">
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
                      <div className="col-md-6">{item.name}</div>
                      <div className="col-md-4 text-end">
                        {item.qty} x ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Items:</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>${shippingPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong>${totalPrice}</strong>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          <div className="d-flex">
            <button 
              type="button" 
              className="btn btn-outline-secondary me-2"
              onClick={() => setStep(2)}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={loading || cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : (
                'Place Order'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
