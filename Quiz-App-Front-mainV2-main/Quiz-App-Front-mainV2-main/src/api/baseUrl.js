export const BASE_URL =
  (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").trim();
import axios from "axios";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
      console.error("Unauthorized: Please login again");
    } else if (error.response) {
      console.error("Server error:", error.response.data?.message || error.response.statusText);
    } else if (error.request) {
      console.error("No response from server");
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error); 
  }
);


