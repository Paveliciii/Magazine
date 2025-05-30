
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Users = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Redirect if not admin
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  // Sample users data
  useEffect(() => {
    setUsers([
      {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        isAdmin: false,
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        _id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        isAdmin: false,
        createdAt: '2024-02-20T14:15:00Z'
      },
      {
        _id: '3',
        name: 'Admin User',
        email: 'admin@example.com',
        isAdmin: true,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        _id: '4',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        isAdmin: false,
        createdAt: '2024-03-10T09:45:00Z'
      }
    ]);
  }, []);

  const deleteUserHandler = (id) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(user => user._id !== userToDelete));
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const toggleAdminStatus = (id) => {
    setUsers(users.map(user => 
      user._id === id ? { ...user, isAdmin: !user.isAdmin } : user
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Users Management</h1>
      </div>

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
        <>
          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Admin</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.isAdmin ? (
                            <span className="badge bg-success">Admin</span>
                          ) : (
                            <span className="badge bg-secondary">User</span>
                          )}
                        </td>
                        <td>{formatDate(user.createdAt)}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              className={`btn btn-sm ${user.isAdmin ? 'btn-warning' : 'btn-success'} me-1`}
                              onClick={() => toggleAdminStatus(user._id)}
                            >
                              {user.isAdmin ? (
                                <i className="fas fa-user-minus"></i>
                              ) : (
                                <i className="fas fa-user-shield"></i>
                              )}
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteUserHandler(user._id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Delete</h5>
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setShowDeleteModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to delete this user?</p>
                    <p>This action cannot be undone.</p>
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-danger" 
                      onClick={confirmDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          )}

          {/* Modal Backdrop */}
          {showDeleteModal && (
            <div className="modal-backdrop fade show"></div>
          )}
        </>
      )}
    </div>
  );
};

export default Users;
