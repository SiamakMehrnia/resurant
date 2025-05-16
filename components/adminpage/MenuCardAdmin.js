// components/adminpage/MenuCardAdmin.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const MenuCardAdmin = ({ item, onDelete, onEdit, onToggleAvailable }) => {
  const [isAvailable, setIsAvailable] = useState(item.available);

  useEffect(() => {
    setIsAvailable(item.available);
  }, [item.available]);

  const handleToggle = async () => {
    try {
      const updatedStatus = !isAvailable;
      setIsAvailable(updatedStatus);

      // ارسال درخواست PUT به API
      await axios.put(`/api/menuapi/${item._id}`, {
        available: updatedStatus,
      });
      
    } catch (error) {
      console.error("Error updating availability:", error);
      // اگر درخواست ناموفق بود، وضعیت را به حالت قبلی برگردان
      setIsAvailable(!isAvailable);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 relative flex flex-col items-center">
      <img src={item.image} alt={item.name} className="w-full h-36 object-cover rounded-md mb-3" />
      <h3 className="text-lg font-bold mb-1 text-center">{item.name}</h3>
      <p className="text-gray-600 text-sm text-center mb-2">{item.description}</p>
      <p className="text-gray-800 font-semibold mb-1">{item.price} €</p>
      <span className="text-xs text-gray-500 mb-2">{item.category}</span>
      <div className="absolute top-2 right-2 flex gap-2">
        <button className="bg-green-500 text-white px-2 py-1 rounded text-sm" onClick={() => onEdit(item)}>Edit</button>
        <button className="bg-red-500 text-white px-2 py-1 rounded text-sm" onClick={() => onDelete(item._id)}>Delete</button>
      </div>
      <button
        className={`mt-2 px-4 py-1 rounded ${isAvailable ? 'bg-blue-500 text-white' : 'bg-gray-400 text-gray-800'}`}
        onClick={handleToggle}
      >
        {isAvailable ? 'Available' : 'Not Available'}
      </button>
    </div>
  );
};

export default MenuCardAdmin;