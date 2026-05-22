import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {
  HomeIcon,
  ClipboardListIcon,
  UsersIcon,
  TruckIcon,
} from "@heroicons/react/outline";

const Sidebar = ({ className = "" }) => {
  const { user } = useContext(AuthContext);

  if (!user) return null; // Evitar renderizar sin usuario autenticado

  // Definir los elementos del menú con permisos
  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: HomeIcon },
    { path: "/productos", label: "Productos", icon: ClipboardListIcon },
    { path: "/clientes", label: "Clientes", icon: UsersIcon },
    { path: "/salidas", label: "Salidas", icon: TruckIcon },
  ];

  // Filtros de visibilidad por rol
  const allowedRoles = {
    Administrador: menuItems,
    "Jefe de operaciones": menuItems,
    Supervisor: menuItems.filter((item) => item.path !== "/usuarios"),
    Verificador: menuItems.filter((item) => item.path === "/salidas"),
  };

  const filteredMenu = allowedRoles[user?.rol?.puesto] || [];

  return (
    <div className={`w-64 bg-gray-800 text-white h-screen p-4 ${className}`}>
      <h2 className="text-lg font-bold mb-4">Menú</h2>
      <ul>
        {filteredMenu.map(({ path, label, icon: Icon }) => (
          <li key={path} className="mb-2">
            <Link
              to={path}
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <Icon className="w-5 h-5 mr-2" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ✅ Validación de Props
Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;
