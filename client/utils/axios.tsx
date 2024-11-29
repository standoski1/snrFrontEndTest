import axios from "axios";
import https from "https";

export const axiosInstance = axios.create({
  baseURL: process.env.baseURL || "http://localhost:3001/",
  timeout: 360000,
  httpsAgent: new https.Agent({ keepAlive: true }),
});

// Request interceptor to include Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle errors during request configuration
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor for centralized error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: Handle 401 errors globally
    if (error.response?.status === 401) {
      // window.location.replace("/auth/signin");
    }
    return Promise.reject(error);
  }
);
