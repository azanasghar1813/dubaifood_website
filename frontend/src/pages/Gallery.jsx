import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('All');

  // Placeholder images for now. Can be fetched from backend later.
  const galleryItems = [
    { id: 1, category: 'Pizza', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800' },
    { id: 2, category: 'Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800' },
    { id: 3, category: 'Interior', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800' },
    { id: 4, category: 'Broast', url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800' },
    { id: 5, category: 'Shawarma', url: 'https://images.unsplash.com/photo-1646049247653-535d506992d9?w=800' },
    { id: 6, category: 'Cafe', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800' },
  ];

  const categories = ['All', 'Pizza', 'Burger', 'Broast', 'Shawarma', 'Interior', 'Cafe'];

  const filteredItems = activeTab === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

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

        {/* Masonry-style Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="relative group rounded-3xl overflow-hidden cursor-pointer aspect-square shadow-sm hover:shadow-xl transition-shadow"
                onClick={() => setSelectedImage(item.url)}
              >
                <img src={item.url} alt={item.category} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-12 h-12 text-white" />
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-secondary">
                  {item.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage} 
              alt="Enlarged" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
