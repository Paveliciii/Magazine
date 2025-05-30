
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrder({
        _id: id,
        user: {
          name: 'John Doe',
          email: 'john@example.com'
        },
        orderItems: [
          {
            _id: '1',
            name: 'Wireless Headphones',
            qty: 1,
            price: 129.99,
            image: 'https://via.placeholder.com/80'
          }
        ],
        shippingAddress: {
          address: '123 Main St',
          city: 'Boston',
          postalCode: '02108',
          country: 'USA'
        },
        paymentMethod: 'PayPal',
        paymentResult: {
          id: 'pay123',
          status: 'COMPLETED',
          email_address: 'john@example.com'
        },
        itemsPrice: 129.99,
        taxPrice: 19.50,
        shippingPrice: 0,
        totalPrice: 149.49,
        isPaid: true,
        paidAt: '2024-05-29T10:15:00Z',
        isDelivered: true,
        deliveredAt: '2024-05-30T14:20:00Z',
        createdAt: '2024-05-29T09:30:00Z'
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          Order not found
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Link to="/profile" className="btn btn-light mb-4">
        <i className="fas fa-arrow-left me-2"></i> Back to Profile
      </Link>

      <h2 className="mb-4">Order #{order._id}</h2>

      <div className="row">
        <div className="col-md-8">
          <div className="card shadow mb-4">
            <div className="card-header">
              <h5 className="mb-0">Shipping Information</h5>
            </div>
            <div className="card-body">
              <p><strong>Name:</strong> {order.user.name}</p>
              <p><strong>Email:</strong> {order.user.email}</p>
              <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
              {order.isDelivered ? (
                <div className="alert alert-success" role="alert">
                  Delivered on {formatDate(order.deliveredAt)}
                </div>
              ) : (
                <div className="alert alert-warning" role="alert">
                  Not Delivered
                </div>
              )}
            </div>
          </div>

          <div className="card shadow mb-4">
            <div className="card-header">
              <h5 className="mb-0">Payment Method</h5>
            </div>
            <div className="card-body">
              <p><strong>Method:</strong> {order.paymentMethod}</p>
              {order.isPaid ? (
                <div className="alert alert-success" role="alert">
                  Paid on {formatDate(order.paidAt)}
                </div>
              ) : (
                <div className="alert alert-danger" role="alert">
                  Not Paid
                </div>
              )}
            </div>
          </div>

          <div className="card shadow">
            <div className="card-header">
              <h5 className="mb-0">Order Items</h5>
            </div>
            <div className="card-body">
              {order.orderItems.map((item) => (
                <div key={item._id} className="row align-items-center mb-3">
                  <div className="col-md-2">
                    <img src={item.image} alt={item.name} className="img-fluid rounded" />
                  </div>
                  <div className="col-md-6">
                    <Link to={`/product/${item._id}`} className="text-decoration-none">
                      {item.name}
                    </Link>
                  </div>
                  <div className="col-md-4 text-end">
                    {item.qty} x ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-header">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Items:</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>${order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong>${order.totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
