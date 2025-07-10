import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

interface SearchOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isVisible, onClose }: SearchOverlayProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <div className="container mx-auto px-6 pt-20">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ y: -30, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="text-center mb-12"
              >
                <h2 className="font-orbitron text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-4">
                  ALVAZZ REKOT
                </h2>
                <p className="text-gray-300 text-lg font-playfair italic">Search through our luxury gaming collection</p>
              </motion.div>
              
              <motion.div
                initial={{ y: 30, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
                className="relative"
                onClick={e => e.stopPropagation()}
              >
                <input
                  type="text"
                  placeholder="Search for luxury gaming items..."
                  value={searchTerm}
                  onChange={handleInputChange}
                  autoFocus
                  className="w-full bg-gradient-to-r from-black/60 to-black/40 border-2 border-white/30 rounded-2xl px-8 py-6 text-white placeholder-gray-300 focus:outline-none focus:border-white/60 focus:shadow-2xl transition-all duration-300 text-lg font-playfair backdrop-blur-lg"
                />
                <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-300" size={24} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
