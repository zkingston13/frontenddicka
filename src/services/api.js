import axios from "axios";

// 🔹 Configurar la URL desde variables de entorno
const API_BASE_URL =
  // import.meta.env.VITE_API_URL || "http://172.20.13.196:8000/api";
 import.meta.env.VITE_API_URL || "http://3.16.113.134/api";

// 🔹 Crear instancia global de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Interceptor para agregar el token a cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Interceptor para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // 🔥 Si el token es inválido o ha expirado, eliminarlo y redirigir al login
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirigir a login
      }
    }
    return Promise.reject(error);
  }
);

export default api;
