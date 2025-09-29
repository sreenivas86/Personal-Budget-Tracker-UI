// src/apis/axiosInstance.js
import axios from "axios";

const API_BASE_URL =  import.meta.env.VITE_API_URL||'http://40.81.231.150:8080';


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
