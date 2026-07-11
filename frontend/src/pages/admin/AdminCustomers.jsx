import React from 'react';
import { Search, Mail, Phone, MapPin } from 'lucide-react';

const AdminCustomers = () => {
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
            placeholder="Search by name, email or phone..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
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
              {[
                { name: 'Ali Khan', email: 'ali@example.com', phone: '+92 300 1234567', location: 'Chowk Azam, Block 1', orders: 12, spent: 15400 },
                { name: 'Sara Ahmed', email: 'sara@example.com', phone: '+92 312 9876543', location: 'Layyah Road, Near Hospital', orders: 5, spent: 4200 },
                { name: 'Usman Ali', email: 'usman.a@gmail.com', phone: '+92 333 4455667', location: 'Main Bazar, Chowk Azam', orders: 28, spent: 45600 },
                { name: 'Ayesha Bibi', email: 'ayesha99@yahoo.com', phone: '+92 345 1122334', location: 'Model Town', orders: 2, spent: 1800 },
                { name: 'Zainab Noor', email: 'z.noor@outlook.com', phone: '+92 301 9988776', location: 'Chowk Azam, Block 4', orders: 8, spent: 8900 },
              ].map((customer, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1 text-sm text-gray-500">
                      <div className="flex items-center gap-2"><Mail size={14} /> {customer.email}</div>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
