import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si se especifican roles y el usuario no tiene uno permitido, redirige
  if (allowedRoles && !allowedRoles.includes(user?.rol?.puesto)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// ✅ Definir los tipos de propiedades
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Componente hijo protegido
  allowedRoles: PropTypes.arrayOf(PropTypes.string), // Lista de roles permitidos (opcional)
};

export default ProtectedRoute;
