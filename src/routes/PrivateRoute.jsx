import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  // 🔹 Mostrar un "Cargando..." mientras se valida el usuario
  if (loading) return <p>Cargando...</p>;

  // 🔹 Si el usuario no está autenticado, redirigir al login
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
