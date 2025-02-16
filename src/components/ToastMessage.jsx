import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastMessage = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // الرسالة تختفي بعد 3 ثوانٍ

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
};

export default ToastMessage;