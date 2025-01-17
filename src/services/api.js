import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const getFoodItems = async (category = null) => {
  // const url = category ? `/food?category=${category}` : "/food";
  const response = await api.get("/v1/core/latest-products/");
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/v1/core/categories/");
  return response.data;
};

export default api;
