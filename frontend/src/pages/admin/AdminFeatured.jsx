import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, X, Plus, Edit, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const AdminFeatured = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [sortBy, setSortBy] = useState('name-asc');
  
  // Edit Form State
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const res = await axios.get(`${API_URL}/public/featured`);
      if (res.data) {
        setFeaturedItems(res.data);
      }
    } catch (err) {
      toast.error('Failed to load featured items from database');
    } finally {
      setLoading(false);
    }
  };

  const handleUnfeature = async (id, title) => {
    if (window.confirm(`Are you sure you want to remove ${title || 'this item'} from the featured list?`)) {
      setIsUpdating(true);
      try {
        await axios.delete(`${API_URL}/admin/featured/${id}`);
        toast.success(`Successfully removed from featured!`);
        fetchFeatured();
      } catch (err) {
        toast.error('Failed to unfeature item');
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setName('');
    setDescription('');
    setPrice('');
    setImages([]);
    setExistingImages([]);
    setImagesToDelete([]);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setName(item.name || '');
    setDescription(item.description || '');
    setPrice(item.price || '');
    setExistingImages(item.images || []);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (description) formData.append('description', description);
    if (price) formData.append('price', price);
    
    if (images.length > 0) {
      images.forEach(img => formData.append('images', img));
    }
    if (imagesToDelete.length > 0) {
      formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
    }

    try {
      if (editingItem && editingItem._id) {
        await axios.put(`${API_URL}/admin/featured/${editingItem._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Featured item updated successfully');
      } else {
        await axios.post(`${API_URL}/admin/featured`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Custom featured item added successfully');
      }
      resetForm();
      fetchFeatured();
    } catch (err) {
      toast.error('Failed to save featured item');
    } finally {
      setIsUpdating(false);
    }
  };

  const getDisplayName = (item) => {
    if (item.name) return item.name;
    if (item.referenceId) {
      return item.referenceId.name || item.referenceId.dealNumber;
    }
    return 'Unnamed Item';
  };

  const getDisplayPrice = (item) => {
    if (item.price) return item.price;
    if (item.referenceId) {
       return item.referenceId.price || (item.referenceId.sizes?.length ? item.referenceId.sizes[0].price : 0);
    }
    return 0;
  };
  
  const getDisplayImage = (item) => {
    if (item.images && item.images.length > 0) return item.images[0].url;
    if (item.image) return item.image;
    if (item.referenceId) {
      if (item.referenceId.images && item.referenceId.images.length > 0) return item.referenceId.images[0].url;
      if (item.referenceId.image) return item.referenceId.image;
    }
    return null;
  };

  const sortedItems = [...featuredItems].sort((a, b) => {
    const nameA = getDisplayName(a) || '';
    const nameB = getDisplayName(b) || '';
    const priceA = getDisplayPrice(a) || 0;
    const priceB = getDisplayPrice(b) || 0;

    if (sortBy === 'name-asc') return nameA.localeCompare(nameB);
    if (sortBy === 'name-desc') return nameB.localeCompare(nameA);
    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    return 0;
  });

  const featuredDeals = sortedItems.filter(i => i.itemType === 'deal');
  const featuredMenuItems = sortedItems.filter(i => i.itemType === 'menuitem');
  const featuredCustoms = sortedItems.filter(i => i.itemType === 'custom');

  if (loading) return <div className="text-center py-20">Loading Featured Overview...</div>;

  return (
    <div>
      <div className="mb-8 bg-primary/10 border border-primary/20 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Star className="text-primary w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Featured Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Manage items shown in the Featured section on the homepage.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="name-asc">Sort: A-Z</option>
            <option value="name-desc">Sort: Z-A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <button 
            onClick={() => { setShowForm(!showForm); if(!showForm) resetForm(); }}
            className="flex items-center gap-2 bg-primary text-secondary font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            <span>{showForm ? 'Cancel' : 'Add Custom Featured'}</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-bold mb-4">{editingItem ? 'Edit Featured Item' : 'Add Custom Featured Item'}</h2>
          
          {editingItem && editingItem.itemType !== 'custom' && (
            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-6 text-sm">
              <span className="font-bold">Note:</span> You are editing a linked {editingItem.itemType}. Here you can override its Name and Description just for the featured section. The original deal/menu item will remain unchanged.
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Custom Name (Optional for linked items)</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required={!editingItem || editingItem.itemType === 'custom'} />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Custom Description (Optional)</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows="2"></textarea>
            </div>

            {(!editingItem || editingItem.itemType === 'custom') && (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price (Rs.)</label>
                  <input type="number" required value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Images</label>
                  
                  {existingImages.length > 0 && (
                    <div className="flex flex-wrap gap-4 mb-4">
                      {existingImages.map(img => (
                        <div key={img.publicId || img.url} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                          <img src={img.url} alt="Item" className="w-full h-full object-cover" />
                          <button 
                            type="button" 
                            onClick={() => {
                              if (img.publicId) setImagesToDelete([...imagesToDelete, img.publicId]);
                              setExistingImages(existingImages.filter(i => i.publicId !== img.publicId && i.url !== img.url));
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">{images.length > 0 ? `${images.length} new image(s) selected` : "Click to upload new images"}</p>
                      </div>
                      <input type="file" multiple className="hidden" accept="image/*" onChange={e => setImages(Array.from(e.target.files))} />
                    </label>
                  </div>
                </div>
              </>
            )}

            <div className="md:col-span-2 mt-4">
              <button 
                type="submit" 
                disabled={isUpdating}
                className="w-full bg-primary text-secondary font-bold py-3 rounded-lg hover:bg-yellow-400 disabled:opacity-70 flex justify-center items-center"
              >
                {isUpdating ? 'Saving...' : 'Save Featured Item'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* RENDER FEATURED CARDS FUNCTION */}
      {(() => {
        const renderItem = (item, icon, badgeText) => {
          const displayImg = getDisplayImage(item);
          const displayName = getDisplayName(item);
          const displayPrice = getDisplayPrice(item);
          
          return (
            <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-yellow-300 overflow-hidden relative group">
              <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow z-10 flex items-center gap-1">
                {icon} {badgeText}
              </div>
              <button 
                onClick={() => handleUnfeature(item._id, displayName)}
                disabled={isUpdating}
                className="absolute top-2 right-2 bg-white/90 text-red-500 p-2 rounded-full shadow hover:bg-red-50 transition-colors z-10 disabled:opacity-50"
                title="Remove from featured"
              >
                <X size={16} />
              </button>
              <button 
                onClick={() => handleEdit(item)}
                className="absolute top-2 right-12 bg-white/90 text-blue-500 p-2 rounded-full shadow hover:bg-blue-50 transition-colors z-10 opacity-0 group-hover:opacity-100"
                title="Edit override details"
              >
                <Edit size={16} />
              </button>
              
              <div className="h-40 bg-gray-100 relative">
                {displayImg ? (
                  <img src={displayImg} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-yellow-50 text-3xl">⭐</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 truncate">{displayName}</h3>
                {item.name && item.referenceId && <p className="text-xs text-blue-600 bg-blue-50 px-2 py-1 inline-block rounded mb-2">Custom Name Override</p>}
                {item.description && <p className="text-sm text-gray-500 mb-2 truncate">{item.description}</p>}
                <p className="text-primary font-black">Rs. {displayPrice}</p>
              </div>
            </div>
          );
        };

        return (
          <>
            <h2 className="text-2xl font-black mb-4 flex items-center gap-2 mt-8">
              Featured Deals <span className="text-sm font-bold bg-gray-200 text-gray-600 px-3 py-1 rounded-full">{featuredDeals.length}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {featuredDeals.length === 0 ? <p className="text-gray-500">No featured deals.</p> : featuredDeals.map(d => renderItem(d, <Star size={12} fill="currentColor" />, 'Deal'))}
            </div>

            <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
              Featured Menu Items <span className="text-sm font-bold bg-gray-200 text-gray-600 px-3 py-1 rounded-full">{featuredMenuItems.length}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {featuredMenuItems.length === 0 ? <p className="text-gray-500">No featured menu items.</p> : featuredMenuItems.map(m => renderItem(m, <Star size={12} fill="currentColor" />, 'Menu Item'))}
            </div>

            <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
              Custom Featured Items <span className="text-sm font-bold bg-gray-200 text-gray-600 px-3 py-1 rounded-full">{featuredCustoms.length}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredCustoms.length === 0 ? <p className="text-gray-500">No standalone custom items.</p> : featuredCustoms.map(c => renderItem(c, <Star size={12} fill="currentColor" />, 'Custom'))}
            </div>
          </>
        );
      })()}
    </div>
  );
};

export default AdminFeatured;
