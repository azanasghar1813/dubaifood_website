import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Reviews = () => {
  // Static reviews for now
  const reviews = [
    { id: 1, name: 'Ali Khan', rating: 5, date: '2 days ago', text: 'Best zinger burger in Chowk Azam! The crunch was amazing and the delivery was super fast.' },
    { id: 2, name: 'Fatima Z.', rating: 5, date: '1 week ago', text: 'Loved their Special Crown Crust Pizza. Highly recommend it to everyone looking for premium taste.' },
    { id: 3, name: 'Usman R.', rating: 4, date: '2 weeks ago', text: 'Good food and nice ambiance. The family deal is totally worth the price.' },
    { id: 4, name: 'Ayesha M.', rating: 5, date: '1 month ago', text: 'Extremely professional service. The WhatsApp ordering is so seamless. Less mistakes, perfect delivery.' },
    { id: 5, name: 'Bilal Ahmed', rating: 5, date: '1 month ago', text: 'Mutton karahi was authentic. Perfect blend of spices. Will definitely order again.' },
    { id: 6, name: 'Sara Q.', rating: 4, date: '2 months ago', text: 'Fries were a bit cold, but the Shawarma was 10/10.' },
  ];

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
              key={review.id}
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
                  <span className="text-xs text-gray-400 font-medium">{review.date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{review.text}"</p>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center">
                  {review.name.charAt(0)}
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
