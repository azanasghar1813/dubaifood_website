import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, X, Upload, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const AdminDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [dealNumber, setDealNumber] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [includedItems, setIncludedItems] = useState(['']);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const res = await axios.get(`${API_URL}/public/deals`);
      setDeals(res.data);
    } catch (err) {
      toast.error('Failed to load deals');
    } finally {
      setLoading(false);
    }
  };

  const addItemField = () => {
    setIncludedItems([...includedItems, '']);
  };

  const removeItemField = (index) => {
    setIncludedItems(includedItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, value) => {
    const newItems = [...includedItems];
    newItems[index] = value;
    setIncludedItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('dealNumber', dealNumber);
    if (name) formData.append('name', name);
    formData.append('price', price);
    if (images.length > 0) {
      images.forEach(img => formData.append('images', img));
    }
    if (imagesToDelete.length > 0) {
      formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
    }
    formData.append('isFeatured', isFeatured);
    
    const validItems = includedItems.filter(item => item.trim() !== '');
    if (validItems.length > 0) formData.append('includedItems', JSON.stringify(validItems));

    setIsSubmitting(true);
    try {
      if (editingId) {
        await axios.put(`${API_URL}/admin/deals/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Deal updated successfully!');
      } else {
        await axios.post(`${API_URL}/admin/deals`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Deal added successfully!');
      }
      setShowForm(false);
      resetForm();
      fetchDeals();
    } catch (err) {
      toast.error('Failed to save deal');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (deal) => {
    setEditingId(deal._id);
    setDealNumber(deal.dealNumber);
    setName(deal.name || '');
    setPrice(deal.price);
    setIsFeatured(deal.isFeatured || false);
    
    let existing = deal.images || [];
    if (existing.length === 0 && deal.image) {
      existing = [{ url: deal.image, publicId: deal.imagePublicId }];
    }
    setExistingImages(existing);
    setImagesToDelete([]);
    setImages([]);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await axios.delete(`${API_URL}/admin/deals/${id}`);
        toast.success('Deal deleted');
        fetchDeals();
      } catch (err) {
        toast.error('Failed to delete deal');
      }
    }
  };

  const resetForm = () => {
    setDealNumber('');
    setName('');
    setPrice('');
    setImages([]);
    setExistingImages([]);
    setImagesToDelete([]);
    setIncludedItems(['']);
    setIsFeatured(false);
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Featured Deals</h1>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-secondary font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          <span>{showForm ? 'Cancel' : 'Add New Deal'}</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Deal' : 'Add New Deal'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Deal Number (e.g. Deal 1)</label>
                <input type="text" value={dealNumber} onChange={e => setDealNumber(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Deal Name (Optional)</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Price (Rs.)</label>
                <input type="number" required value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="flex items-center mt-8">
                <input type="checkbox" id="isFeatured" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary" />
                <label htmlFor="isFeatured" className="ml-3 block text-sm font-bold text-gray-700">Mark as Featured</label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Images (Optional)</label>
              
              {existingImages.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-4">
                  {existingImages.map(img => (
                    <div key={img.publicId || img.url} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                      <img src={img.url} alt="Deal item" className="w-full h-full object-cover" />
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

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Included Items</label>
              <div className="space-y-2">
                {includedItems.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input type="text" placeholder="e.g. 1 Large Pizza" value={item} onChange={e => handleItemChange(idx, e.target.value)} className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                    <button type="button" onClick={() => removeItemField(idx)} className="text-red-500 px-2"><X size={20} /></button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addItemField} className="text-primary text-sm font-bold mt-3">+ Add Item to Deal</button>
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
                    Saving Deal...
                  </>
                ) : editingId ? 'Update Deal' : 'Save Deal'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? <p>Loading deals...</p> : deals.map((deal) => (
          <div key={deal._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="h-48 bg-gray-100">
              {(deal.images && deal.images.length > 0) ? (
                <img src={deal.images[0].url} alt={deal.dealNumber} className="w-full h-full object-cover" />
              ) : deal.image ? (
                <img src={deal.image} alt={deal.dealNumber} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
              )}
            </div>
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    {deal.dealNumber}
                    {deal.isFeatured && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-bold">Featured</span>}
                  </h3>
                  {deal.name && <p className="text-sm text-gray-500 font-medium">{deal.name}</p>}
                </div>
                <div className="bg-primary/10 px-3 py-1 rounded-lg">
                  <span className="font-bold text-primary">Rs. {deal.price}</span>
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                {deal.includedItems?.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border-t border-gray-50 bg-gray-50/50 flex gap-2">
              <button onClick={() => handleEdit(deal)} className="flex-1 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition-colors font-medium text-sm border border-blue-100">
                <Edit size={16} /> Edit
              </button>
              <button onClick={() => handleDelete(deal._id)} className="flex-1 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors font-medium text-sm border border-red-100">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDeals;
