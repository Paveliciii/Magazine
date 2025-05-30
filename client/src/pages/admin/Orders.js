import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Orders = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  
  // State for order management
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Redirect if not admin
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);
  
  // Sample orders for the admin panel
  useEffect(() => {
    // This would be replaced with an API call in a real application
    setOrders([
      {
        _id: '1001',
        user: {
          _id: 'u1',
          name: 'John Doe',
        },
        orderItems: [
          {
            name: 'Wireless Headphones',
            qty: 1,
            price: 129.99,
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
          _id: 'u2',
          name: 'Jane Smith',
        },
        orderItems: [
          {
            name: 'Smartphone',
            qty: 1,
            price: 699.99,
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
      {
        _id: '1003',
        user: {
          _id: 'u3',
          name: 'Robert Johnson',
        },
        orderItems: [
          {
            name: 'Wireless Earbuds',
            qty: 1,
            price: 89.99,
          },
        ],
        shippingAddress: {
          address: '789 Pine St',
          city: 'Chicago',
          postalCode: '60601',
          country: 'USA',
        },
        paymentMethod: 'Stripe',
        paymentResult: {
          id: 'pay789',
          status: 'COMPLETED',
          update_time: '2025-05-27T12:30:00Z',
          email_address: 'robert@example.com',
        },
        itemsPrice: 89.99,
        taxPrice: 13.50,
        shippingPrice: 10.00,
        totalPrice: 113.49,
        isPaid: true,
        paidAt: '2025-05-27T12:30:00Z',
        isDelivered: true,
        deliveredAt: '2025-05-29T11:15:00Z',
        createdAt: '2025-05-27T11:10:00Z',
      },
      {
        _id: '1004',
        user: {
          _id: 'u4',
          name: 'Sarah Williams',
        },
        orderItems: [
          {
            name: 'Laptop',
            qty: 1,
            price: 1299.99,
          },
        ],
        shippingAddress: {
          address: '101 Maple Dr',
          city: 'Los Angeles',
          postalCode: '90001',
          country: 'USA',
        },
        paymentMethod: 'PayPal',
        paymentResult: {
          id: 'pay101',
          status: 'COMPLETED',
          update_time: '2025-05-26T09:45:00Z',
          email_address: 'sarah@example.com',
        },
        itemsPrice: 1299.99,
        taxPrice: 195.00,
        shippingPrice: 0,
        totalPrice: 1494.99,
        isPaid: true,
        paidAt: '2025-05-26T09:45:00Z',
        isDelivered: true,
        deliveredAt: '2025-05-28T13:20:00Z',
        createdAt: '2025-05-26T08:30:00Z',
      },
      {
        _id: '1005',
        user: {
          _id: 'u5',
          name: 'Michael Brown',
        },
        orderItems: [
          {
            name: 'Smartwatch',
            qty: 1,
            price: 199.99,
          },
        ],
        shippingAddress: {
          address: '202 Cedar Ln',
          city: 'Dallas',
          postalCode: '75201',
          country: 'USA',
        },
        paymentMethod: 'Stripe',
        paymentResult: {
          id: 'pay202',
          status: 'COMPLETED',
          update_time: '2025-05-25T16:20:00Z',
          email_address: 'michael@example.com',
        },
        itemsPrice: 199.99,
        taxPrice: 30.00,
        shippingPrice: 0,
        totalPrice: 229.99,
        isPaid: true,
        paidAt: '2025-05-25T16:20:00Z',
        isDelivered: false,
        deliveredAt: null,
        createdAt: '2025-05-25T15:10:00Z',
      },
    ]);
  }, []);
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Mark as delivered handler
  const markAsDeliveredHandler = (orderId) => {
    // This would be replaced with an API call in a real application
    setOrders(
      orders.map((order) =>
        order._id === orderId
          ? {
              ...order,
              isDelivered: true,
              deliveredAt: new Date().toISOString(),
            }
          : order
      )
    );
  };
  
  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">Orders</h1>
      
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user.name}</td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? (
                          <span className="badge bg-success">
                            {formatDate(order.paidAt)}
                          </span>
                        ) : (
                          <span className="badge bg-danger">Not Paid</span>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <span className="badge bg-success">
                            {formatDate(order.deliveredAt)}
                          </span>
                        ) : (
                          <span className="badge bg-danger">Not Delivered</span>
                        )}
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            to={`/admin/orders/${order._id}`}
                            className="btn btn-sm btn-info me-1"
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
                          {order.isPaid && !order.isDelivered && (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => markAsDeliveredHandler(order._id)}
                            >
                              <i className="fas fa-check"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
