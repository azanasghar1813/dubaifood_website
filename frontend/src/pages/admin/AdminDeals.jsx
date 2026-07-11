import React from 'react';

const AdminDeals = () => {
  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Deals</h1>
          <p className="text-gray-500 mt-1">Create and manage special offers</p>
        </div>
        <button className="bg-primary text-secondary font-bold px-6 py-2 rounded-xl hover:bg-yellow-400 transition-colors">
          + Create New Deal
        </button>
      </div>
      <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
        <p className="text-gray-500">Deals management coming soon...</p>
      </div>
    </div>
  );
};

export default AdminDeals;
