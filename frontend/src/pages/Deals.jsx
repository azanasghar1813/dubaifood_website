import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data } = await axios.get('https://dubaifood.onrender.com/api/deals');
        setDeals(data);
      } catch (error) {
        toast.error('Failed to load deals');
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const handleAddToCart = (deal) => {
    dispatch(addToCart({ ...deal, name: deal.dealNumber + (deal.name ? ` - ${deal.name}` : ''), qty: 1 }));
    toast.success(`${deal.dealNumber} added to cart!`);
  };

  if (loading) return <div className="text-center py-20 text-xl font-bold">Loading Deals...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4 text-accent">Exclusive Deals</h1>
      <p className="text-center text-gray-500 mb-12">Grab these amazing offers before they expire!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {deals.map((deal) => (
          <div key={deal._id} className="card border-2 border-primary p-4 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 bg-accent text-white px-3 py-1 font-bold rounded-bl-lg">
              {deal.dealNumber}
            </div>
            
            <div className="h-40 bg-yellow-50 rounded-xl mb-4 mt-6 flex items-center justify-center text-5xl">
              🔥
            </div>
            
            <div className="flex-grow">
              {deal.name && <h3 className="font-bold text-lg mb-2">{deal.name}</h3>}
              <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc pl-5">
                {deal.includedItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-auto border-t pt-4 flex justify-between items-center">
              <span className="text-2xl font-bold text-accent">Rs. {deal.price}/-</span>
              <button 
                onClick={() => handleAddToCart(deal)}
                className="btn-primary text-sm px-4 py-2"
              >
                Add Deal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;
