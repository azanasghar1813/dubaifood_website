import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';

const superCategories = [
  { id: 'fastfood', label: '🍔 Fast Food & Pizza', categories: ['Pizza', 'Premium Pizza', 'Square Pizza', 'Burgers', 'Pratha Rolls', 'Special Rolls', 'Pasta', 'Appetizers', 'Sandwich', 'Shawarma', 'Starters', 'Soups', 'Broast'] },
  { id: 'desi', label: '🍗 Desi & Bar B-Q', categories: ['Mutton', 'Beef', 'Bar B-Q', 'Tandoor', 'Salads', 'Chicken'] },
  { id: 'chinese', label: '🍜 Chinese & Rice', categories: ['Rices', 'Chinies Gravy', 'Noodles'] },
  { id: 'drinks', label: '🍹 Drinks & Desserts', categories: ['Special Drinks', 'Hot & Cold', 'Special Ice Cream Flavors'] }
];

const filtersList = ['All', 'Spicy', 'Veg', 'Chicken', 'Beef'];

const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('fastfood');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await axios.get('https://dubaifood.onrender.com/api/products');
        setMenuData(data);
      } catch (error) {
        toast.error('Failed to load menu');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const handleAddToCart = (item, size = null, price) => {
    dispatch(addToCart({ ...item, size: size?.name, price, qty: 1 }));
    toast.success(`${item.name} added to cart!`);
  };

  const filteredMenuData = useMemo(() => {
    let activeSuperCategory = superCategories.find(c => c.id === activeTab);
    if (!activeSuperCategory) return [];

    let processedData = menuData.filter(group => activeSuperCategory.categories.includes(group.category.name));

    return processedData.map(group => {
      let filteredItems = group.items;

      // Apply Search
      if (searchQuery) {
        filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      // Apply Filters (Simulated logic based on name since we don't have tags in db right now)
      if (activeFilter !== 'All') {
        filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(activeFilter.toLowerCase()) || (item.description && item.description.toLowerCase().includes(activeFilter.toLowerCase())));
      }

      return { ...group, items: filteredItems };
    }).filter(group => group.items.length > 0);
  }, [menuData, activeTab, searchQuery, activeFilter]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-50">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-secondary text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600')] bg-cover bg-center"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight">Our Delicious Menu</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Find exactly what you're craving.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20 mb-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center border border-gray-100">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search burgers, pizzas..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto hide-scrollbar pb-2 md:pb-0">
            <div className="flex items-center gap-2 text-gray-500 font-bold px-3 border-r border-gray-200 shrink-0">
              <SlidersHorizontal className="w-5 h-5" /> Filters
            </div>
            {filtersList.map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeFilter === filter ? 'bg-secondary text-primary shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Sticky Tabs Navbar */}
        <div className="bg-white rounded-2xl shadow-sm p-2 mb-12 flex overflow-x-auto hide-scrollbar sticky top-20 z-30 border border-gray-100">
          {superCategories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSearchQuery(''); }}
              className={`flex-1 whitespace-nowrap px-6 py-4 rounded-xl text-sm md:text-base font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary text-secondary shadow-md'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + searchQuery + activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredMenuData.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
                {(searchQuery || activeFilter !== 'All') && (
                  <button onClick={() => { setSearchQuery(''); setActiveFilter('All'); }} className="mt-6 text-primary font-bold hover:underline">
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              filteredMenuData.map((categoryGroup) => (
                <div key={categoryGroup.category._id} className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-black text-secondary tracking-tight">
                      {categoryGroup.category.name}
                    </h2>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryGroup.items.map((item) => (
                      <motion.div 
                        whileHover={{ y: -5 }}
                        key={item._id} 
                        className="card flex flex-col justify-between group"
                      >
                        <div className="p-5">
                          <div className="h-48 bg-gray-50 rounded-2xl mb-5 flex items-center justify-center text-6xl overflow-hidden relative border border-gray-100">
                            {/* Fallback emoji logic based on tab */}
                            {activeTab === 'fastfood' && '🍔'}
                            {activeTab === 'desi' && '🍲'}
                            {activeTab === 'chinese' && '🍜'}
                            {activeTab === 'drinks' && '🥤'}
                            
                            <div className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm duration-300">
                              <span className="text-secondary bg-primary px-4 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                View Details
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <h3 className="text-lg font-black text-gray-900 leading-tight">{item.name}</h3>
                            {!item.sizes?.length && (
                              <span className="font-black text-accent text-lg shrink-0">Rs.{item.price}</span>
                            )}
                          </div>
                          
                          {item.description && <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{item.description}</p>}
                        </div>
                        
                        <div className="px-5 pb-5 pt-0 mt-auto">
                          {item.sizes && item.sizes.length > 0 ? (
                            <div className="space-y-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Select Size:</p>
                              <div className="flex flex-col gap-2">
                                {item.sizes.map((size, idx) => (
                                  <button 
                                    key={idx}
                                    onClick={() => handleAddToCart(item, size, size.price)}
                                    className="bg-white border border-gray-200 hover:border-primary hover:bg-primary/5 px-4 py-2.5 rounded-lg transition-all flex justify-between items-center group/btn shadow-sm"
                                  >
                                    <span className="text-gray-700 font-bold text-sm">{size.name}</span>
                                    <div className="flex items-center gap-3">
                                      <span className="font-black text-secondary">Rs.{size.price}</span>
                                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-secondary transition-colors">
                                        <Plus className="w-4 h-4" />
                                      </div>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleAddToCart(item, null, item.price)}
                              className="w-full bg-secondary text-primary font-black py-3.5 rounded-xl hover:bg-gray-900 transition-colors shadow-lg flex items-center justify-center gap-2"
                            >
                              Add to Cart <Plus className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Menu;
