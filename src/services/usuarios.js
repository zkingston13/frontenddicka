import api from "./api";

// 🔹 Manejo centralizado de errores
const handleError = (error, mensaje = "Error en la solicitud") => {
  console.error(`${mensaje}:`, error.response?.data || error.message);
  return null; // 🔹 Retornar `null` en lugar de lanzar error para evitar bloqueos en la app
};

// ✅ Obtener todos los usuarios con token de autenticación
export const getUsuarios = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn(
        "⚠️ No hay token disponible. El usuario no está autenticado."
      );
      return []; // 🔹 Devolver un array vacío en lugar de lanzar error
    }

    const response = await api.get("/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Enviar el token en los headers
      },
    });

    return Array.isArray(response.data) ? response.data : []; // 🔹 Asegurar que siempre se devuelve un array
  } catch (error) {
    console.error(
      "❌ Error al obtener los usuarios:",
      error.response?.data || error.message
    );
    return []; // 🔹 Retornar array vacío para evitar errores en el frontend
  }
};

// ✅ Obtener un usuario por ID
export const getUsuario = async (id) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn(
        "⚠️ No hay token disponible. El usuario no está autenticado."
      );
      return null;
    }

    const response = await api.get(`/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data || null; // 🔹 Retornar null si el usuario no existe
  } catch (error) {
    console.error(
      `❌ Error al obtener el usuario con ID ${id}:`,
      error.response?.data || error.message
    );
    return null; // 🔹 Retornar null para evitar errores en la interfaz
  }
};

// ✅ Crear un usuario
export const createUsuario = async (data) => {
  try {
    const token = localStorage.getItem("token");

  

    const response = await api.post("/usuarios", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "❌ Error al crear el usuario:",
      error.response?.data || error.message
    );
    return null;
  }
};

// ✅ Actualizar un usuario por ID
export const updateUsuario = async (id, data) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn(
        "⚠️ No hay token disponible. El usuario no está autenticado."
      );
      return null;
    }

    const response = await api.put(`/usuarios/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      `❌ Error al actualizar el usuario con ID ${id}:`,
      error.response?.data || error.message
    );
    return null;
  }
};

// ✅ Eliminar un usuario por ID
export const deleteUsuario = async (id) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn(
        "⚠️ No hay token disponible. El usuario no está autenticado."
      );
      return false;
    }

    await api.delete(`/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (error) {
    console.error(
      `❌ Error al eliminar el usuario con ID ${id}:`,
      error.response?.data || error.message
    );
    return false;
  }
};
