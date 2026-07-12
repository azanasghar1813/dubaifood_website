import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/public/reviews');
        setReviews(data);
      } catch (err) {
        toast.error('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-secondary text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4">Customer Reviews</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          See what our lovely customers have to say about us.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-7xl mt-16">
        
        {/* Stats Summary */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-6xl font-black text-gray-900">4.8</h2>
            <div className="flex gap-1 justify-center my-2 text-primary">
              <Star className="fill-primary w-5 h-5" />
              <Star className="fill-primary w-5 h-5" />
              <Star className="fill-primary w-5 h-5" />
              <Star className="fill-primary w-5 h-5" />
              <Star className="fill-primary w-5 h-5" />
            </div>
            <p className="text-gray-500 font-medium">Based on 120+ reviews</p>
          </div>
          <div className="hidden md:block w-px h-24 bg-gray-200"></div>
          <div className="flex flex-col gap-2 w-full md:w-64">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-3 font-bold text-gray-600">{star}</span>
                <Star className="w-4 h-4 text-primary fill-primary" />
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '5%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <motion.div 
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-1 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-primary' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{review.comment}"</p>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <h4 className="font-bold text-gray-900">{review.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
