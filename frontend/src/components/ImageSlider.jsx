import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // images could be an array of objects [{url: '...'}], or strings ['...'], 
  // or a single string if falling back. We should normalize it.
  const normalizedImages = Array.isArray(images) ? images : (images ? [images] : []);

  useEffect(() => {
    if (normalizedImages.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % normalizedImages.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [normalizedImages.length, interval]);

  if (normalizedImages.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
        No Image
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden group">
      <div 
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {normalizedImages.map((img, index) => {
          const imgSrc = typeof img === 'object' && img !== null ? (img.url || img.image) : img;
          
          return (
            <img
              key={index}
              src={imgSrc}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          );
        })}
      </div>
      
      {/* Indicator dots */}
      {normalizedImages.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {normalizedImages.map((_, index) => (
            <div 
              key={index} 
              className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
                index === currentIndex ? 'w-4 bg-primary' : 'w-1.5 bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
