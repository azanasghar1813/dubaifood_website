import React from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

const AdminProducts = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menu & Products</h1>
          <p className="text-gray-500 mt-1">Manage categories and food items</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search product..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="flex items-center gap-2 bg-primary text-secondary font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors shadow-sm shadow-primary/30">
            <Plus size={18} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900">Categories</h2>
              <button className="text-primary hover:text-yellow-600 text-sm font-medium">+ Add</button>
            </div>
            <div className="space-y-1">
              {['All Products', 'Pizza', 'Burgers', 'Fast Food', 'Desi', 'Chinese', 'Drinks'].map((cat, idx) => (
                <button 
                  key={idx}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                    idx === 0 ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {[
              { name: 'Special Chicken Karahi', price: '1850', cat: 'Desi', img: '🥘' },
              { name: 'Zinger Tower Burger', price: '550', cat: 'Burgers', img: '🍔' },
              { name: 'Chicken Tikka Pizza', price: '1500', cat: 'Pizza', img: '🍕' },
              { name: 'Spicy Injected Broast', price: '2100', cat: 'Fast Food', img: '🍗' },
              { name: 'Mint Margarita', price: '150', cat: 'Drinks', img: '🍹' },
              { name: 'Special Chow Mein', price: '900', cat: 'Chinese', img: '🍜' },
            ].map((product, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col group hover:shadow-md transition-all">
                <div className="h-32 bg-gray-50 rounded-xl mb-4 flex items-center justify-center text-5xl">
                  {product.img}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{product.cat}</span>
                    <span className="font-bold text-accent">Rs. {product.price}</span>
                  </div>
                </div>
                
                {/* Hover Actions */}
                <div className="mt-4 pt-4 border-t border-gray-50 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 py-2 rounded-lg text-xs font-medium hover:bg-blue-100">
                    <Edit size={14} /> Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 py-2 rounded-lg text-xs font-medium hover:bg-red-100">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminProducts;
