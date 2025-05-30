
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    name: userInfo?.name || '',
    email: userInfo?.email || '',
    password: '',
    confirmPassword: ''
  });
  
  const [orders] = useState([
    {
      _id: '1001',
      createdAt: '2024-05-29T10:15:00Z',
      totalPrice: 149.49,
      isPaid: true,
      isDelivered: true,
      deliveredAt: '2024-05-30T14:20:00Z'
    },
    {
      _id: '1002',
      createdAt: '2024-05-25T15:30:00Z',
      totalPrice: 259.98,
      isPaid: true,
      isDelivered: false
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setMessage('Profile updated successfully');
      setLoading(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow mb-4">
            <div className="card-header">
              <h5 className="mb-0">Profile Information</h5>
            </div>
            <div className="card-body">
              {message && (
                <div className="alert alert-info" role="alert">
                  {message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Updating...
                    </>
                  ) : (
                    'Update Profile'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header">
              <h5 className="mb-0">My Orders</h5>
            </div>
            <div className="card-body">
              {orders.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No orders found</p>
                  <Link to="/" className="btn btn-primary">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Order ID</th>
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
                          <td>{formatDate(order.createdAt)}</td>
                          <td>${order.totalPrice.toFixed(2)}</td>
                          <td>
                            {order.isPaid ? (
                              <span className="badge bg-success">Paid</span>
                            ) : (
                              <span className="badge bg-danger">Not Paid</span>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              <span className="badge bg-success">
                                Delivered on {formatDate(order.deliveredAt)}
                              </span>
                            ) : (
                              <span className="badge bg-warning">Processing</span>
                            )}
                          </td>
                          <td>
                            <Link
                              to={`/order/${order._id}`}
                              className="btn btn-sm btn-outline-primary"
                            >
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
