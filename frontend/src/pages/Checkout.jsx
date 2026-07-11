import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { clearCartItems } from '../redux/cartSlice';
import { ArrowLeft, MapPin, Phone, User, MessageSquare, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: 'Chowk Azam',
    address: '',
    landmark: '',
    specialInstructions: '',
    deliveryType: 'Delivery'
  });

  const [loading, setLoading] = useState(false);

  const calculateSubtotal = () => cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = formData.deliveryType === 'Delivery' ? 150 : 0;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateWhatsAppMessage = () => {
    const ownerNumber = '923001234567'; // Owner's WhatsApp Number
    
    let message = `🍽️ *NEW ORDER*\n`;
    message += `━━━━━━━━━━━━━━\n\n`;
    
    message += `👤 *Customer*\n${formData.fullName}\n\n`;
    message += `📞 *Phone*\n${formData.phone}\n\n`;
    
    if (formData.deliveryType === 'Delivery') {
      message += `📍 *Address*\n${formData.address}\n`;
      if (formData.landmark) message += `Landmark: ${formData.landmark}\n`;
      message += `\n`;
    }
    
    message += `━━━━━━━━━━━━━━\n\n`;
    message += `🛒 *ORDER*\n\n`;
    
    cartItems.forEach(item => {
      let itemName = item.name;
      if (item.size) itemName += ` (${item.size})`;
      message += `🍔 ${itemName} ×${item.qty}\nRs.${item.price * item.qty}\n\n`;
    });
    
    message += `━━━━━━━━━━━━━━\n\n`;
    
    if (formData.specialInstructions) {
      message += `📝 *Special Instructions*\n${formData.specialInstructions}\n\n`;
      message += `━━━━━━━━━━━━━━\n\n`;
    }
    
    message += `💰 *Subtotal*: Rs.${subtotal}\n`;
    if (formData.deliveryType === 'Delivery') {
      message += `🚚 *Delivery*: Rs.${deliveryFee}\n`;
    }
    message += `💵 *Total: Rs.${total}*\n\n`;
    
    message += `━━━━━━━━━━━━━━\n\n`;
    message += formData.deliveryType === 'Delivery' ? `Delivery Required ✅\n` : `Pickup Order 🏃\n`;
    message += `Payment: Cash on Delivery\n\n`;
    message += `Thank you.`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${ownerNumber}?text=${encodedMessage}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      // 1. Save to Backend Database for Admin Panel
      const orderData = {
        orderItems: cartItems,
        shippingAddress: { ...formData, area: formData.city }, // Map to existing schema
        paymentMethod: 'Cash on Delivery',
        itemsPrice: subtotal,
        deliveryFee,
        totalPrice: total
      };

      await axios.post('https://dubaifood.onrender.com/api/orders', orderData);
      
      // 2. Redirect to WhatsApp
      const whatsappUrl = generateWhatsAppMessage();
      dispatch(clearCartItems());
      
      // Open WhatsApp in current tab (or new tab, but current is better for mobile)
      window.location.href = whatsappUrl;
      
      // Wait a moment then navigate to confirmation
      setTimeout(() => {
        navigate('/order-confirmation');
      }, 1000);
      
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4">
        <ShoppingCart className="w-24 h-24 text-gray-300 mb-6" />
        <h2 className="text-3xl font-black text-secondary mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">Looks like you haven't added anything to your cart yet. Discover our delicious menu!</p>
        <Link to="/menu" className="btn-primary text-lg px-8 py-3">Explore Menu</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-secondary text-white py-10 px-4 mb-8">
        <div className="container mx-auto max-w-6xl">
          <Link to="/cart" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Checkout</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Form */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-3">
                <CheckCircle className="text-primary w-6 h-6" /> Delivery Options
              </h2>
              
              <div className="flex gap-4 mb-8">
                <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.deliveryType === 'Delivery' ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                  <input type="radio" name="deliveryType" value="Delivery" checked={formData.deliveryType === 'Delivery'} onChange={handleChange} className="sr-only" />
                  🚚 Delivery
                </label>
                <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.deliveryType === 'Pickup' ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                  <input type="radio" name="deliveryType" value="Pickup" checked={formData.deliveryType === 'Pickup'} onChange={handleChange} className="sr-only" />
                  🏃 Pickup
                </label>
              </div>

              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" /> Full Name *
                    </label>
                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" /> Phone Number *
                    </label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="03xx-xxxxxxx" />
                  </div>
                </div>

                {formData.deliveryType === 'Delivery' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-5 overflow-hidden pt-2">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" /> Complete Address *
                      </label>
                      <textarea required name="address" value={formData.address} onChange={handleChange} rows="3" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" placeholder="House/Flat No, Street, Area"></textarea>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Nearest Landmark (Optional)</label>
                      <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. Near Main Bazar" />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2 pt-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-400" /> Special Instructions (Optional)
                  </label>
                  <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows="2" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" placeholder="e.g. Extra Mayo, No Onion"></textarea>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-5 xl:col-span-4 relative">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card p-6 md:p-8 sticky top-28 border-2 border-primary/20">
              <h2 className="text-2xl font-black mb-6 text-gray-900 border-b border-gray-100 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-3 text-sm">
                    <div className="bg-gray-100 font-bold text-gray-800 px-2 py-1 rounded w-8 h-8 flex items-center justify-center flex-shrink-0">
                      {item.qty}x
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      {item.size && <span className="text-xs text-gray-500">{item.size}</span>}
                    </div>
                    <span className="font-bold text-secondary">Rs. {item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                {formData.deliveryType === 'Delivery' && (
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Delivery Fee</span>
                    <span>Rs. {deliveryFee}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center text-xl font-black text-gray-900">
                    <span>Total</span>
                    <span className="text-primary">Rs. {total}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 text-green-800 p-4 rounded-xl mb-6 text-sm font-medium border border-green-200 text-center">
                Payment Method: <span className="font-bold">Cash on Delivery</span>
              </div>

              <button 
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="btn-primary w-full py-4 text-lg shadow-xl shadow-primary/30 flex justify-center items-center gap-3 relative overflow-hidden group"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className="relative z-10 font-black flex items-center gap-2">Order on WhatsApp</span>
                    <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  </>
                )}
              </button>
              <p className="text-xs text-center text-gray-400 mt-4">By placing this order, you will be redirected to WhatsApp to confirm.</p>
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Checkout;
