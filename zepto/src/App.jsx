import { useState } from "react";
import Header from "./component/Header";
import CategoryTabs from "./component/CategoryTabs";
import ProductGrid from "./component/ProductGrid";

function App() {
  const [selectedCategory, setCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={setSearchQuery} />

      <main className="container-custom py-4">
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setCategory}
        />

        {searchQuery && (
          <p className="mt-2 mb-4 text-gray-600">
            Searching for: <strong>{searchQuery}</strong>
          </p>
        )}

        <ProductGrid
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
        />
      </main>
    </div>
  );
}

export default App;
