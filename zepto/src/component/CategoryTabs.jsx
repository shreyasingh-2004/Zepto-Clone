import { useState, useEffect } from 'react';
import { fetchCategories } from '../services/api';

const CategoryTabs = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setError('Failed to load categories');
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex space-x-4 py-4 overflow-x-auto scrollbar-hide">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex-shrink-0 w-28 h-12 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 text-center text-red-500">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-[#00B207] underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex space-x-3 py-4 overflow-x-auto scrollbar-hide">
      <button
        onClick={() => onSelectCategory(null)}
        className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
          !selectedCategory
            ? 'bg-[#00B207] text-white shadow-lg shadow-[#00B207]/30'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
            selectedCategory === category
              ? 'bg-[#00B207] text-white shadow-lg shadow-[#00B207]/30'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;