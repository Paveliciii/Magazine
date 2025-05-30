import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Products = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  
  // State for product management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  // Redirect if not admin
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);
  
  // Sample products for the admin panel
  useEffect(() => {
    // This would be replaced with an API call in a real application
    setProducts([
      {
        _id: '1',
        name: 'Wireless Headphones',
        price: 129.99,
        category: 'Electronics',
        brand: 'AudioTech',
        countInStock: 10,
        numReviews: 12,
        rating: 4.5,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        _id: '2',
        name: 'Smartphone',
        price: 699.99,
        category: 'Electronics',
        brand: 'TechGiant',
        countInStock: 7,
        numReviews: 24,
        rating: 4.8,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        _id: '3',
        name: 'Laptop',
        price: 1299.99,
        category: 'Electronics',
        brand: 'ComputerPro',
        countInStock: 5,
        numReviews: 18,
        rating: 4.7,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        _id: '4',
        name: 'Smartwatch',
        price: 199.99,
        category: 'Electronics',
        brand: 'WearableTech',
        countInStock: 15,
        numReviews: 9,
        rating: 4.2,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        _id: '5',
        name: 'Wireless Earbuds',
        price: 89.99,
        category: 'Electronics',
        brand: 'AudioTech',
        countInStock: 20,
        numReviews: 14,
        rating: 4.4,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        _id: '6',
        name: 'Digital Camera',
        price: 849.99,
        category: 'Electronics',
        brand: 'PhotoMaster',
        countInStock: 3,
        numReviews: 7,
        rating: 4.6,
        imageUrl: 'https://via.placeholder.com/150',
      },
    ]);
  }, []);
  
  // Delete product handler
  const deleteHandler = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };
  
  const confirmDelete = () => {
    // This would be replaced with an API call in a real application
    setProducts(products.filter(product => product._id !== productToDelete));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };
  
  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Products</h1>
        <Link to="/admin/products/create" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i> Create Product
        </Link>
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
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                          {product.countInStock > 0 ? (
                            <span className="badge bg-success">{product.countInStock}</span>
                          ) : (
                            <span className="badge bg-danger">Out of stock</span>
                          )}
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/admin/products/${product._id}/edit`} 
                              className="btn btn-sm btn-info me-1"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteHandler(product._id)}
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
                    <p>Are you sure you want to delete this product?</p>
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
            </div>
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

export default Products;
