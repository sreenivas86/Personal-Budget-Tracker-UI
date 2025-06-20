// src/apis/axiosInstance.js
import axios from "axios";

const API_BASE_URL =  import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
