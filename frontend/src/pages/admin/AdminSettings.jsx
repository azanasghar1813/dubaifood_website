import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Upload, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const AdminSettings = () => {
  const [announcementText, setAnnouncementText] = useState('');
  
  // Hero Image State
  const [heroImage, setHeroImage] = useState(null);
  const [currentHeroImage, setCurrentHeroImage] = useState('');
  const [deleteHeroImage, setDeleteHeroImage] = useState(false);
  
  // Floating Image State
  const [heroFloatingImages, setHeroFloatingImages] = useState([]);
  const [currentHeroFloatingImages, setCurrentHeroFloatingImages] = useState([]);
  const [heroFloatingImagesToDelete, setHeroFloatingImagesToDelete] = useState([]);
  
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
        const floatingImages = res.data.heroFloatingImages ? [...res.data.heroFloatingImages] : [];
        if (res.data.heroFloatingImage && floatingImages.length === 0) {
          floatingImages.push({ url: res.data.heroFloatingImage, publicId: res.data.heroFloatingImagePublicId });
        }
        setCurrentHeroFloatingImages(floatingImages);
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
    
    // Hero Image Appends
    if (heroImage) formData.append('heroImage', heroImage);
    if (deleteHeroImage) formData.append('deleteHeroImage', 'true');
    
    // Floating Image Appends
    heroFloatingImages.forEach((file) => {
      formData.append('heroFloatingImages', file);
    });
    if (heroFloatingImagesToDelete.length > 0) {
      formData.append('heroFloatingImagesToDelete', JSON.stringify(heroFloatingImagesToDelete));
    }

    try {
      await axios.post(`${API_URL}/admin/settings`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Settings updated successfully!');
      
      // Reset local delete flags and file inputs
      setDeleteHeroImage(false);
      setHeroFloatingImagesToDelete([]);
      setHeroImage(null);
      setHeroFloatingImages([]);
      
      fetchSettings();
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
                    {currentHeroImage && !deleteHeroImage ? (
                      <>
                        <img src={currentHeroImage} alt="Hero Banner" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setDeleteHeroImage(true)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove custom image and use default"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        Default Background Will Be Used
                      </div>
                    )}
                  </div>
                  {deleteHeroImage && currentHeroImage && (
                    <button type="button" onClick={() => setDeleteHeroImage(false)} className="text-xs text-primary mt-2">
                      Undo Remove
                    </button>
                  )}
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
                    <input type="file" className="hidden" accept="image/*" onChange={e => { setHeroImage(e.target.files[0]); setDeleteHeroImage(false); }} />
                  </label>
                </div>
              </div>
            </div>

            {/* Floating Image Section */}
            <div className="border-t border-gray-100 pt-6">
              <label className="block text-sm font-bold text-gray-700 mb-4">Hero Floating Images (Right Side)</label>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {/* Current Images */}
                {currentHeroFloatingImages.filter(img => !heroFloatingImagesToDelete.includes(img.publicId)).map((img, index) => (
                  <div key={index} className="h-32 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative group flex items-center justify-center">
                    <img src={img.url} alt="Floating" className="w-auto h-full object-contain p-2" />
                    <button
                      type="button"
                      onClick={() => setHeroFloatingImagesToDelete([...heroFloatingImagesToDelete, img.publicId])}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                
                {/* New Image Previews */}
                {heroFloatingImages.map((file, index) => (
                  <div key={`new-${index}`} className="h-32 bg-yellow-50 rounded-xl overflow-hidden border border-yellow-200 relative group flex items-center justify-center">
                    <img src={URL.createObjectURL(file)} alt="New Floating" className="w-auto h-full object-contain p-2" />
                    <button
                      type="button"
                      onClick={() => setHeroFloatingImages(heroFloatingImages.filter((_, i) => i !== index))}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove new image"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}

                {/* Upload New Image */}
                <label className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-2 pb-2 text-center">
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-xs text-gray-500 font-medium px-2">Upload Image</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" multiple onChange={e => setHeroFloatingImages([...heroFloatingImages, ...Array.from(e.target.files)])} />
                </label>
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
