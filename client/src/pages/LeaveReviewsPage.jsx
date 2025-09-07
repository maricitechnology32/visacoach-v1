import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReview } from '../services/reviewService';
import StarRating from '../components/StarRating';

const LeaveReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) {
      setError('Please provide a star rating and a comment.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      await createReview({ rating, comment });
      alert('Thank you! Your review has been submitted for approval.');
      navigate('/'); // Navigate back to landing page on success
    } catch (err) {
      setError(err.message || 'Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Leave a Review</h1>
        <p className="text-gray-600 mb-6">Share your experience with the platform to help others.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating</label>
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience..."
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 h-32 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveReviewPage;