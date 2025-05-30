import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  
  // Redirect if not admin
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);
  
  // Sample statistics for the dashboard
  const stats = {
    totalSales: 15890.75,
    totalOrders: 124,
    totalProducts: 48,
    totalUsers: 87,
    recentOrders: [
      { id: '1001', date: '2025-05-29', total: 129.99, status: 'Delivered' },
      { id: '1002', date: '2025-05-28', total: 259.98, status: 'Processing' },
      { id: '1003', date: '2025-05-27', total: 79.99, status: 'Shipped' },
      { id: '1004', date: '2025-05-26', total: 349.97, status: 'Delivered' },
      { id: '1005', date: '2025-05-25', total: 199.99, status: 'Processing' },
    ],
  };
  
  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Sales
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    ${stats.totalSales.toFixed(2)}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Total Orders
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {stats.totalOrders}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Total Products
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {stats.totalProducts}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-box fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Total Users
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {stats.totalUsers}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Recent Orders</h6>
              <Link to="/admin/orders" className="btn btn-sm btn-primary">
                View All
              </Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>
                          <span
                            className={`badge ${
                              order.status === 'Delivered'
                                ? 'bg-success'
                                : order.status === 'Shipped'
                                ? 'bg-info'
                                : 'bg-warning'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <Link to={`/admin/orders/${order.id}`} className="btn btn-sm btn-info">
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Quick Actions</h6>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to="/admin/products/create" className="btn btn-primary btn-block">
                  <i className="fas fa-plus me-2"></i> Add New Product
                </Link>
                <Link to="/admin/products" className="btn btn-info btn-block">
                  <i className="fas fa-box me-2"></i> Manage Products
                </Link>
                <Link to="/admin/orders" className="btn btn-success btn-block">
                  <i className="fas fa-clipboard-list me-2"></i> Manage Orders
                </Link>
                <Link to="/admin/users" className="btn btn-warning btn-block">
                  <i className="fas fa-users me-2"></i> Manage Users
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
