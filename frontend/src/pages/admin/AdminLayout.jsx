import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import AdminLogin from './AdminLogin';
import { Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin setAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden bg-secondary text-white p-4 flex justify-between items-center fixed top-0 w-full z-30 shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-secondary font-bold p-1.5 rounded-lg text-sm">DF</div>
          <h2 className="text-lg font-bold text-primary">Admin Portal</h2>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex pt-[72px] md:pt-0">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} handleLogout={handleLogout} />
        
        {/* Main Content */}
        <div className="flex-1 w-full md:ml-64 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
