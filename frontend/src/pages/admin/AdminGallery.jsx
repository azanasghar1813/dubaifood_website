import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Trash2, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const AdminGallery = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [files, setFiles] = useState([]);
  const [section, setSection] = useState('General');

  const sections = ['General', 'Restaurant Interior', 'Kitchen', 'Events'];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_URL}/public/gallery`);
      setCategories(res.data);
    } catch (err) {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      toast.error('Please select an image first');
      return;
    }

    const formData = new FormData();
    files.forEach(f => formData.append('images', f));
    formData.append('section', section);

    try {
      await axios.post(`${API_URL}/admin/gallery`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Images uploaded successfully!');
      setFiles([]);
      setShowForm(false);
      fetchGallery();
    } catch (err) {
      toast.error('Failed to upload image');
    }
  };

  const handleDeleteImage = async (catId, imgId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await axios.delete(`${API_URL}/admin/gallery/${catId}/image/${imgId}`);
        toast.success('Image deleted');
        fetchGallery();
      } catch (err) {
        toast.error('Failed to delete image');
      }
    }
  };

  const handleDeleteCategory = async (catId) => {
    if (window.confirm('Are you sure you want to delete this entire category and all its images?')) {
      try {
        await axios.delete(`${API_URL}/admin/gallery/${catId}`);
        toast.success('Category deleted');
        fetchGallery();
      } catch (err) {
        toast.error('Failed to delete category');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-500 mt-1">Upload and manage images for the public gallery</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-secondary font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          <span>{showForm ? 'Cancel' : 'Upload Image'}</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 max-w-2xl">
          <h2 className="text-xl font-bold mb-4">Upload New Image</h2>
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Section Name</label>
              <input 
                type="text" 
                list="sectionsList"
                value={section} 
                onChange={e => setSection(e.target.value)} 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Type new or select existing section"
              />
              <datalist id="sectionsList">
                {sections.map(sec => <option key={sec} value={sec} />)}
                {categories.map(cat => !sections.includes(cat.section) && <option key={cat.section} value={cat.section} />)}
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Images</label>
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">{files.length > 0 ? `${files.length} image(s) selected` : "Click to select images"}</p>
                </div>
                <input type="file" multiple className="hidden" accept="image/*,video/mp4" onChange={e => setFiles(Array.from(e.target.files))} />
              </label>
            </div>

            <button type="submit" disabled={files.length === 0} className="w-full bg-primary text-secondary font-bold py-3 rounded-lg hover:bg-yellow-400 disabled:opacity-50">Upload to Gallery</button>
          </form>
        </div>
      )}

      {loading ? <p>Loading images...</p> : categories.map((cat) => (
        <div key={cat._id} className="mb-10">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-bold text-gray-800">{cat.section}</h2>
            <button onClick={() => handleDeleteCategory(cat._id)} className="text-sm text-red-500 hover:text-red-700">Delete Category</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cat.images.map(img => {
              const isVideo = img.url && img.url.match(/\.(mp4|webm|ogg)$/i);
              return (
              <div key={img._id} className="relative group rounded-xl overflow-hidden shadow-sm aspect-square bg-gray-100">
                {isVideo ? (
                  <video src={img.url} className="w-full h-full object-cover" muted loop playsInline />
                ) : (
                  <img src={img.url} alt={cat.section} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-3">
                  <button onClick={() => handleDeleteImage(cat._id, img._id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            )})}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminGallery;
