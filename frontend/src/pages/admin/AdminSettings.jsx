import React from 'react';
import { Save, Store, Truck, CreditCard, Bell } from 'lucide-react';

const AdminSettings = () => {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Store Settings</h1>
        <p className="text-gray-500 mt-1">Manage restaurant configuration and preferences</p>
      </div>

      <div className="space-y-6">
        
        {/* General Settings */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            <Store className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-gray-900">General Info</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
              <input type="text" defaultValue="Dubai Food & Pizza Hut" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
              <input type="text" defaultValue="0308-8020784" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Address</label>
              <input type="text" defaultValue="Near Waqas Nazir Printers, Layyah Road, Chowk Azam" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Status</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="open">Open (Accepting Orders)</option>
                <option value="closed">Closed</option>
                <option value="busy">Busy (Delayed Delivery)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Delivery Settings */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            <Truck className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Delivery Configuration</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Radius (km)</label>
              <input type="number" defaultValue="5" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Charges (%)</label>
              <input type="number" defaultValue="7" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button className="flex items-center gap-2 bg-primary text-secondary font-bold px-8 py-3 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-primary/30">
            <Save size={20} />
            <span>Save Settings</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminSettings;
