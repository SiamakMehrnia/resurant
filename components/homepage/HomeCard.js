import { motion } from 'framer-motion';
import { useState, useEffect } from "react";
import axios from "axios";

const HomeCard = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/homeapi");
        setImages(response.data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="bg-[#f0f0f0] py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <motion.div
            key={img.public_id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img src={img.url} alt={`Image ${index + 1}`} className="w-full h-48 object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HomeCard;