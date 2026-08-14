import { useState, useEffect } from "react";
import { fetchProducts, fetchProductsByCategory } from "../services/api";
import ProductCard from "./ProductCard";

const ProductGrid = ({ selectedCategory, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = selectedCategory
          ? await fetchProductsByCategory(selectedCategory)
          : await fetchProducts(20);

        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setError("Failed to load products. Please try again.");
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg"></div>
            <div className="h-4 bg-gray-200 rounded mt-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
            <div className="h-8 bg-gray-200 rounded mt-4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-gray-600 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-gray-600 text-lg">No products found</p>
        <p className="text-gray-400 text-sm mt-1">
          {searchQuery ? `No results for "${searchQuery}"` : "Try a different category"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
