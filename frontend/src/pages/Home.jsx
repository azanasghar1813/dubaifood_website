import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Clock, MapPin, Phone } from 'lucide-react';
import axios from 'axios';
import ImageSlider from '../components/ImageSlider';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const Home = () => {
  const [settings, setSettings] = useState({ announcementText: "FREE DELIVERY", heroImage: "", heroFloatingImage: "" });
  const [featuredDeals, setFeaturedDeals] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIndex((prev) => prev + 1);
    }, 5000); // Swap every 5 seconds
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, dealsRes, itemsRes, catsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/public/settings'),
          axios.get('http://localhost:5000/api/public/deals'),
          axios.get('http://localhost:5000/api/public/featured'),
          axios.get('http://localhost:5000/api/public/categories/home')
        ]);
        if (settingsRes.data) setSettings(settingsRes.data);
        if (dealsRes.data) {
          const featured = dealsRes.data.filter(d => d.isFeatured);
          setFeaturedDeals(featured);
        }
        if (itemsRes.data) setFeaturedItems(itemsRes.data.slice(0, 6)); // Show top 6 items
        if (catsRes.data) setCategories(catsRes.data);

      } catch (err) {
        console.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (item, size = null, price) => {
    dispatch(addToCart({ ...item, size: size?.name, price: price || item.price, qty: 1 }));
    toast.success(`${item.name || item.dealNumber} added to cart!`);
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const floatingImages = settings.heroFloatingImages && settings.heroFloatingImages.length > 0 
    ? settings.heroFloatingImages.map(img => img.url)
    : [
        settings.heroFloatingImage || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1500&auto=format&fit=crop",
        "https://png.pngtree.com/png-clipart/20230427/original/pngtree-burger-food-snack-png-image_9115206.png"
      ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">

      {/* Hero Section */}
      <section className="relative bg-secondary text-white pt-10 pb-12 lg:pt-20 lg:pb-20 overflow-hidden flex items-center min-h-[60vh]">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: `url('${settings.heroImage || "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070"}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

            {/* Left Content */}
            <motion.div
              className="w-full lg:w-1/2 text-center lg:text-left"
              initial="hidden"
              animate="show"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-primary px-4 py-1.5 rounded-full font-bold mb-6 backdrop-blur-md text-xs md:text-sm">
                <Star className="w-3.5 h-3.5 fill-primary" /> Chowk Azam's #1 Fast Food
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight tracking-tight drop-shadow-lg">
                Fresh <span className="text-primary">Burgers</span><br />
                <span className="text-white">Pizza & BBQ</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-sm md:text-base text-gray-200 mb-8 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed drop-shadow-md">
                Delivered Fresh Every Day. Experience the ultimate taste of <span className="text-white font-bold">Dubai Fast Food and Cafe</span> right at your doorstep.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start w-full sm:w-auto">
                <Link to="/menu" className="btn-primary text-sm md:text-base px-6 py-3 w-full sm:w-auto shadow-lg shadow-primary/30 flex justify-center items-center gap-2">
                  <span>Order Now</span> <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#location" className="btn-outline border-white/30 text-white hover:border-white hover:bg-white/10 text-sm md:text-base px-6 py-3 w-full sm:w-auto flex justify-center items-center gap-2">
                  <MapPin className="w-4 h-4" /> <span>View Location</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Right Content - Clean Image Presentation */}
            <motion.div
              className="w-full lg:w-1/2 relative hidden lg:flex justify-end items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full max-w-[500px] h-[350px]">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={heroImageIndex % floatingImages.length}
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 2 }}
                    exit={{ opacity: 0, scale: 1.05, rotate: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    src={floatingImages[heroImageIndex % floatingImages.length]}
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white/10"
                    alt="Delicious Fast Food"
                  />
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Marquee Announcement */}
      <div className="bg-accent text-white py-2 overflow-hidden relative z-30 shadow-md">
        <div className="animate-marquee-ltr flex items-center">
          {[...Array(15)].map((_, i) => (
            <span key={i} className="mx-4 font-bold text-xs sm:text-sm whitespace-nowrap tracking-wider uppercase">
              ✅ {settings.announcementText || "FREE DELIVERY ABOVE RS.1500"}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Categories */}
      {categories.length > 0 && (
        <section className="py-12 md:py-16 container mx-auto px-4 relative z-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-primary font-bold tracking-wider uppercase mb-1 text-xs">Explore Menu</h2>
              <h3 className="text-2xl md:text-3xl font-black text-secondary">Top Categories</h3>
            </div>
            <Link to="/menu" className="hidden sm:flex items-center gap-1.5 font-bold text-gray-500 hover:text-primary transition-colors text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {categories.map((cat, idx) => (
              <Link key={idx} to={cat.link}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group text-center h-full flex flex-col justify-center items-center"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-50 rounded-full mb-3 flex items-center justify-center text-2xl group-hover:bg-primary/10 transition-colors duration-300">
                    {cat.image ? <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full" /> : cat.icon}
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-0.5">{cat.name}</h4>
                  <p className="text-gray-500 text-[10px] md:text-xs font-medium">{cat.desc}</p>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </section>
      )}

      {/* Featured Deals */}
      {featuredDeals.length > 0 && (
        <section className="py-12 md:py-16 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-accent font-bold tracking-wider uppercase mb-1 text-xs">Save Big</h2>
              <h3 className="text-2xl md:text-3xl font-black text-secondary">Featured Deals</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDeals.map((deal, idx) => (
                <motion.div
                  key={deal._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow group flex flex-col h-full"
                >
                  <div className="relative h-40 overflow-hidden bg-yellow-50 flex items-center justify-center">
                    {deal.image ? (
                      <img src={deal.image} alt={deal.dealNumber} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <span className="text-4xl">🔥</span>
                    )}
                    <div className="absolute top-3 left-3 bg-accent text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
                      Featured
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-lg font-black text-white mb-0.5">{deal.dealNumber}</h4>
                      <p className="text-gray-200 text-xs line-clamp-2">{(deal.includedItems || []).join(', ')}</p>
                    </div>
                  </div>
                  <div className="p-5 bg-white flex flex-col flex-1">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        {deal.name && <span className="text-gray-400 text-xs font-medium block">{deal.name}</span>}
                        <div className="text-xl font-black text-primary">Rs. {deal.price}</div>
                      </div>
                    </div>
                    <button onClick={(e) => { e.preventDefault(); handleAddToCart(deal); }} className="btn-primary w-full py-2.5 text-sm justify-center shadow-sm hover:shadow-md mt-auto">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Items */}
      {featuredItems.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-accent font-bold tracking-wider uppercase mb-1 text-xs">Chef's Special</h2>
              <h3 className="text-2xl md:text-3xl font-black text-secondary">Featured Items</h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
              {featuredItems.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full"
                >
                  <div className="h-28 md:h-36 bg-gray-100 rounded-xl mb-3 overflow-hidden relative">
                    {(item.images && item.images.length > 0) ? (
                      <ImageSlider images={item.images} interval={2500 + Math.random() * 2000} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No Image</div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col text-center mt-1">
                    <h4 className="text-sm md:text-base font-black text-gray-900 leading-tight mb-1">{item.name}</h4>
                    {item.description && <p className="text-[10px] md:text-xs text-gray-500 line-clamp-2 mb-2 hidden md:block">{item.description}</p>}

                    <div className="mt-auto pt-2 border-t border-gray-50">
                      {item.sizes && item.sizes.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-1">
                          {item.sizes.map((size, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => { e.preventDefault(); handleAddToCart(item, size, size.price); }}
                              className="bg-gray-50 border border-gray-200 hover:border-primary hover:bg-primary/10 text-xs px-1.5 py-1 rounded-lg transition-colors flex flex-col items-center flex-1 min-w-[50px]"
                            >
                              <span className="text-gray-500 font-medium text-[9px] uppercase tracking-wider">{size.name}</span>
                              <span className="font-bold text-secondary text-[11px] md:text-xs">Rs.{size.price}</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex justify-between items-center px-1">
                          <span className="font-black text-primary text-sm md:text-base">Rs. {item.price}</span>
                          <button
                            onClick={(e) => { e.preventDefault(); handleAddToCart(item, null, item.price); }}
                            className="bg-secondary text-white text-[10px] md:text-xs px-3 py-1.5 rounded-lg hover:bg-gray-900 transition-colors shadow-sm"
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us & Location */}
      <section id="location" className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-secondary rounded-3xl p-6 md:p-10 overflow-hidden relative shadow-lg">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative z-10 items-center">
              <div>
                <h2 className="text-primary font-bold tracking-wider uppercase mb-1 text-xs">Visit Us</h2>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-6">We're Waiting For You</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm md:text-base">Our Location</h4>
                      <p className="text-gray-400 text-xs md:text-sm">Near Main Bazar Chowk Azam</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm md:text-base">Contact</h4>
                      <p className="text-gray-400 text-xs md:text-sm">0308-8020784</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm md:text-base">Opening Hours</h4>
                      <p className="text-gray-400 text-xs md:text-sm">Everyday: 11:00 AM - 03:00 AM</p>
                    </div>
                  </div>
                </div>

                <a href="tel:03088020784" className="btn-primary text-sm md:text-base px-6 py-3 w-full sm:w-auto inline-block text-center">
                  Call Now
                </a>
              </div>

              <div className="h-[250px] md:h-[350px] w-full rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3421.226307250109!2d71.2041152!3d30.9641662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392455002a97440b%3A0xfeed3e96f653916d!2sDubai+Fast+Foods!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
