import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/reviews`);
      setReviews(res.data);
    } catch (err) {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`${API_URL}/admin/reviews/${id}`);
        toast.success('Review deleted');
        fetchReviews();
      } catch (err) {
        toast.error('Failed to delete review');
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Review Management</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Customer Name</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Rating</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Comment</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="4" className="py-4 px-6 text-center text-gray-500">Loading reviews...</td></tr>
              ) : reviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-gray-900">{review.name}</td>
                  <td className="py-4 px-6 font-bold text-yellow-500">{"★".repeat(review.rating)}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{review.comment}</td>
                  <td className="py-4 px-6">
                    <button 
                      onClick={() => handleDelete(review._id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
