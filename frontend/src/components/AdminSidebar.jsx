import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, Users, Settings, LogOut, List, Pizza } from 'lucide-react';

const AdminSidebar = ({ sidebarOpen, setSidebarOpen, handleLogout }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag size={20} /> },
    { name: 'Menu Items', path: '/admin/menu-items', icon: <Pizza size={20} /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users size={20} /> },
    { name: 'Deals', path: '/admin/deals', icon: <ShoppingBag size={20} /> },
    { name: 'Featured Items', path: '/admin/featured', icon: <UtensilsCrossed size={20} /> },
    { name: 'Categories & Filters', path: '/admin/categories', icon: <List size={20} /> },
    { name: 'Gallery', path: '/admin/gallery', icon: <UtensilsCrossed size={20} /> },
    { name: 'Reviews', path: '/admin/reviews', icon: <Users size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className={`w-64 bg-secondary text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="p-6 flex items-center gap-3 border-b border-gray-800">
        <div className="bg-primary text-secondary font-bold p-2 rounded-lg">DF</div>
        <div>
          <h2 className="text-xl font-bold text-primary">Dubai Fast Food</h2>
          <p className="text-xs text-gray-400">Admin Portal</p>
        </div>
      </div>
      
      <div className="flex-1 py-6 flex flex-col gap-2 px-4 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-primary text-secondary font-semibold shadow-lg shadow-primary/20'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 w-full px-4 py-3 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
    </>
  );
};

export default AdminSidebar;
