import api from "./api";

// 🔹 Manejo centralizado de errores con control de sesión
const handleError = (error, mensaje = "Error en la solicitud") => {
  console.error(`${mensaje}:`, error.response?.data || error.message);

  // 🔥 Si es error 401, redirigir al login
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  throw error;
};

// ✅ Obtener todas las salidas con datos relacionados (lote, usuario)
export const getSalidas = async () => {
  try {
    const response = await api.get("/salidas");
    return response.data;
  } catch (error) {
    handleError(error, "Error al obtener las salidas");
  }
};

// ✅ Obtener una salida por ID
export const getSalida = async (id) => {
  try {
    const response = await api.get(`/salidas/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, `Error al obtener la salida con ID ${id}`);
  }
};

// ✅ Registrar una nueva salida
export const registrarSalida = async (data) => {
  try {
    const response = await api.post("/salidas", data);
    return response.data;
  } catch (error) {
    handleError(error, "Error al registrar la salida");
  }
};

// ✅ Actualizar una salida por ID
export const updateSalida = async (id, data) => {
  try {
    const response = await api.put(`/salidas/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error, `Error al actualizar la salida con ID ${id}`);
  }
};
