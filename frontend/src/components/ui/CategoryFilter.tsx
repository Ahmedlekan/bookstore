import React from 'react';
import { motion} from 'framer-motion';

interface CategoryFilterProps {
  categories: string[]; // Array of categories
  activeCategory: string; // Currently selected category
  onCategoryClick: (category: string) => void; // Function to handle category click
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeCategory, onCategoryClick }) => {
  return (
    <div className="flex justify-center flex-wrap gap-2">
      {categories.map(category => (
        <motion.button
          key={category}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            activeCategory === category 
              ? 'bg-black font-semibold font-body text-white' 
              : 'bg-gray-200 hover:bg-rose-400 text-gray-700 font-body'
          }`}
          onClick={() => onCategoryClick(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;