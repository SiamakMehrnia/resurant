import { motion } from 'framer-motion';

const HomeIntro = () => {
  return (
    <section className="bg-[#1f1f1f] text-white min-h-screen flex flex-col justify-center items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-3xl text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Restaurant
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Experience the best culinary delights with a touch of luxury and elegance.
        </p>
      </motion.div>
    </section>
  );
};

export default HomeIntro;