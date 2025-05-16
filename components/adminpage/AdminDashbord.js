import { useState, useEffect } from 'react';
import axios from 'axios';
import AddMenuItem from '@/components/adminpage/AddMenuItem';
import ManageHomeImages from '@/components/adminpage/ManageHomeImages';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('menu');
  const [menuItems, setMenuItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [homeImages, setHomeImages] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await axios.get('/api/menuapi');
        setMenuItems(res.data.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    const fetchHomeImages = async () => {
      try {
        const res = await axios.get('/api/homeImages');
        setHomeImages(res.data.data);
      } catch (error) {
        console.error('Error fetching home images:', error);
      }
    };

    fetchMenuItems();
    fetchHomeImages();
  }, []);

  const handleAddItem = (newItem) => {
    setMenuItems([...menuItems, newItem]);
    const fetchMenuItems = async () => {
      try {
        const res = await axios.get('/api/menuapi');
        setMenuItems(res.data.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  };

  const handleAddImage = (newImage) => {
    setHomeImages([...homeImages, newImage]);
    const fetchHomeImages = async () => {
      try {
        const res = await axios.get('/api/homeImages');
        setHomeImages(res.data.data);
      } catch (error) {
        console.error('Error fetching home images:', error);
      }
    };
    fetchHomeImages();
  };

  const handleDeleteImage = (index) => {
    setHomeImages(homeImages.filter((_, i) => i !== index));
    const fetchHomeImages = async () => {
      try {
        const res = await axios.get('/api/homeImages');
        setHomeImages(res.data.data);
      } catch (error) {
        console.error('Error fetching home images:', error);
      }
    };
    fetchHomeImages();
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6 pt-24">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Admin Dashboard</h1>

      <div className="max-w-7xl mx-auto mb-6 flex gap-4 justify-center">
        <button
          className={`py-2 px-4 rounded ${activeSection === 'menu' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveSection('menu')}
        >
          Manage Menu
        </button>
        <button
          className={`py-2 px-4 rounded ${activeSection === 'home' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveSection('home')}
        >
          Manage Homepage Images
        </button>
      </div>

      {activeSection === 'menu' ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Manage Menu Items</h2>
          <div className="mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Close Form' : 'Add Menu Item'}
            </button>
          </div>
          {showForm && <AddMenuItem onAdd={handleAddItem} onClose={() => setShowForm(false)} />}
        </div>
      ) : (
        <ManageHomeImages images={homeImages} onAddImage={handleAddImage} onDeleteImage={handleDeleteImage} />
      )}
    </div>
  );
};

export default AdminDashboard;
