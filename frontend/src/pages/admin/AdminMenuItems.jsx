import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Search, Plus, Edit, Trash2, X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import ImageSlider from '../../components/ImageSlider';


const API_URL = 'http://localhost:5000/api';

const AdminMenuItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [superCategories, setSuperCategories] = useState([]);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter categories for the select dropdown based on the active tab
  const categories = useMemo(() => {
    const activeSuperCategory = superCategories.find(c => c.id === activeTab);
    return activeSuperCategory ? activeSuperCategory.categories : [];
  }, [superCategories, activeTab]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const [itemRes, catRes] = await Promise.all([
        axios.get(`${API_URL}/public/menuitems`),
        axios.get(`${API_URL}/public/categories/menu`)
      ]);
      setItems(itemRes.data);
      if (catRes.data && catRes.data.length > 0) {
        setSuperCategories(catRes.data);
        setActiveTab(catRes.data[0].id);
        if (!category) setCategory(catRes.data[0].categories[0] || '');
      }
    } catch (err) {
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const addSizeField = () => {
    setSizes([...sizes, { name: '', price: '' }]);
  };

  const removeSizeField = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('isFeatured', isFeatured);
    if (price) formData.append('price', price);
    if (images.length > 0) {
      images.forEach(img => formData.append('images', img));
    }
    if (sizes.length > 0) formData.append('sizes', JSON.stringify(sizes));
    if (imagesToDelete.length > 0) formData.append('imagesToDelete', JSON.stringify(imagesToDelete));

    setIsSubmitting(true);
    try {
      if (editingId) {
        await axios.put(`${API_URL}/admin/menuitems/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Menu item updated successfully!');
      } else {
        await axios.post(`${API_URL}/admin/menuitems`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Menu item added successfully!');
      }
      setShowForm(false);
      resetForm();
      fetchItems();
    } catch (err) {
      toast.error('Failed to save menu item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    const itemSuperCat = superCategories.find(c => c.categories.includes(item.category));
    if (itemSuperCat) setActiveTab(itemSuperCat.id);

    setEditingId(item._id);
    setName(item.name);
    setDescription(item.description || '');
    setPrice(item.price || '');
    setCategory(item.category);
    setIsFeatured(item.isFeatured || false);
    setSizes(item.sizes || []);
    setImages([]); // Reset new files input
    setExistingImages(item.images || []);
    setImagesToDelete([]);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await axios.delete(`${API_URL}/admin/menuitems/${id}`);
        toast.success('Menu item deleted');
        fetchItems();
      } catch (err) {
        toast.error('Failed to delete menu item');
      }
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setImages([]);
    setSizes([]);
    setIsFeatured(false);
    setExistingImages([]);
    setImagesToDelete([]);
    setEditingId(null);
  };

  const filteredMenuData = useMemo(() => {
    let activeSuperCategory = superCategories.find(c => c.id === activeTab);
    if (!activeSuperCategory) return [];

    // Group items by their categories
    const groupedItems = {};
    items.forEach(item => {
      if (activeSuperCategory.categories.includes(item.category)) {
        if (!groupedItems[item.category]) {
          groupedItems[item.category] = { category: { name: item.category, _id: item.category }, items: [] };
        }
        groupedItems[item.category].items.push(item);
      }
    });

    let processedData = Object.values(groupedItems);

    return processedData.map(group => {
      let filteredItems = group.items;

      // Apply Search
      if (searchQuery) {
        filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      return { ...group, items: filteredItems };
    }).filter(group => group.items.length > 0);
  }, [items, activeTab, searchQuery, superCategories]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menu Items</h1>
        </div>
        <div className="flex gap-4">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
            />
          </div>
          <button 
            onClick={() => { setShowForm(!showForm); if(!showForm) resetForm(); }}
            className="flex items-center gap-2 bg-primary text-secondary font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            <span>{showForm ? 'Cancel' : 'Add New'}</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows="2"></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Images (Optional)</label>
              
              {existingImages.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-4">
                  {existingImages.map(img => (
                    <div key={img.publicId || img.url} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                      <img src={img.url} alt="Menu item" className="w-full h-full object-cover" />
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

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Pricing</label>
              <p className="text-xs text-gray-500 mb-2">Set a standard price OR add multiple sizes.</p>
              {sizes.length === 0 && (
                <input type="number" placeholder="Standard Price (Rs.)" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-2" />
              )}
              
              <div className="flex items-center my-4">
                <input type="checkbox" id="isFeatured" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary" />
                <label htmlFor="isFeatured" className="ml-3 block text-sm font-bold text-gray-700">Mark as Featured (Shows on Home Page)</label>
              </div>

              <div className="space-y-2">
                {sizes.map((s, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input type="text" placeholder="Size (e.g. Small)" value={s.name} onChange={e => handleSizeChange(idx, 'name', e.target.value)} className="flex-1 px-3 py-1 border rounded" required />
                    <input type="number" placeholder="Price" value={s.price} onChange={e => handleSizeChange(idx, 'price', e.target.value)} className="w-24 px-3 py-1 border rounded" required />
                    <button type="button" onClick={() => removeSizeField(idx)} className="text-red-500"><X size={18} /></button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addSizeField} className="text-primary text-sm font-bold mt-2">+ Add Size Option</button>
            </div>

            <div className="md:col-span-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary text-secondary font-bold py-3 rounded-lg hover:bg-yellow-400 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving Item...
                  </>
                ) : editingId ? 'Update Item' : 'Save Item'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabs */}
      <div className="flex justify-start md:justify-center mb-8 overflow-x-auto hide-scrollbar">
        <div className="inline-flex bg-white rounded-full shadow-sm p-1.5 border border-gray-100 min-w-max">
          {superCategories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSearchQuery(''); }}
              className={`whitespace-nowrap px-6 py-2.5 md:px-8 md:py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary text-secondary shadow-md scale-105'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + searchQuery}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {loading ? <p className="text-center">Loading...</p> : filteredMenuData.length === 0 ? (
             <div className="text-center py-20 text-gray-500">No items found in this category.</div>
          ) : (
            filteredMenuData.map((categoryGroup) => (
              <div key={categoryGroup.category._id} className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                    {categoryGroup.category.name}
                  </h2>
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categoryGroup.items.map((item) => (
                    <div key={item._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col group">
                      <div className="h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden relative border border-gray-100">
                        {(item.images && item.images.length > 0) ? (
                          <ImageSlider images={item.images} interval={2500 + Math.random() * 2000} />
                        ) : item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1 leading-tight">{item.name}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-black text-accent text-lg">
                            {item.sizes?.length > 0 ? `From Rs. ${item.sizes[0].price}` : `Rs. ${item.price}`}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-50 flex gap-2">
                        <button onClick={() => handleEdit(item)} className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors border border-blue-100">
                          <Edit size={16} /> Edit
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 py-2.5 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors border border-red-100">
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdminMenuItems;
