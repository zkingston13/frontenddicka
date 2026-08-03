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

export const moverLoteASalidas = async (id) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No hay token disponible.");
    }

    const response = await api.post(
      `/lotes/${id}/salida`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    handleError(error, `Error al mandar el lote ${id} a salidas`);
    throw error;
  }
};
