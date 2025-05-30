import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Sample products for development
  const sampleProducts = [
    {
      _id: '1',
      name: 'Wireless Headphones',
      imageUrl: 'https://via.placeholder.com/300',
      description: 'High-quality wireless headphones with noise cancellation.',
      price: 129.99,
      rating: 4.5,
      numReviews: 12,
      countInStock: 10,
      category: 'Electronics'
    },
    {
      _id: '2',
      name: 'Smartphone',
      imageUrl: 'https://via.placeholder.com/300',
      description: 'Latest smartphone with advanced camera and long battery life.',
      price: 699.99,
      rating: 4.8,
      numReviews: 24,
      countInStock: 7,
      category: 'Electronics'
    },
    {
      _id: '3',
      name: 'Laptop',
      imageUrl: 'https://via.placeholder.com/300',
      description: 'Powerful laptop for work and gaming with high-performance specs.',
      price: 1299.99,
      rating: 4.7,
      numReviews: 18,
      countInStock: 5,
      category: 'Electronics'
    },
    {
      _id: '4',
      name: 'Smartwatch',
      imageUrl: 'https://via.placeholder.com/300',
      description: 'Feature-rich smartwatch with health monitoring and notifications.',
      price: 199.99,
      rating: 4.2,
      numReviews: 9,
      countInStock: 15,
      category: 'Electronics'
    },
    {
      _id: '5',
      name: 'Wireless Earbuds',
      imageUrl: 'https://via.placeholder.com/300',
      description: 'Compact wireless earbuds with great sound quality and long battery life.',
      price: 89.99,
      rating: 4.4,
      numReviews: 14,
      countInStock: 20,
      category: 'Electronics'
    },
    {
      _id: '6',
      name: 'Digital Camera',
      imageUrl: 'https://via.placeholder.com/300',
      description: 'Professional digital camera with high-resolution sensor and multiple lenses.',
      price: 849.99,
      rating: 4.6,
      numReviews: 7,
      countInStock: 3,
      category: 'Electronics'
    },
  ];

  const categories = [...new Set(sampleProducts.map(product => product.category))];

  const filteredProducts = sampleProducts.filter(product => {
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory ? product.category === selectedCategory : true;
    const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;

    return searchMatch && categoryMatch && priceMatch;
  });

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Featured Products</h1>

      {/* Search and Filter Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <div className="d-flex align-items-center">
            <label className="form-label me-2 mb-0">Price:</label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="2000"
              value={priceRange.max}
              onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
            />
            <span className="ms-2">${priceRange.max}</span>
          </div>
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
              setPriceRange({ min: 0, max: 2000 });
            }}
          >
            Clear
          </button>
        </div>
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
          <div className="mb-3">
            <span className="text-muted">Showing {filteredProducts.length} products</span>
          </div>
          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="text-muted">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;