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
  const response = await api.get("/core/latest-products/");
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/core/categories/");
  return response.data;
};

// New createOrder function
export const createOrder = async (orderData) => {
  const response = await api.post("/order/checkout/", orderData);
  return response.data;
};

export default api;
