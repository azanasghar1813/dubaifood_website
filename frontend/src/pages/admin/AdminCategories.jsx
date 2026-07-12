import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit, X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const AdminCategories = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);

  // Data states
  const [homeCats, setHomeCats] = useState([]);
  const [menuCats, setMenuCats] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resHome, resMenu, resFilter] = await Promise.all([
        axios.get(`${API_URL}/public/categories/home`),
        axios.get(`${API_URL}/public/categories/menu`),
        axios.get(`${API_URL}/public/filters`)
      ]);
      setHomeCats(resHome.data);
      setMenuCats(resMenu.data);
      setFilters(resFilter.data);
    } catch (err) {
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories & Filters</h1>
          <p className="text-gray-500 mt-1">Manage dynamic categories across your website</p>
        </div>
      </div>

      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('home')}
          className={`pb-4 px-4 font-bold ${activeTab === 'home' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Home Categories
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`pb-4 px-4 font-bold ${activeTab === 'menu' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Menu Categories
        </button>
        <button
          onClick={() => setActiveTab('filters')}
          className={`pb-4 px-4 font-bold ${activeTab === 'filters' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Filters
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-500">Loading data...</div>
      ) : (
        <>
          {activeTab === 'home' && <HomeCategoriesManager data={homeCats} refresh={fetchData} />}
          {activeTab === 'menu' && <MenuCategoriesManager data={menuCats} refresh={fetchData} />}
          {activeTab === 'filters' && <FiltersManager data={filters} refresh={fetchData} />}
        </>
      )}
    </div>
  );
};

// ----------------------------------------------------
// HOME CATEGORIES MANAGER
// ----------------------------------------------------
const HomeCategoriesManager = ({ data, refresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('/menu');
  const [image, setImage] = useState(null);

  const reset = () => {
    setEditingId(null);
    setName('');
    setIcon('');
    setDesc('');
    setLink('/menu');
    setImage(null);
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setName(cat.name);
    setIcon(cat.icon);
    setDesc(cat.desc || '');
    setLink(cat.link || '/menu');
    setImage(null); // Keep existing unless changed
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this home category?')) {
      try {
        await axios.delete(`${API_URL}/admin/categories/home/${id}`);
        toast.success('Deleted successfully');
        refresh();
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('icon', icon);
    formData.append('desc', desc);
    formData.append('link', link);
    if (image) formData.append('image', image);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/admin/categories/home/${editingId}`, formData);
      } else {
        await axios.post(`${API_URL}/admin/categories/home`, formData);
      }
      toast.success('Saved successfully');
      setShowForm(false);
      reset();
      refresh();
    } catch (err) {
      toast.error('Failed to save');
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={() => { setShowForm(!showForm); reset(); }} className="btn-primary flex items-center gap-2">
          {showForm ? <X size={18} /> : <Plus size={18} />} {showForm ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2">Category Name</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. Burgers" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Icon (Emoji or Text)</label>
            <input required type="text" value={icon} onChange={e => setIcon(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. 🍔" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Description</label>
            <input type="text" value={desc} onChange={e => setDesc(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. Juicy & Crispy" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Link</label>
            <input type="text" value={link} onChange={e => setLink(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. /menu" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2">Image (Optional Cloudinary Upload)</label>
            <input type="file" onChange={e => setImage(e.target.files[0])} className="w-full" accept="image/*" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full btn-primary py-3">{editingId ? 'Update' : 'Save'}</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map(cat => (
          <div key={cat._id} className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col items-center text-center">
            {cat.image ? (
              <img src={cat.image} alt={cat.name} className="w-16 h-16 rounded-full mb-4 object-cover" />
            ) : (
              <div className="text-4xl mb-4">{cat.icon}</div>
            )}
            <h3 className="font-bold text-lg">{cat.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{cat.desc}</p>
            <div className="mt-auto flex gap-2 w-full">
              <button onClick={() => handleEdit(cat)} className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-bold">Edit</button>
              <button onClick={() => handleDelete(cat._id)} className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-bold">Delete</button>
            </div>
          </div>
        ))}
        {data.length === 0 && !showForm && <div className="col-span-3 py-10 text-center text-gray-500">No home categories found.</div>}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// MENU CATEGORIES MANAGER
// ----------------------------------------------------
const MenuCategoriesManager = ({ data, refresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [idStr, setIdStr] = useState('');
  const [label, setLabel] = useState('');
  const [subcats, setSubcats] = useState('');

  const reset = () => {
    setEditingId(null);
    setIdStr('');
    setLabel('');
    setSubcats('');
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setIdStr(cat.id);
    setLabel(cat.label);
    setSubcats(cat.categories.join(', '));
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this menu category?')) {
      try {
        await axios.delete(`${API_URL}/admin/categories/menu/${id}`);
        toast.success('Deleted successfully');
        refresh();
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoriesArray = subcats.split(',').map(s => s.trim()).filter(Boolean);
    const payload = { id: idStr, label, categories: categoriesArray };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/admin/categories/menu/${editingId}`, payload);
      } else {
        await axios.post(`${API_URL}/admin/categories/menu`, payload);
      }
      toast.success('Saved successfully');
      setShowForm(false);
      reset();
      refresh();
    } catch (err) {
      toast.error('Failed to save');
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={() => { setShowForm(!showForm); reset(); }} className="btn-primary flex items-center gap-2">
          {showForm ? <X size={18} /> : <Plus size={18} />} {showForm ? 'Cancel' : 'Add Menu Tab'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border mb-8 grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2">ID (Slug, no spaces)</label>
            <input required type="text" value={idStr} onChange={e => setIdStr(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. fastfood" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Label (Displayed on Tab)</label>
            <input required type="text" value={label} onChange={e => setLabel(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. 🍔 Fast Food & Pizza" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Sub-categories (Comma separated)</label>
            <textarea required value={subcats} onChange={e => setSubcats(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. Pizza, Burgers, Pasta" rows="3" />
          </div>
          <button type="submit" className="w-full btn-primary py-3">{editingId ? 'Update' : 'Save'}</button>
        </form>
      )}

      <div className="space-y-4">
        {data.map(cat => (
          <div key={cat._id} className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-bold text-lg mb-1">{cat.label} <span className="text-sm font-normal text-gray-500">({cat.id})</span></h3>
              <div className="flex flex-wrap gap-2">
                {cat.categories.map((sub, idx) => (
                  <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-700">{sub}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto shrink-0">
              <button onClick={() => handleEdit(cat)} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold">Edit</button>
              <button onClick={() => handleDelete(cat._id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold">Delete</button>
            </div>
          </div>
        ))}
        {data.length === 0 && !showForm && <div className="py-10 text-center text-gray-500">No menu categories found.</div>}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// FILTERS MANAGER
// ----------------------------------------------------
const FiltersManager = ({ data, refresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');

  const handleDelete = async (id) => {
    if (window.confirm('Delete this filter?')) {
      try {
        await axios.delete(`${API_URL}/admin/filters/${id}`);
        toast.success('Deleted successfully');
        refresh();
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/admin/filters`, { name });
      toast.success('Filter added');
      setShowForm(false);
      setName('');
      refresh();
    } catch (err) {
      toast.error('Failed to add filter');
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          {showForm ? <X size={18} /> : <Plus size={18} />} {showForm ? 'Cancel' : 'Add Filter'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border mb-8 flex gap-4">
          <input required type="text" value={name} onChange={e => setName(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg" placeholder="e.g. Spicy" />
          <button type="submit" className="btn-primary px-8">Save</button>
        </form>
      )}

      <div className="flex flex-wrap gap-4">
        {data.map(filter => (
          <div key={filter._id} className="bg-white px-4 py-3 rounded-xl shadow-sm border flex items-center gap-3">
            <span className="font-bold">{filter.name}</span>
            <button onClick={() => handleDelete(filter._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded-lg"><Trash2 size={16}/></button>
          </div>
        ))}
        {data.length === 0 && !showForm && <div className="w-full py-10 text-center text-gray-500">No filters found.</div>}
      </div>
    </div>
  );
};

export default AdminCategories;
