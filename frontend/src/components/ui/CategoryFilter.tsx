import React from 'react';

interface CategoryFilterProps {
  categories: string[]; // Array of categories
  activeCategory: string; // Currently selected category
  onCategoryClick: (category: string) => void; // Function to handle category click
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeCategory, onCategoryClick }) => {
  return (
    <div className="flex justify-center flex-wrap gap-2">
      {categories.map(category => (
        <button
          key={category}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            activeCategory === category 
              ? 'bg-black font-semibold font-body text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-body'
          }`}
          onClick={() => onCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;