import React from 'react';
import { TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon, trend, isPositive }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      <div className={`flex items-center gap-1 mt-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <TrendingUp size={16} className={!isPositive ? 'rotate-180' : ''} />
        <span>{trend} vs last week</span>
      </div>
    </div>
    <div className="p-3 bg-gray-50 rounded-xl text-primary">
      {icon}
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value="Rs. 45,230" icon={<DollarSign size={24} />} trend="+12.5%" isPositive={true} />
        <StatCard title="Total Orders" value="156" icon={<ShoppingBag size={24} />} trend="+8.2%" isPositive={true} />
        <StatCard title="Active Customers" value="89" icon={<Users size={24} />} trend="-2.4%" isPositive={false} />
        <StatCard title="Avg. Order Value" value="Rs. 2,900" icon={<TrendingUp size={24} />} trend="+5.1%" isPositive={true} />
      </div>

      {/* Recent Orders Table (Mock) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
          <button className="text-primary font-medium hover:text-yellow-600">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="py-4 px-6 font-medium">Order ID</th>
                <th className="py-4 px-6 font-medium">Customer</th>
                <th className="py-4 px-6 font-medium">Items</th>
                <th className="py-4 px-6 font-medium">Total</th>
                <th className="py-4 px-6 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { id: '#ORD-001', name: 'Ali Khan', items: 3, total: 3450, status: 'Preparing' },
                { id: '#ORD-002', name: 'Sara Ahmed', items: 1, total: 1050, status: 'Delivered' },
                { id: '#ORD-003', name: 'Usman Ali', items: 5, total: 5600, status: 'Pending' },
                { id: '#ORD-004', name: 'Ayesha Bibi', items: 2, total: 2200, status: 'Out for Delivery' },
              ].map((order, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{order.id}</td>
                  <td className="py-4 px-6 text-gray-600">{order.name}</td>
                  <td className="py-4 px-6 text-gray-600">{order.items} items</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">Rs. {order.total}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' : 
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-purple-100 text-purple-700'}
                    `}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
