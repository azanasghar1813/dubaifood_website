import React from 'react';
import { Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';

const AdminOrders = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-500 mt-1">View and manage customer orders</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search order ID..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        {['All Orders', 'Pending', 'Preparing', 'Out for Delivery', 'Completed'].map((tab, idx) => (
          <button 
            key={idx}
            className={`pb-4 px-2 font-medium text-sm transition-colors relative ${
              idx === 0 ? 'text-primary' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab}
            {idx === 0 && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
              <tr>
                <th className="py-4 px-6 font-medium">Order ID</th>
                <th className="py-4 px-6 font-medium">Date & Time</th>
                <th className="py-4 px-6 font-medium">Customer</th>
                <th className="py-4 px-6 font-medium">Total</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { id: '#ORD-001', date: 'Today, 2:30 PM', name: 'Ali Khan', total: 3450, status: 'Preparing' },
                { id: '#ORD-002', date: 'Today, 1:15 PM', name: 'Sara Ahmed', total: 1050, status: 'Completed' },
                { id: '#ORD-003', date: 'Today, 12:45 PM', name: 'Usman Ali', total: 5600, status: 'Pending' },
                { id: '#ORD-004', date: 'Yesterday, 8:20 PM', name: 'Ayesha Bibi', total: 2200, status: 'Out for Delivery' },
                { id: '#ORD-005', date: 'Yesterday, 7:10 PM', name: 'Zainab Noor', total: 1800, status: 'Completed' },
              ].map((order, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{order.id}</td>
                  <td className="py-4 px-6 text-gray-500 text-sm">{order.date}</td>
                  <td className="py-4 px-6 text-gray-600">{order.name}</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">Rs. {order.total}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                        order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' : 
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-purple-100 text-purple-700'}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary bg-gray-50 hover:bg-primary/10 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>Showing 1 to 5 of 42 entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 bg-primary text-secondary rounded font-medium">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
