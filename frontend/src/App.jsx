import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

// Customer Pages
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Deals = lazy(() => import('./pages/Deals'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Contact = lazy(() => import('./pages/Contact'));

// Admin Pages
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));
const AdminMenuItems = lazy(() => import('./pages/admin/AdminMenuItems'));
const AdminCustomers = lazy(() => import('./pages/admin/AdminCustomers'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminDeals = lazy(() => import('./pages/admin/AdminDeals'));
const AdminFeatured = lazy(() => import('./pages/admin/AdminFeatured'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));
const AdminReviews = lazy(() => import('./pages/admin/AdminReviews'));
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
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
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
      </Suspense>
      <Toaster position="bottom-right" />
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;
