import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/orders`);
      setOrders(res.data);
    } catch (err) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
      <p className="text-gray-500 mb-8">View and manage customer orders.</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Order ID</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Customer</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Date</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Total</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Status</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="6" className="py-4 px-6 text-center text-gray-500">Loading orders...</td></tr>
              ) : orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-mono text-gray-600">#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.phone}</p>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">Rs. {order.totalAmount}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Clock size={12} /> Pending
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="text-primary hover:text-yellow-600 p-2 rounded-lg hover:bg-yellow-50 transition-colors"
                    >
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-bold">{selectedOrder.customerName}</p>
                <p>{selectedOrder.phone}</p>
                <p className="text-gray-600">{selectedOrder.address}</p>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500 mb-2">Items</p>
                <ul className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center text-sm">
                      <span>{item.qty}x {item.name} {item.size && `(${item.size})`}</span>
                      <span className="font-bold">Rs. {item.price * item.qty}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-primary">Rs. {selectedOrder.totalAmount}</span>
              </div>
            </div>
            <button 
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full bg-gray-100 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
