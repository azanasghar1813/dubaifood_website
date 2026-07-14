import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Plus, X } from 'lucide-react';
import ImageSlider from '../components/ImageSlider';


const MenuItemCard = ({ item, activeTab, handleAddToCart, setSelectedItemForModal }) => {
  const [selectedSize, setSelectedSize] = useState(item.sizes?.length ? item.sizes[0] : null);
  const priceToDisplay = selectedSize ? selectedSize.price : item.price;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card flex flex-col justify-between group h-full"
    >
      <div className="p-3 md:p-5 flex-grow">
        <div className="h-28 md:h-48 bg-gray-50 rounded-xl md:rounded-2xl mb-3 md:mb-5 flex items-center justify-center text-4xl md:text-6xl overflow-hidden relative border border-gray-100">
          {(item.images && item.images.length > 0) ? (
            <ImageSlider images={item.images} interval={2500 + Math.random() * 2000} />
          ) : item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <>
              {activeTab === 'fastfood' && '🍔'}
              {activeTab === 'desi' && '🍲'}
              {activeTab === 'chinese' && '🍜'}
              {activeTab === 'drinks' && '🥤'}
            </>
          )}

          <div
            className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm duration-300 cursor-pointer"
            onClick={() => setSelectedItemForModal(item)}
          >
            <span className="text-secondary bg-primary px-4 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Details
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1 sm:gap-2 mb-2">
          <h3 className="text-sm sm:text-lg font-black text-gray-900 leading-tight truncate sm:whitespace-normal">{item.name}</h3>
          {!item.sizes?.length && (
            <span className="font-black text-accent text-sm sm:text-lg shrink-0">Rs.{item.price}</span>
          )}
        </div>

        {item.description && <p className="text-[10px] sm:text-xs text-gray-500 mb-2 md:mb-4 line-clamp-2 leading-relaxed">{item.description}</p>}
      </div>

      <div className="px-3 md:px-5 pb-3 md:pb-5 pt-0 mt-auto flex flex-col gap-2 md:gap-3">
        {item.sizes && item.sizes.length > 0 && (
          <div className="space-y-1.5 md:space-y-2 bg-gray-50 p-1.5 md:p-2 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Select Size</p>
            <div className="flex flex-col gap-1.5">
              {item.sizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size)}
                  className={`flex items-center justify-between p-2 text-xs md:text-sm rounded-lg border transition-all ${selectedSize?.name === size.name ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-gray-200 bg-white text-gray-600 hover:border-primary/50'}`}
                >
                  <span>{size.name} - Rs.{size.price}</span>
                  <div className={`shrink-0 w-3 h-3 rounded-full border-2 flex items-center justify-center ${selectedSize?.name === size.name ? 'border-primary' : 'border-gray-300'}`}>
                    {selectedSize?.name === size.name && <div className="w-1.5 h-1.5 bg-primary rounded-full" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => handleAddToCart(item, selectedSize, priceToDisplay)}
          className="w-full bg-secondary text-primary font-black py-2.5 md:py-3.5 text-sm md:text-base rounded-lg md:rounded-xl hover:bg-gray-900 transition-colors shadow-lg flex items-center justify-center gap-1.5 md:gap-2 mt-auto"
        >
          Add to Cart <Plus className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </motion.div>
  );
};

const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [superCategories, setSuperCategories] = useState([]);
  const [filtersList, setFiltersList] = useState([{ name: 'All' }]);
  const [activeTab, setActiveTab] = useState('fastfood');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const [menuRes, filtersRes, catsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/public/menuitems'),
          axios.get('http://localhost:5000/api/public/filters'),
          axios.get('http://localhost:5000/api/public/categories/menu')
        ]);
        setMenuData(menuRes.data);
        if (catsRes.data && catsRes.data.length > 0) {
          setSuperCategories(catsRes.data);
          setActiveTab('fastfood');
        }
        if (filtersRes.data) {
          const fetchedFilters = filtersRes.data.filter(f => f.name !== 'All');
          setFiltersList([{ name: 'All' }, ...fetchedFilters]);
        }
      } catch (error) {
        toast.error('Failed to load menu');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredMenuData = useMemo(() => {
    let validCategories = [];
    if (searchQuery || activeFilter !== 'All') {
      validCategories = superCategories.flatMap(c => c.categories);
    } else if (activeTab) {
      const activeSuperCategory = superCategories.find(c => c.id === activeTab);
      if (activeSuperCategory) validCategories = activeSuperCategory.categories;
    } else {
      return [];
    }

    // Group products by their categories
    const groupedProducts = {};
    menuData.forEach(product => {
      if (validCategories.includes(product.category)) {
        if (!groupedProducts[product.category]) {
          groupedProducts[product.category] = { category: { name: product.category, _id: product.category }, items: [] };
        }
        groupedProducts[product.category].items.push(product);
      }
    });

    let processedData = Object.values(groupedProducts);

    return processedData.map(group => {
      let filteredItems = group.items;

      // Apply Search
      if (searchQuery) {
        filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      // Apply Filter Tags
      if (activeFilter !== 'All') {
        filteredItems = filteredItems.filter(item =>
          item.tags?.some(tag => tag.toLowerCase() === activeFilter.toLowerCase()) ||
          item.name.toLowerCase().includes(activeFilter.toLowerCase())
        );
      }

      return { ...group, items: filteredItems };
    }).filter(group => group.items.length > 0);
  }, [menuData, activeTab, searchQuery, activeFilter, superCategories]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          visibleSections.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: '-10% 0px -80% 0px' }
    );

    const checkElements = setTimeout(() => {
      const sections = document.querySelectorAll('[id^="category-"]');
      sections.forEach((section) => observer.observe(section));
    }, 500);

    return () => {
      clearTimeout(checkElements);
      observer.disconnect();
    };
  }, [filteredMenuData, activeTab]);

  useEffect(() => {
    if (activeSection) {
      const activeBtn = document.getElementById(`sidebar-btn-${activeSection}`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      
      const mobileBtn = document.getElementById(`mobile-btn-${activeSection}`);
      if (mobileBtn) {
        mobileBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeSection]);

  const scrollToCategory = (categoryName, retries = 3) => {
    const el = document.getElementById(`category-${categoryName}`);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (retries > 0) {
      setTimeout(() => scrollToCategory(categoryName, retries - 1), 150);
    }
  };

  const handleAddToCart = (item, size = null, price) => {
    dispatch(addToCart({ ...item, size: size?.name, price, qty: 1 }));
    toast.success(`${item.name} added to cart!`);
  };

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

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto hide-scrollbar">
            <div className="flex items-center gap-2 text-gray-500 font-bold px-3 border-r border-gray-200 shrink-0">
              <SlidersHorizontal className="w-5 h-5" /> Filters
            </div>
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar snap-x py-1">
              {filtersList.map(filter => (
                <button
                  key={filter.name}
                  onClick={() => setActiveFilter(filter.name)}
                  className={`snap-center shrink-0 px-4 py-2 rounded-full font-bold text-sm transition-colors shadow-sm ${activeFilter === filter.name ? 'bg-primary text-secondary' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Toggle Switch */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
            {superCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveTab(cat.id); setSearchQuery(''); }}
                className={`px-6 md:px-10 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base flex items-center gap-2 transition-all duration-300 ${activeTab === cat.id
                    ? 'bg-primary text-secondary shadow-md scale-[1.02]'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                <span>{cat.id === 'fastfood' ? '🍕' : '🍛'}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Content with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Mobile Categories Bar */}
          <div className="lg:hidden sticky top-0 z-40 bg-gray-50 pt-2 pb-4 -mx-4 px-4 overflow-x-auto hide-scrollbar border-b border-gray-200 shadow-sm">
            <div className="flex gap-2">
              {filteredMenuData.map((categoryGroup) => (
                <button
                  key={categoryGroup.category.name}
                  id={`mobile-btn-category-${categoryGroup.category.name}`}
                  onClick={() => scrollToCategory(categoryGroup.category.name)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeSection === `category-${categoryGroup.category.name}`
                      ? 'bg-secondary text-primary shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                >
                  {categoryGroup.category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-xl border border-gray-100 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
              <h3 className="font-black text-xl text-secondary mb-4">Categories</h3>
              <div className="flex flex-col gap-2">
                {filteredMenuData.map((categoryGroup) => (
                  <button
                    key={categoryGroup.category.name}
                    id={`sidebar-btn-category-${categoryGroup.category.name}`}
                    onClick={() => scrollToCategory(categoryGroup.category.name)}
                    className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${activeSection === `category-${categoryGroup.category.name}`
                        ? 'bg-primary/20 text-secondary border-l-4 border-primary pl-3'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent pl-4'
                      }`}
                  >
                    {categoryGroup.category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="flex-1">
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
                    <div
                      key={categoryGroup.category._id}
                      id={`category-${categoryGroup.category.name}`}
                      className="mb-16 scroll-mt-24"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-3xl font-black text-secondary tracking-tight">
                          {categoryGroup.category.name}
                        </h2>
                        <div className="h-[2px] flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {categoryGroup.items.map((item) => (
                          <MenuItemCard
                            key={item._id}
                            item={item}
                            activeTab={activeTab || 'fastfood'}
                            handleAddToCart={handleAddToCart}
                            setSelectedItemForModal={setSelectedItemForModal}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Item Details Modal */}
        <AnimatePresence>
          {selectedItemForModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItemForModal(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]"
              >
                <button
                  onClick={() => setSelectedItemForModal(null)}
                  className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                >
                  <X size={20} />
                </button>

                <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 relative">
                  {(selectedItemForModal.images && selectedItemForModal.images.length > 0) ? (
                    <ImageSlider images={selectedItemForModal.images} interval={3000} />
                  ) : selectedItemForModal.image ? (
                    <img src={selectedItemForModal.image} alt={selectedItemForModal.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-8xl bg-gray-50">🍔</div>
                  )}
                </div>

                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-tight">{selectedItemForModal.name}</h2>
                    <div className="inline-block bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm mb-4">
                      {selectedItemForModal.category}
                    </div>
                    {selectedItemForModal.description ? (
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">{selectedItemForModal.description}</p>
                    ) : (
                      <p className="text-gray-400 italic text-sm">No description available for this item.</p>
                    )}
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-100">
                    <div className="flex items-end justify-between mb-6">
                      <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Starting at</p>
                        <p className="text-3xl font-black text-accent">
                          Rs. {selectedItemForModal.sizes?.length ? selectedItemForModal.sizes[0].price : selectedItemForModal.price}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        handleAddToCart(selectedItemForModal, selectedItemForModal.sizes?.length ? selectedItemForModal.sizes[0] : null, selectedItemForModal.sizes?.length ? selectedItemForModal.sizes[0].price : selectedItemForModal.price);
                        setSelectedItemForModal(null);
                      }}
                      className="w-full bg-primary text-secondary font-black py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-yellow-400 transition-colors shadow-lg shadow-primary/20"
                    >
                      <Plus size={20} /> Add to Cart (Quick Add)
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">
                      To select specific sizes, close this and use the options on the menu card.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
      );
};

      export default Menu;
