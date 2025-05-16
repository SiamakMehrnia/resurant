// components/adminpage/ManageHomeImages.js
import { useState, useEffect } from "react";

import axios from "axios";
import Swal from "sweetalert2";

const ManageHomeImages = () => {
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("/api/homeapi");
        setImages(res.data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleAddImage = async () => {
    if (!imageFile) return;

    setLoading(true);

      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post("/api/homeapi", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newImage = response.data.data;
      setImages([...images, newImage]);

      Swal.fire({
        icon: "success",
        title: "Uploaded!",
        text: "Image uploaded successfully."
      });

      setImageFile(null);
      setLoading(false);
  };

  const handleDeleteImage = async (public_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/api/homeapi?public_id=${public_id}`);
          setImages(images.filter((img) => img.public_id !== public_id));
          Swal.fire("Deleted!", "The image has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting image:", error);
          Swal.fire("Error", "Failed to delete the image.", "error");
        }
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-bold mb-4">Manage Homepage Images</h2>

      <div className="mb-4">
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleAddImage}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Image"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.public_id} className="relative bg-gray-200 p-4 rounded">
            <img
              src={img.url}
              alt={`Image ${img.public_id}`}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
              onClick={() => handleDeleteImage(img.public_id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageHomeImages;