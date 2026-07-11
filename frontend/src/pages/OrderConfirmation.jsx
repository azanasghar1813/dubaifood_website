import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderConfirmation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-gray-100"
      >
        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle className="w-12 h-12" />
        </div>
        
        <h1 className="text-3xl font-black text-gray-900 mb-4">Order Sent Successfully!</h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          We have received your order details on WhatsApp. Our team will confirm it shortly.
        </p>

        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center gap-3 text-secondary font-bold mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Estimated Preparation Time</span>
          </div>
          <div className="text-3xl font-black text-primary">20 - 30 Mins</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-outline px-8 py-3 w-full sm:w-auto">
            Back to Home
          </Link>
          <Link to="/menu" className="btn-primary px-8 py-3 w-full sm:w-auto flex items-center justify-center gap-2">
            Order More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
