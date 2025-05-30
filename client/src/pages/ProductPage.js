import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  // Sample product for development
  const sampleProduct = {
    _id: id,
    name: 'Wireless Headphones',
    imageUrl: 'https://via.placeholder.com/600',
    description: 'High-quality wireless headphones with noise cancellation. Features include Bluetooth 5.0, 30-hour battery life, comfortable over-ear design, and premium sound quality with deep bass and crisp highs. Perfect for music lovers, gamers, and professionals who need to focus in noisy environments.',
    price: 129.99,
    rating: 4.5,
    numReviews: 12,
    countInStock: 10,
  };

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        product: sampleProduct._id,
        name: sampleProduct.name,
        image: sampleProduct.imageUrl,
        price: sampleProduct.price,
        countInStock: sampleProduct.countInStock,
        qty,
      })
    );
    navigate('/cart');
  };

  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-light mb-4">
        <i className="fas fa-arrow-left me-2"></i> Back to Products
      </Link>

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
        <div className="row">
          <div className="col-md-6">
            <img
              src={sampleProduct.imageUrl}
              alt={sampleProduct.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">{sampleProduct.name}</h2>
            <div className="d-flex align-items-center mb-3">
              <div className="text-warning me-2">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={
                      i < Math.floor(sampleProduct.rating)
                        ? "fas fa-star"
                        : i < sampleProduct.rating
                        ? "fas fa-star-half-alt"
                        : "far fa-star"
                    }
                  ></i>
                ))}
              </div>
              <span className="text-muted">
                {sampleProduct.numReviews} reviews
              </span>
            </div>
            <h3 className="mb-3">${sampleProduct.price.toFixed(2)}</h3>
            <p className="mb-4">{sampleProduct.description}</p>
            <div className="mb-4">
              <h5>Availability:</h5>
              <p className={sampleProduct.countInStock > 0 ? "text-success" : "text-danger"}>
                {sampleProduct.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            {sampleProduct.countInStock > 0 && (
              <div className="mb-4">
                <h5>Quantity:</h5>
                <select
                  className="form-select w-auto"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                >
                  {[...Array(sampleProduct.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              className="btn btn-primary btn-lg"
              onClick={addToCartHandler}
              disabled={sampleProduct.countInStock === 0}
            >
              <i className="fas fa-shopping-cart me-2"></i>
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
