// components/adminpage/AddMenuItem.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const AddMenuItem = ({ onAdd, onClose, editingItem }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setDescription(editingItem.description);
      setPrice(editingItem.price);
      setCategory(editingItem.category);
      setAvailable(editingItem.available);
    }
  }, [editingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = editingItem?.image || '';

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        const uploadRes = await axios.post('/api/upload', formData);
        imageUrl = uploadRes.data.url;
      }

      const newItem = { name, description, price, category, image: imageUrl, available };
      
      if (editingItem) {
        await axios.put(`/api/menuapi/${editingItem._id}`, newItem);
      } else {
        await axios.post('/api/menuapi', newItem);
      }

      setLoading(false);
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImageFile(null);
      setAvailable(false);
      onClose();
    } catch (error) {
      console.error('Error adding/updating item:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-bold mb-4">{editingItem ? 'Edit Item' : 'Add New Menu Item'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Price (€)</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Category</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Heiß Getränke">Heiß Getränke</option>
            <option value="Alkoholfreie Getränke">Alkoholfreie Getränke</option>
            <option value="Alkoholische Getränke">Alkoholische Getränke</option>
            <option value="Desserts">Desserts</option>
            <option value="Vorspeise">Vorspeise</option>
            <option value="Hauptspeise">Hauptspeise</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Image</label>
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Available</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={available}
            onChange={(e) => setAvailable(e.target.value === 'true')}
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Saving...' : editingItem ? 'Update Item' : 'Add Item'}
        </button>
      </form>
    </div>
  );
};

export default AddMenuItem;