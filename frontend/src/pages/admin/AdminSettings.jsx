import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const AdminSettings = () => {
  const [announcementText, setAnnouncementText] = useState('');
  const [heroImage, setHeroImage] = useState(null);
  const [currentHeroImage, setCurrentHeroImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${API_URL}/public/settings`);
      if (res.data) {
        setAnnouncementText(res.data.announcementText || '');
        setCurrentHeroImage(res.data.heroImage || '');
      }
    } catch (err) {
      toast.error('Failed to load settings');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('announcementText', announcementText);
    if (heroImage) formData.append('heroImage', heroImage);

    try {
      await axios.post(`${API_URL}/admin/settings`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Settings updated successfully!');
      fetchSettings();
      setHeroImage(null);
    } catch (err) {
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Website Settings</h1>
        <p className="text-gray-500 mt-1">Manage global website appearance and content</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Homepage Configuration</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Announcement Banner Text</label>
              <input 
                type="text" 
                value={announcementText}
                onChange={e => setAnnouncementText(e.target.value)}
                placeholder="e.g. Free delivery above Rs 1500" 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-xs text-gray-500 mt-2">This text appears scrolling at the top of the homepage.</p>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <label className="block text-sm font-bold text-gray-700 mb-4">Hero Background Image</label>
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Current Image Preview */}
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Current Image</p>
                  <div className="h-48 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative group">
                    {currentHeroImage ? (
                      <img src={currentHeroImage} alt="Hero Banner" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        Default Background Used
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload New Image */}
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Upload New Image</p>
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-500 font-medium">{heroImage ? heroImage.name : "Click to select a new image"}</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={e => setHeroImage(e.target.files[0])} />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center gap-2 bg-primary text-secondary font-bold px-8 py-3 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            <Save size={20} />
            {loading ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
