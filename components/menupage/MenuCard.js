import axios from "axios";
import { useState } from "react";

const MenuCard = ({ item }) => {
  const [available, setAvailable] = useState(item.available);

  const handleToggleAvailability = async () => {
    try {
      const response = await axios.put(`/api/menuapi/${item._id}`, {
        available: !available,
      });
      console.log("Toggle response:", response.data);
      setAvailable(!available);
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  return (
    <div className={`relative bg-white shadow-lg hover:shadow-xl rounded-lg p-4 mb-4 flex flex-col items-center transition-transform transform hover:scale-105 sm:flex-row sm:items-start sm:gap-4 ${!available ? 'bg-gray-300 opacity-40 order-last' : ''}`}>
      {!available && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg flex-col p-4 z-10">
          <span className="text-white font-bold mb-2">Unavailable</span>
          <p className="text-xs text-white">Item: {item.name}</p>
          <p className="text-xs text-white">Category: {item.category}</p>
          <p className="text-xs text-white">Price: {item.price} €</p>
        </div>
      )}
      <img
        src={item.image}
        alt={item.name}
        className="w-full sm:w-24 h-32 object-cover rounded-md mb-3 sm:mb-0"
      />
      <div className="flex flex-col items-center sm:items-start">
        <h3 className="text-lg font-bold mb-1 text-center sm:text-left text-gray-800">
          {item.name}
        </h3>
        <p className="text-gray-600 text-sm text-center sm:text-left mb-2">
          {item.description}
        </p>
        <p className="text-gray-800 font-semibold mb-1">
          {item.price} €
        </p>
        <span className="text-xs text-gray-500">{item.category}</span>

        <button
          onClick={handleToggleAvailability}
          className={`mt-2 px-4 py-1 rounded ${available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {available ? "Mark as Unavailable" : "Mark as Available"}
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
