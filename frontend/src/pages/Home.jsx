import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, MapPin, Phone } from 'lucide-react';

const Home = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const floatAnimation = {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  };

  const categories = [
    { name: 'Burgers', icon: '🍔', desc: 'Juicy & Crispy', link: '/menu' },
    { name: 'Pizza', icon: '🍕', desc: 'Loaded with Cheese', link: '/menu' },
    { name: 'Broast', icon: '🍗', desc: 'Spicy & Crunchy', link: '/menu' },
    { name: 'Shawarma', icon: '🌯', desc: 'Authentic Taste', link: '/menu' },
    { name: 'Fries', icon: '🍟', desc: 'Loaded Fries', link: '/menu' },
    { name: 'Drinks', icon: '🥤', desc: 'Chilled Beverages', link: '/menu' }
  ];

  const featuredDeals = [
    { title: 'Family Fiesta', oldPrice: 3000, newPrice: 2499, items: '2 Zinger Burgers, Large Pizza, Large Fries, 1.5L Drink', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800' },
    { title: 'Student Deal', oldPrice: 1200, newPrice: 899, items: 'Zinger Burger, Reg Fries, Reg Drink', image: 'https://images.unsplash.com/photo-1594212691516-436fba72f057?w=800' },
    { title: 'Pizza Party', oldPrice: 4000, newPrice: 3299, items: '2 Large Premium Pizzas, 1.5L Drink', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative bg-secondary text-white pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden flex items-center min-h-[80vh]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />
        
        {/* Abstract shapes for wow factor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            
            {/* Left Content */}
            <motion.div 
              className="w-full lg:w-3/5 text-center lg:text-left -mt-8 lg:-mt-16"
              initial="hidden"
              animate="show"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-primary px-5 py-2 rounded-full font-bold mb-8 backdrop-blur-md text-sm md:text-base">
                <Star className="w-4 h-4 fill-primary" /> Chowk Azam's #1 Fast Food
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-8xl font-black mb-6 leading-[1.1] tracking-tight">
                Fresh <span className="text-primary">Burgers</span><br />
                <span className="text-white">Pizza & BBQ</span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Delivered Fresh Every Day. Experience the ultimate taste of <span className="text-white font-bold">Dubai Fast Food and Cafe</span> right at your doorstep.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
                <Link to="/menu" className="btn-primary text-lg md:text-xl px-8 py-4 w-full sm:w-auto shadow-[0_0_40px_rgba(255,176,0,0.4)]">
                  🍔 Order Now
                </Link>
                <a href="#location" className="btn-outline border-white/30 text-white hover:border-white hover:bg-white/10 text-lg md:text-xl px-8 py-4 w-full sm:w-auto">
                  📍 View Location
                </a>
              </motion.div>
            </motion.div>

            {/* Right Content - Floating Elements (Hidden on mobile for cleaner look) */}
            <motion.div 
              className="w-2/5 relative h-[500px] hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img 
                animate={floatAnimation} 
                src="https://png.pngtree.com/png-clipart/20230427/original/pngtree-burger-food-snack-png-image_9115206.png"
                className="absolute top-20 right-0 w-[400px] drop-shadow-[0_30px_30px_rgba(0,0,0,0.5)] z-20"
                alt="Delicious Burger"
              />
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Marquee Announcement */}
      <div className="bg-accent text-white py-2 md:py-3 overflow-hidden relative z-30 shadow-lg border-y-2 border-white/10">
        <div className="animate-marquee-ltr flex items-center">
          {[...Array(15)].map((_, i) => (
            <span key={i} className="mx-4 md:mx-8 font-bold text-sm sm:text-base md:text-lg whitespace-nowrap tracking-wider">
              ✅ FREE DELIVERY ABOVE RS.1500
            </span>
          ))}
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-20 lg:py-24 container mx-auto px-4 relative z-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-primary font-bold tracking-widest uppercase mb-2 text-sm md:text-base">Explore Menu</h2>
            <h3 className="text-3xl md:text-5xl font-black text-secondary">Top Categories</h3>
          </div>
          <Link to="/menu" className="hidden md:flex items-center gap-2 font-bold text-gray-500 hover:text-primary transition-colors">
            View All <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {categories.map((cat, idx) => (
            <Link key={idx} to={cat.link}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 group text-center h-full flex flex-col justify-center items-center"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full mb-4 flex items-center justify-center text-4xl group-hover:scale-110 group-hover:bg-primary/10 transition-transform duration-300">
                  {cat.icon}
                </div>
                <h4 className="text-lg font-black text-gray-900 mb-1">{cat.name}</h4>
                <p className="text-gray-500 text-xs font-medium">{cat.desc}</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* Featured Deals */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-accent font-bold tracking-widest uppercase mb-2 text-sm">Save Big</h2>
            <h3 className="text-3xl md:text-5xl font-black text-secondary">Featured Deals</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDeals.map((deal, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={deal.image} alt={deal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-accent text-white font-black px-4 py-1 rounded-full shadow-lg transform -rotate-3">
                    Save Rs. {deal.oldPrice - deal.newPrice}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-2xl font-black text-white mb-1">{deal.title}</h4>
                    <p className="text-gray-300 text-sm line-clamp-2">{deal.items}</p>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="text-gray-400 line-through text-sm font-medium">Rs. {deal.oldPrice}</span>
                      <div className="text-3xl font-black text-primary">Rs. {deal.newPrice}</div>
                    </div>
                  </div>
                  <Link to="/menu" className="btn-primary w-full py-4 text-lg justify-center shadow-lg shadow-primary/20">
                    Order Deal Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Location */}
      <section id="location" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-secondary rounded-[3rem] p-8 md:p-16 overflow-hidden relative shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[80px]"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-center">
              <div>
                <h2 className="text-primary font-bold tracking-widest uppercase mb-2">Visit Us</h2>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-8">We're Waiting For You</h3>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">Our Location</h4>
                      <p className="text-gray-400">Near Main Bazar Chowk Azam</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">Contact</h4>
                      <p className="text-gray-400">0300-1234567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">Opening Hours</h4>
                      <p className="text-gray-400">Everyday: 11:00 AM - 02:00 AM</p>
                    </div>
                  </div>
                </div>
                
                <a href="tel:03001234567" className="btn-primary text-lg px-8 py-4">
                  Call Now
                </a>
              </div>
              
              <div className="h-[400px] w-full rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13778.65089309873!2d71.5540!3d30.9320!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDU1JzU1LjIiTiA3McKwMzMnMTQuNCJF!5e0!3m2!1sen!2s!4v1625000000000!5m2!1sen!2s" 
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
