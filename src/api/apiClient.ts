import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  withCredentials: true, // useful if backend uses cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: interceptors for tokens/logging
apiClient.interceptors.request.use((config) => {
  // Example: attach token if stored in localStorage
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
