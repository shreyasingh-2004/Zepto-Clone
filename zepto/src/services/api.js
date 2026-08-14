import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com/";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Get products with optional limit
export const fetchProducts = async (limit = 20) => {
    try {
        const response = await api.get(`/products?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}; 

// Get products by category
export const fetchProductsByCategory = async (category) => {
    try {
        const response = await api.get(`/products/category/${category}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching products by category:", error);
        throw error;
    }
};

// Get all categories
export const fetchCategories = async () => {
    try {
        const response = await api.get("/products/categories");
        return response.data;
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// Get single product by ID
export const fetchProduct = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};

// Get products by category with limit
export const fetchProductsByCategoryWithLimit = async (category, limit = 10) => {
    try {
        const response = await api.get(`/products/category/${category}?limit=${limit}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching products by category with limit:", error);
        throw error;
    }
};