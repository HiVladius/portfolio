import { motion } from 'framer-motion';

export const LoadingSpinner = () => (
  <motion.div
    className="flex items-center justify-center mt-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
  </motion.div>
);