
import React, { useState } from 'react';

const ProductFilter = ({ onFilter, categories = [] }) => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'name'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="product-filter mb-4">
      <div className="row g-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            name="search"
            value={filters.search}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            name="category"
            value={filters.category}
            onChange={handleChange}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="home">Home & Garden</option>
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min Price"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Max Price"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
