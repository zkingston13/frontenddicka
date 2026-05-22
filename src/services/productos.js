import api from "./api";

// 🔹 Manejo centralizado de errores
const handleError = (error, mensaje = "Error en la solicitud") => {
  console.error(`${mensaje}:`, error.response?.data || error.message);
  throw error;
};

// ✅ Obtener todos los productos
export const getProductos = async () => {
  try {
    const token = localStorage.getItem("token"); // ✅ Obtener el token
    if (!token)
      throw new Error(
        "⚠️ No hay token disponible. El usuario no está autenticado."
      );

    const response = await api.get("/productos", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Enviar el token en los headers
      },
    });

    return response.data;
  } catch (error) {
    handleError(error, "❌ Error al obtener los productos");
  }
};

// ✅ Obtener un producto por ID
export const getProducto = async (id) => {
  try {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, `Error al obtener el producto con ID ${id}`);
  }
};

// ✅ Crear un nuevo producto
export const createProducto = async (data) => {
  try {
    const response = await api.post("/productos", data);
    return response.data;
  } catch (error) {
    handleError(error, "Error al crear el producto");
  }
};

// ✅ Actualizar un producto por ID
export const updateProducto = async (id, data) => {
  try {
    const response = await api.put(`/productos/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error, `Error al actualizar el producto con ID ${id}`);
  }
};

// ✅ Eliminar un producto por ID
export const deleteProducto = async (id) => {
  try {
    await api.delete(`/productos/${id}`);
  } catch (error) {
    handleError(error, `Error al eliminar el producto con ID ${id}`);
  }
};
