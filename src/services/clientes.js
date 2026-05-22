import api from "./api";

// 🔹 Manejo centralizado de errores
const handleError = (error, mensaje = "Error en la solicitud") => {
  console.error(`${mensaje}:`, error.response?.data || error.message);
  throw error;
};

// ✅ Obtener todos los clientes
export const getClientes = async () => {
  try {
    const response = await api.get("/clientes");
    return response.data; // ✅ Devolvemos directamente los datos
  } catch (error) {
    handleError(error, "Error al obtener clientes");
  }
};

// ✅ Eliminar un cliente por ID
export const deleteCliente = async (id) => {
  try {
    await api.delete(`/clientes/${id}`);
  } catch (error) {
    handleError(error, `Error al eliminar cliente con ID ${id}`);
  }
};
