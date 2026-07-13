import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, X } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const AdminFeatured = () => {
  const [featuredDeals, setFeaturedDeals] = useState([]);
  const [featuredMenuItems, setFeaturedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const [dealsRes, itemsRes] = await Promise.all([
        axios.get(`${API_URL}/public/deals`),
        axios.get(`${API_URL}/public/menuitems`)
      ]);
      
      if (dealsRes.data) {
        setFeaturedDeals(dealsRes.data.filter(d => d.isFeatured));
      }
      if (itemsRes.data) {
        setFeaturedMenuItems(itemsRes.data.filter(m => m.isFeatured));
      }
    } catch (err) {
      toast.error('Failed to load featured items from database');
    } finally {
      setLoading(false);
    }
  };

  const handleUnfeature = async (id, type) => {
    if (window.confirm(`Are you sure you want to remove this ${type} from the featured list?`)) {
      setIsUpdating(true);
      try {
        const formData = new FormData();
        formData.append('isFeatured', 'false');
        
        if (type === 'deal') {
          await axios.put(`${API_URL}/admin/deals/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } else {
          await axios.put(`${API_URL}/admin/menuitems/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }
        toast.success(`Successfully removed from featured!`);
        fetchFeatured();
      } catch (err) {
        toast.error('Failed to unfeature item');
      } finally {
        setIsUpdating(false);
      }
    }
  };

  if (loading) return <div className="text-center py-20">Loading Featured Overview...</div>;

  return (
    <div>
      <div className="mb-8 bg-primary/10 border border-primary/20 p-6 rounded-2xl flex items-center gap-4">
        <Star className="text-primary w-12 h-12" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Featured Dashboard</h1>
        </div>
      </div>

      <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
        Featured Deals <span className="text-sm font-bold bg-gray-200 text-gray-600 px-3 py-1 rounded-full">{featuredDeals.length}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {featuredDeals.length === 0 ? (
          <p className="text-gray-500 col-span-full">No featured deals. Mark a deal as featured in the Deals tab.</p>
        ) : featuredDeals.map((deal) => (
          <div key={deal._id} className="bg-white rounded-2xl shadow-sm border border-yellow-300 overflow-hidden relative">
            <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow z-10 flex items-center gap-1">
              <Star size={12} fill="currentColor" /> Deal
            </div>
            <button 
              onClick={() => handleUnfeature(deal._id, 'deal')}
              disabled={isUpdating}
              className="absolute top-2 right-2 bg-white/90 text-red-500 p-2 rounded-full shadow hover:bg-red-50 transition-colors z-10 disabled:opacity-50"
              title="Remove from featured"
            >
              <X size={16} />
            </button>
            <div className="h-40 bg-gray-100 relative">
              {deal.images && deal.images.length > 0 ? (
                <img src={deal.images[0].url} alt={deal.dealNumber} className="w-full h-full object-cover" />
              ) : deal.image ? (
                <img src={deal.image} alt={deal.dealNumber} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-yellow-50 text-3xl">🔥</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{deal.dealNumber}</h3>
              {deal.name && <p className="text-sm text-gray-500 mb-2 truncate">{deal.name}</p>}
              <p className="text-primary font-black">Rs. {deal.price}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
        Featured Menu Items <span className="text-sm font-bold bg-gray-200 text-gray-600 px-3 py-1 rounded-full">{featuredMenuItems.length}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredMenuItems.length === 0 ? (
          <p className="text-gray-500 col-span-full">No featured menu items. Mark an item as featured in the Menu Items tab.</p>
        ) : featuredMenuItems.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-yellow-300 overflow-hidden relative">
            <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow z-10 flex items-center gap-1">
              <Star size={12} fill="currentColor" /> Menu Item
            </div>
            <button 
              onClick={() => handleUnfeature(item._id, 'menuitem')}
              disabled={isUpdating}
              className="absolute top-2 right-2 bg-white/90 text-red-500 p-2 rounded-full shadow hover:bg-red-50 transition-colors z-10 disabled:opacity-50"
              title="Remove from featured"
            >
              <X size={16} />
            </button>
            <div className="h-40 bg-gray-100 relative">
              {item.images && item.images.length > 0 ? (
                <img src={item.images[0].url} alt={item.name} className="w-full h-full object-cover" />
              ) : item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-3xl">🍔</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1 truncate">{item.name}</h3>
              <p className="text-xs text-gray-500 mb-2 bg-gray-100 inline-block px-2 py-1 rounded">{item.category}</p>
              <p className="text-primary font-black">
                Rs. {item.sizes?.length ? item.sizes[0].price : item.price}
                {item.sizes?.length > 0 && <span className="text-xs text-gray-400 font-normal ml-1">starting</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFeatured;
