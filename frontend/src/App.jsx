import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

// Customer Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Deals from './pages/Deals';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminMenuItems from './pages/admin/AdminMenuItems';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminSettings from './pages/admin/AdminSettings';
import AdminDeals from './pages/admin/AdminDeals';
import AdminFeatured from './pages/admin/AdminFeatured';
import AdminCategories from './pages/admin/AdminCategories';
import AdminGallery from './pages/admin/AdminGallery';
import AdminReviews from './pages/admin/AdminReviews';
import axios from 'axios';

// Configure Axios Interceptors
axios.interceptors.request.use(
  (config) => {
    // Dynamically rewrite localhost URLs to production API URL if deployed
    if (config.url.startsWith('http://localhost:5000/api')) {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      config.url = config.url.replace('http://localhost:5000/api', baseUrl);
    }

    const token = localStorage.getItem('admin_token');
    if (token && config.url.includes('/api/admin')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && error.config.url.includes('/api/admin')) {
      // Token expired or invalid
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_auth');
      window.location.href = '/admin'; // Force re-login
    }
    return Promise.reject(error);
  }
);

const CustomerLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <FloatingButtons />
    <Footer />
  </div>
);

function App() {
  useEffect(() => {
    const updateFavicon = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/public/settings');
        if (res.data?.logoImage) {
          let link = document.querySelector("link[rel~='icon']");
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
          }
          link.href = res.data.logoImage;
        }
      } catch (err) {
        console.error('Failed to update favicon:', err);
      }
    };
    updateFavicon();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="menu-items" element={<AdminMenuItems />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="deals" element={<AdminDeals />} />
          <Route path="featured" element={<AdminFeatured />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="reviews" element={<AdminReviews />} />
        </Route>

        {/* Customer Routes */}
        <Route path="/*" element={
          <CustomerLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </CustomerLayout>
        } />
      </Routes>
      <Toaster position="bottom-right" />
      <Analytics />
    </Router>
  );
}

export default App;
