import api from "./api"; // Axios preconfigurado

// Obtener racks
export const getRacks = async () => {
  try {
    const res = await api.get("/racks");
    return res.data;
  } catch (error) {
    console.error("❌ Error al cargar racks:", error);
    return []; // Evita que la vista crashee
  }
};

// Obtener niveles de un rack
export const getNiveles = async (rackId) => {
  try {
    const res = await api.get(`/racks/${rackId}/niveles`);
    return res.data;
  } catch (error) {
    console.error("❌ Error al cargar niveles:", error);
    return [];
  }
};

// Obtener ubicaciones por nivel
export const getUbicaciones = async (rackId, nivel) => {
  try {
    const res = await api.get(`/racks/${rackId}/niveles/${nivel}/ubicaciones`);
    return res.data;
  } catch (error) {
    console.error("❌ Error al cargar ubicaciones:", error);
    return [];
  }
};

// Actualizar estado
export const actualizarUbicacion = async (id, data) => {
  try {
    const res = await api.put(`/ubicaciones/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("❌ Error al actualizar ubicación:", error);
    throw error;
  }

};

