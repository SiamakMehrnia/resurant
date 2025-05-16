// components/menupage/MenuLayout.js
import { useState, useEffect } from 'react';
import MenuCard from "./MenuCard.js"


const categories = [
  "Heiß Getränke",
  "Alkoholfreie Getränke",
  "Alkoholische Getränke",
  "Desserts",
  "Vorspeise",
  "Hauptspeise"
];

const categoryColors = {
  "Heiß Getränke": "bg-gray-100 text-gray-800",
  "Alkoholfreie Getränke": "bg-gray-100 text-gray-800",
  "Alkoholische Getränke": "bg-gray-100 text-gray-800",
  "Desserts": "bg-gray-100 text-gray-800",
  "Vorspeise": "bg-gray-100 text-gray-800",
  "Hauptspeise": "bg-gray-100 text-gray-800",
};

const MenuLayout = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menuapi');
        const data = await response.json();
        if (data.success) {
          setMenuItems(data.data);
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
      <div className="bg-gray-50 min-h-screen py-10 px-6 pt-24">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 pt-10">Menu</h1>

        {/* Filter Section */}
        <div className="flex overflow-x-auto space-x-4 mb-8 py-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition whitespace-nowrap shadow-lg"
              onClick={() => {
                const element = document.getElementById(category);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="max-w-7xl mx-auto space-y-10">
          {categories.map((category) => (
            <div id={category} key={category} className={`${categoryColors[category]} p-8 rounded-lg shadow mb-8`}>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-wider">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {menuItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <MenuCard key={item._id} item={item} isAvailable={item.available} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default MenuLayout;
