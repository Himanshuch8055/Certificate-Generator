import { motion } from 'framer-motion';
import { useEffect } from 'react';

const AnimatedPage = () => {
  useEffect(() => {
    document.title = 'Animated Page | Certificate Generator';
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="max-w-4xl mx-auto"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          variants={itemVariants}
        >
          Welcome to Our Animated Page
        </motion.h1>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {[1, 2, 3, 4].map((item) => (
            <motion.div
              key={item}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Feature {item}</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          variants={itemVariants}
        >
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedPage;
