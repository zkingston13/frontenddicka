import api from "./api"; // Configuración centralizada de Axios

// ✅ Función para obtener el token de forma segura
const getToken = () => localStorage.getItem("token");

// ✅ Función para obtener el usuario desde localStorage
const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// 🔹 Función para iniciar sesión con nombreUsuario
export const login = async (nombreUsuario, password, setUser) => {
  try {
    const response = await api.post("/login", {
      nombreUsuario, // 🔹 Enviar con el nombre exacto que espera Laravel
      password,
    });

    const { token, usuario } = response.data; // ⚠️ Verifica si la API usa "usuario" o "user"

    if (!token || !usuario) {
      throw new Error("Respuesta de login inválida");
    }

    // ✅ Guardar datos en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(usuario));

    // ✅ Actualizar estado global del usuario
    setUser(usuario);

    return usuario; // 🔹 Retorna el usuario correctamente
  } catch (error) {
    console.error("❌ Error en login:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Función para obtener el usuario autenticado
export const getUser = async () => {
  try {
    // 🔹 Si el usuario ya está en localStorage, evitar llamada innecesaria al backend
    const storedUser = getStoredUser();
    if (storedUser) return storedUser;

    const response = await api.get("/user");

    const user = response.data;
    localStorage.setItem("user", JSON.stringify(user)); // ✅ Guardamos en localStorage

    return user;
  } catch (error) {
    console.error(
      "Error obteniendo usuario:",
      error.response?.data?.message || "Error desconocido"
    );

    // ❌ Si el token es inválido o expiró, cerramos sesión automáticamente
    if (error.response?.status === 401) {
      logout();
    }

    throw error;
  }
};

// 🔹 Función para cerrar sesión
export const logout = async () => {
  try {
    // ✅ Eliminar token y usuario antes de llamar a la API
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    await api.post("/logout"); // No es necesario enviar token, ya está en los headers
  } catch (error) {
    console.error(
      "Error en logout:",
      error.response?.data?.message || "Error desconocido"
    );
  }
};
