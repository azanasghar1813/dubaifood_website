import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../redux/cartSlice';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-6">Your cart is currently empty.</p>
          <Link to="/menu" className="btn-primary">Browse Menu</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl overflow-hidden shrink-0">
                    {(() => {
                      const imgSrc = item.images && item.images.length > 0
                        ? (typeof item.images[0] === 'object' ? (item.images[0].url || item.images[0].image) : item.images[0])
                        : item.image;
                      
                      return imgSrc ? (
                        <img src={imgSrc} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        '🍔'
                      );
                    })()}
                  </div>
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                    <p className="text-primary font-bold">Rs. {item.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="font-semibold">Qty: {item.qty}</span>
                  <button 
                    onClick={() => handleRemove(item)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-6 h-fit bg-gray-50 border-0 shadow-lg">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>Rs. {calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>Rs. {calculateSubtotal()}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full py-3 text-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
