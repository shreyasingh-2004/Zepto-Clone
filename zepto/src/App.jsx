import { useState } from "react";
import Header from "./component/Header";
import CategoryTabs from "./component/CategoryTabs";

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

        {/* Optional: testing search */}
        {searchQuery && (
          <p className="mt-4 text-gray-600">
            Searching for: <strong>{searchQuery}</strong>
          </p>
        )}
      </main>
    </div>
  );
}

export default App;