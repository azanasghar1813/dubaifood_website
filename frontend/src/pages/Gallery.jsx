import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

import ImageSlider from '../components/ImageSlider';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/public/gallery');
        setCategoriesList(data);
      } catch (err) {
        toast.error('Failed to load gallery');
      }
    };
    fetchGallery();
  }, []);

  const categories = ['All', 'General', 'Restaurant Interior', 'Kitchen', 'Events'];

  const filteredCategories = activeTab === 'All' 
    ? categoriesList 
    : categoriesList.filter(cat => cat.section === activeTab);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-secondary text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4">Our Gallery</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Take a look at our delicious food and beautiful dining space.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-7xl mt-12">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                activeTab === cat 
                  ? 'bg-primary text-secondary shadow-md' 
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Categories */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCategories.map((cat) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={cat._id}
                className="relative rounded-3xl overflow-hidden aspect-square md:aspect-video shadow-md hover:shadow-xl transition-shadow bg-gray-100 group"
              >
                {cat.images && cat.images.length > 0 ? (
                  <ImageSlider images={cat.images} interval={3000 + Math.random() * 2000} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
                
                {/* Overlay with Section Name */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12 z-20 pointer-events-none">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">{cat.section}</h3>
                  <p className="text-white/80 text-sm mt-1">{cat.images?.length || 0} {(cat.images?.length === 1) ? 'Image' : 'Images'}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
