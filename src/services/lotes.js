import api from "./api";

// 🔹 Manejo centralizado de errores
const handleError = (error, mensaje = "Error en la solicitud") => {
  console.error(`${mensaje}:`, error.response?.data || error.message);
  throw error;
};

// ✅ Obtener todos los lotes con autenticación
export const getLotes = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error(
        "⚠️ No hay token disponible. El usuario no está autenticado."
      );
    }

    const response = await api.get("/lotes", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data ?? []; // ✅ Si la respuesta es undefined, retorna un array vacío
  } catch (error) {
    handleError(error, "❌ Error al obtener lotes");
  }
};

// ✅ Obtener un lote por ID con autenticación
export const getLote = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error(
        "⚠️ No hay token disponible. El usuario no está autenticado."
      );
    }

    const response = await api.get(`/lotes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    handleError(error, `❌ Error al obtener el lote con ID ${id}`);
  }
};

// ✅ Crear un nuevo lote con autenticación
export const createLote = async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error(
        "⚠️ No hay token disponible. El usuario no está autenticado."
      );
    }

    // 🔹 Reemplazar 'numPiezas' por 'piezasPalet' y eliminar 'piezasLote'
    const loteData = {
      ...data,
      piezasPalet: data.piezasPalet, // ✅ Mantener piezasPalet
    };
    delete loteData.piezasLote; // ❌ No enviar piezasLote

    const response = await api.post("/lotes", loteData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    handleError(error, "❌ Error al crear el lote");
  }
};

// ✅ Actualizar un lote por ID con autenticación
export const updateLote = async (id, data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error(
        "⚠️ No hay token disponible. El usuario no está autenticado."
      );
    }

    // 🔹 Reemplazar 'numPiezas' por 'piezasPalet' y eliminar 'piezasLote'
    const loteData = {
      ...data,
      piezasPalet: data.piezasPalet, // ✅ Mantener piezasPalet
    };
    delete loteData.piezasLote; // ❌ No enviar piezasLote

    const response = await api.put(`/lotes/${id}`, loteData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    handleError(error, `❌ Error al actualizar el lote con ID ${id}`);
  }
};

// ✅ Eliminar un lote por ID con autenticación
export const deleteLote = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error(
        "⚠️ No hay token disponible. El usuario no está autenticado."
      );
    }

    await api.delete(`/lotes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    handleError(error, `❌ Error al eliminar el lote con ID ${id}`);
  }
};

// ✅ Imprimir todas las etiquetas de un lote
export const imprimirEtiqueta = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error(
        "⚠️ No hay token disponible. El usuario no está autenticado."
      );
    }

    const response = await api.post(
      `/lotes/${id}/imprimir-etiquetas`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    handleError(
      error,
      `❌ Error al imprimir las etiquetas del lote con ID ${id}`
    );
  }
};

// Seccion de Material "U", "NoU" 
// ✅ Buscar por "lote"
export const buscarLote = async (lote) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("⚠️ No hay token disponible.");
    const response = await api.get(`/lotes/buscar/${lote}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data ?? [];
  } catch (error) {
    handleError(error, "❌ Error al buscar lote");
  }
};

// ✅ Lotes Ubicados
export const getLotesUbicados = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("⚠️ No hay token disponible.");
    const response = await api.get("/lotes/ubicados", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data ?? [];
  } catch (error) {
    handleError(error, "❌ Error al obtener lotes ubicados");
  }
};

// ✅ Lotes No Ubicados
export const getLotesNoUbicados = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("⚠️ No hay token disponible.");
    const response = await api.get("/lotes/no-ubicados", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data ?? [];
  } catch (error) {
    handleError(error, "❌ Error al obtener lotes no ubicados");
  }
};

// ✅ Detalle de Lote (info + recomendaciones si no está ubicado)
export const getDetalleLote = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("⚠️ No hay token disponible.");

    const response = await api.get(`/lotes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    handleError(error, `❌ Error al obtener detalle del lote ${id}`);
    throw error;
  }
};

// ✅ Método para obtener recomendaciones (cuando NO está ubicado)
export const getRecomendacionLote = async (id) => {
  try {
    const res = await api.get(`/lotes/${id}/recomendar`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener recomendaciones:", error);
    throw error;
  }
};

export const terminarUbicacionLote = async (id) => {
  try {
    const res = await api.put(`/lotes/${id}/terminado`);
    return res.data;
  } catch (error) {
    console.error("Error al terminar ubicación del lote:", error);
    throw error;
  }
};

