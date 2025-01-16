import api from "./api";

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/token/login/", credentials);
  localStorage.setItem("token", response.data.auth_token);
  return response.data.user;
};

export const registerUser = async (userData) => {
  const response = await api.post("/accounts/users/", userData);
  localStorage.setItem("token", response.data.auth_token);
  return response.data.user;
};

export const logoutUser = async () => {
  localStorage.removeItem("token");
  await api.post("/auth/logout/");
};

export const getCurrentUser = async () => {
  try {
    console.log("Fetching current user...");
    const response = await api.get("/accounts/users/");
    console.log("Response received:", response);
    return response.data;
  } catch (error) {
    localStorage.removeItem("token");
    throw error;
  }
};

// Food-related API calls
export const getFoodItems = async (category = "") => {
  const response = await api.get(
    `/foods/${category ? `?category=${category}` : ""}`
  );
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/categories/");
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await api.post("/orders/", orderData);
  return response.data;
};
