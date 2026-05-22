import { createContext, useState, useEffect } from "react";
import { getUser } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("❌ Error al parsear usuario desde localStorage:", error);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("🔹 Intentando obtener usuario desde API...");

      const token = localStorage.getItem("token");

      if (!token) {
        console.log("❌ No hay token almacenado, cerrando sesión.");
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const userData = await getUser();
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // ✅ Guarda en localStorage
        console.log("✅ Usuario obtenido:", userData);
      } catch (error) {
        console.error("❌ Error obteniendo usuario:", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
