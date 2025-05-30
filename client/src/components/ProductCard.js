import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 product-card">
      <Link to={`/product/${product._id}`}>
        <img 
          src={product.imageUrl} 
          className="card-img-top product-image" 
          alt={product.name} 
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <h5 className="card-title product-name">{product.name}</h5>
        </Link>
        <div className="ratings mb-2">
          <span className="text-warning">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={
                  i < Math.floor(product.rating) 
                    ? "fas fa-star" 
                    : i < product.rating 
                    ? "fas fa-star-half-alt" 
                    : "far fa-star"
                }
              ></i>
            ))}
          </span>
          <span className="ms-2 text-muted">({product.numReviews} reviews)</span>
        </div>
        <p className="card-text product-price mb-2">${product.price.toFixed(2)}</p>
        <p className="card-text text-muted mb-3">
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>
        <div className="mt-auto">
          <Link to={`/product/${product._id}`} className="btn btn-primary w-100">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
