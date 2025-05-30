import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

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
    },
  ];

  return (
    <div className="container py-5">
      <h1 className="mb-4">Latest Products</h1>
      
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
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {/* Use sample products for development, replace with actual products from API in production */}
          {sampleProducts.map((product) => (
            <div className="col" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
