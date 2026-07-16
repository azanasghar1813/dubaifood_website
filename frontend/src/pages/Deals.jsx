import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';
import ImageSlider from '../components/ImageSlider';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('dealNumber');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/public/deals');
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

  const sortedDeals = [...deals].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    if (sortBy === 'dealNumber') {
      const numA = a.dealNumber ? parseInt(String(a.dealNumber).replace(/\D/g, '')) || 0 : 0;
      const numB = b.dealNumber ? parseInt(String(b.dealNumber).replace(/\D/g, '')) || 0 : 0;
      
      // If both have the same number (e.g. 0), sort alphabetically
      if (numA === numB) {
        return String(a.dealNumber || '').localeCompare(String(b.dealNumber || ''));
      }
      return numA - numB;
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4 text-accent">Exclusive Deals</h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4 max-w-7xl mx-auto">
        <p className="text-center sm:text-left text-gray-500">Grab these amazing offers before they expire!</p>
        
        <div className="relative w-full sm:w-auto">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-56 appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium text-gray-700 shadow-sm cursor-pointer"
          >
            <option value="dealNumber">Sort by Deal Number</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {sortedDeals.map((deal) => (
          <div key={deal._id} className="card border md:border-2 border-primary p-2 md:p-4 relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 right-0 bg-accent text-white px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-sm font-bold rounded-bl-lg">
              {deal.dealNumber}
            </div>
            
            <div className="h-24 md:h-40 bg-yellow-50 rounded-lg md:rounded-xl mb-2 md:mb-4 mt-6 flex items-center justify-center text-3xl md:text-5xl overflow-hidden relative">
              {(deal.images && deal.images.length > 0) ? (
                <ImageSlider images={deal.images} interval={2500 + Math.random() * 2000} />
              ) : deal.image ? (
                <img src={deal.image} alt={deal.dealNumber} className="w-full h-full object-cover" />
              ) : (
                '🔥'
              )}
            </div>
            
            <div className="flex-grow">
              {deal.name && <h3 className="font-bold text-xs md:text-lg mb-1 md:mb-2">{deal.name}</h3>}
              <ul className="text-[10px] md:text-sm text-gray-600 space-y-0.5 md:space-y-1 mb-2 md:mb-4 list-disc pl-4 md:pl-5">
                {deal.includedItems.map((item, idx) => (
                  <li key={idx} className="leading-tight">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-auto border-t pt-2 md:pt-4 flex flex-col xl:flex-row justify-between items-center gap-2 md:gap-0">
              <span className="text-sm md:text-2xl font-bold text-accent shrink-0">Rs. {deal.price}</span>
              <button 
                onClick={() => handleAddToCart(deal)}
                className="w-full xl:w-auto btn-primary text-[10px] md:text-sm px-2 py-1.5 md:px-4 md:py-2 flex items-center justify-center gap-1 shrink-0"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;
