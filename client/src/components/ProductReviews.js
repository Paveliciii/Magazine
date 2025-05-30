
import React, { useState } from 'react';

const ProductReviews = ({ productId, reviews = [] }) => {
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: ''
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement review submission
    console.log('New review:', newReview);
    setShowForm(false);
    setNewReview({ rating: 5, title: '', comment: '' });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="product-reviews mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Customer Reviews</h4>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          Write Review
        </button>
      </div>

      {showForm && (
        <div className="review-form card mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <select 
                  className="form-select"
                  value={newReview.rating}
                  onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                >
                  {[5,4,3,2,1].map(num => (
                    <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={newReview.title}
                  onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Review</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success me-2">Submit Review</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review._id} className="review-item card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="mb-1">{review.title}</h6>
                  <div className="stars">{renderStars(review.rating)}</div>
                </div>
                <small className="text-muted">{new Date(review.createdAt).toLocaleDateString()}</small>
              </div>
              <p className="mb-2">{review.comment}</p>
              <small className="text-muted">By {review.user.name}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
