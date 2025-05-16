// components/adminpage/AdminLayout.js
import { useState, useEffect } from "react";
import AddMenuItem from "./AddMenuItem";
import ManageHomeImages from "./ManageHomeImages";
import MenuCardAdmin from "./MenuCardAdmin";
import Swal from "sweetalert2";

const AdminLayout = () => {
  const [activeSection, setActiveSection] = useState("menu");
  const [menuItems, setMenuItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [homeImages, setHomeImages] = useState([]);

  const handleToggleAvailable = (id) => {
    const updatedItems = menuItems.map((item) =>
      item._id === id ? { ...item, available: !item.available } : item
    );
    setMenuItems(updatedItems);

    const toggledItem = updatedItems.find((item) => item._id === id);
    Swal.fire({
      icon: toggledItem.available ? 'success' : 'info',
      title: toggledItem.available ? 'Item Available' : 'Item Not Available',
      text: `The item is now ${toggledItem.available ? 'available' : 'not available'}.`,
    });
  };

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

  const handleAddItem = (newItem) => {
    if (editingItem) {
      setMenuItems(
        menuItems.map((item) =>
          item._id === editingItem._id ? { ...item, ...newItem } : item
        )
      );
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "The item has been successfully updated.",
      });
      setEditingItem(null);
    } else {
      setMenuItems([...menuItems, { ...newItem, _id: Date.now().toString() }]);
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "New item has been added.",
      });
    }
    setShowForm(false);
  };

  const handleDeleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setMenuItems(menuItems.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "The item has been deleted.", "success");
      }
    });
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6 pt-24 text-black">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Admin Dashboard</h1>

      <div className="max-w-7xl mx-auto mb-6 flex gap-4 justify-center">
        <button
          className={`py-2 px-4 rounded ${
            activeSection === "menu" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveSection("menu")}
        >
          Manage Menu
        </button>
        <button
          className={`py-2 px-4 rounded ${
            activeSection === "home" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveSection("home")}
        >
          Manage Homepage Images
        </button>
      </div>

      {activeSection === "menu" ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Manage Menu Items</h2>
          <div className="mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => {
                setShowForm(!showForm);
                setEditingItem(null);
              }}
            >
              {showForm ? "Close Form" : "Add Menu Item"}
            </button>
          </div>

          {showForm && (
            <AddMenuItem
              onAdd={handleAddItem}
              onClose={() => {
                setShowForm(false);
                setEditingItem(null);
              }}
              editingItem={editingItem}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {menuItems.map((item) => (
              <MenuCardAdmin
                key={item._id}
                item={item}
                onDelete={handleDeleteItem}
                onEdit={handleEditItem}
                onToggleAvailable={handleToggleAvailable}
              />
            ))}
          </div>
        </div>
      ) : (
        <ManageHomeImages images={homeImages} />
      )}
    </div>
  );
};

export default AdminLayout;