import React, { useState, useEffect, useMemo } from 'react';
import { Search, Mail, Phone, MapPin } from 'lucide-react';
import axios from 'axios';

const AdminCustomers = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/orders');
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const customers = useMemo(() => {
    const customerMap = {};

    orders.forEach(order => {
      const phone = order.phone || 'Unknown';
      if (!customerMap[phone]) {
        customerMap[phone] = {
          name: order.customerName || 'Unknown Customer',
          phone: phone,
          location: order.address || 'Not Provided',
          orders: 0,
          spent: 0,
        };
      }
      customerMap[phone].orders += 1;
      customerMap[phone].spent += (order.totalAmount || 0);
      
      // Update name/location if they changed in a recent order
      if (order.customerName) customerMap[phone].name = order.customerName;
      if (order.address) customerMap[phone].location = order.address;
    });

    return Object.values(customerMap).sort((a, b) => b.spent - a.spent);
  }, [orders]);

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.phone.includes(searchQuery) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [customers, searchQuery]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500 mt-1">View customer database and order history</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or phone..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading customers...</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <tr>
                  <th className="py-4 px-6 font-medium">Customer Details</th>
                  <th className="py-4 px-6 font-medium">Contact Info</th>
                  <th className="py-4 px-6 font-medium">Location</th>
                  <th className="py-4 px-6 font-medium text-center">Total Orders</th>
                  <th className="py-4 px-6 font-medium text-right">Total Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCustomers.length > 0 ? filteredCustomers.map((customer, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900">{customer.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1 text-sm text-gray-500">
                        <div className="flex items-center gap-2"><Phone size={14} /> {customer.phone}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-2 text-sm text-gray-500">
                        <MapPin size={14} className="mt-0.5 shrink-0" />
                        <span className="max-w-[150px] truncate">{customer.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {customer.orders}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-semibold text-gray-900">
                      Rs. {customer.spent.toLocaleString()}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">No customers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
