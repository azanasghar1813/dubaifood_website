import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Menu as MenuIcon, X, Plus, Minus, Trash2 } from 'lucide-react';
import { addToCart, removeFromCart, clearCartItems } from '../redux/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = 150;
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;

  const handleUpdateQty = (item, newQty) => {
    if (newQty <= 0) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(addToCart({ ...item, qty: newQty }));
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Deals', path: '/deals' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-accent text-white text-sm font-bold text-center py-2 px-4 shadow-sm relative z-50">
        ✅ Free Delivery Above Rs.1500
      </div>

      <nav className="glass sticky top-0 z-40 transition-all duration-300 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-black text-secondary flex items-center gap-2 tracking-tight">
            <div className="bg-primary text-secondary p-1.5 rounded-lg flex items-center justify-center">
              🍔
            </div>
            Dubai <span className="text-primary">Fast Food</span>
          </Link>
          
          <div className="hidden lg:flex gap-6 xl:gap-8 items-center font-bold text-sm uppercase tracking-wide">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-gray-600 hover:text-primary transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors border border-gray-200"
            >
              <ShoppingCart className="w-5 h-5 text-secondary" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors border border-gray-200 lg:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-secondary" /> : <MenuIcon className="w-5 h-5 text-secondary" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 absolute w-full z-30"
          >
            <div className="flex flex-col py-4 px-6 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-gray-800 hover:text-primary transition-colors border-b border-gray-50 pb-2"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-black flex items-center gap-2">
                  <ShoppingCart className="text-primary" /> Your Cart
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                    <ShoppingCart className="w-16 h-16 opacity-50" />
                    <p className="text-lg font-bold">Your cart is empty</p>
                    <button onClick={() => setIsCartOpen(false)} className="btn-primary mt-4">Browse Menu</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex gap-4 items-center bg-gray-50 p-3 rounded-2xl border border-gray-100 relative">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl shadow-sm border border-gray-100">
                          🍔
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 leading-tight">{item.name}</h4>
                          {item.size && <p className="text-xs text-gray-500">{item.size}</p>}
                          <p className="text-primary font-bold mt-1">Rs. {item.price}</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm">
                            <button onClick={() => handleUpdateQty(item, item.qty - 1)} className="text-gray-500 hover:text-accent">
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-sm w-4 text-center">{item.qty}</span>
                            <button onClick={() => handleUpdateQty(item, item.qty + 1)} className="text-gray-500 hover:text-primary">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-5 bg-gray-50 border-t border-gray-200 space-y-4">
                  <div className="space-y-2 text-sm font-medium text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>Rs. {subtotal}</span>
                    </div>
                    <div className="flex justify-between text-accent">
                      <span>Delivery Fee</span>
                      <span>Rs. {deliveryFee}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xl font-black text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>Rs. {total}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/checkout');
                    }}
                    className="btn-primary w-full py-4 text-lg"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
