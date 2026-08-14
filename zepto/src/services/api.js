const BASE_URL = "https://fakestoreapi.com";

// Fetch a list of products, optionally limited to `limit` results
export const fetchProducts = async (limit = 20) => {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch products (status ${res.status})`);
  }

  return res.json();
};

// Fetch products belonging to a single category
export const fetchProductsByCategory = async (category) => {
  const res = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(category)}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch category "${category}" (status ${res.status})`);
  }

  return res.json();
};

// Fetch the list of available category names
export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);

  if (!res.ok) {
    throw new Error(`Failed to fetch categories (status ${res.status})`);
  }

  return res.json();
};

// Fetch a single product by id (handy for a future product detail page)
export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id} (status ${res.status})`);
  }

  return res.json();
};