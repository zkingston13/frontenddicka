import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { logout } from "../services/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const activeClass = (path) => {
    return location.pathname === path 
      ? "nav-link fw-bold text-primary border-bottom border-primary border-2 px-3 py-2" 
      : "nav-link text-secondary fw-medium px-3 py-2 transition-all";
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white w-100 border-bottom shadow-sm py-2">
      <div className="container-fluid px-4">
        
        {/* Logo de la empresa */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Dicka Logistics" className="me-2" style={{ height: "45px", objectFit: "contain" }} />
        </Link>

        {/* Botón menú móvil */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú de navegación principal */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          {!loading && (
            <ul className="navbar-nav align-items-lg-center gap-1">
              {!user ? (
                <li className="nav-item">
                  <Link className="btn btn-outline-primary btn-sm fw-semibold px-3" to="/">
                    Iniciar Sesión
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className={activeClass("/dashboard")} to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  {user?.rol &&
                    [
                      "Administrador",
                      "Jefe de operaciones",
                      "Supervisor",
                      "Verificador",
                    ].includes(user.rol) && (
                      <>
                        <li className="nav-item">
                          <Link className={activeClass("/lotes")} to="/lotes">
                            Lotes
                          </Link>
                        </li>
                           {/*/lotes/ubicados-no-ubicados */}
                        <li className="nav-item">
                          <Link className={activeClass("/racks/mapa")} to="/racks/mapa">
                           Mapa Racks
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className={activeClass("/productos")} to="/productos">
                            Productos
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className={activeClass("/clientes")} to="/clientes">
                            Clientes
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className={activeClass("/salidas")} to="/salidas">
                            Entregado
                          </Link>
                        </li>
                     
                      </>
                    )}
                  {user?.rol &&
                    ["Administrador", "Jefe de operaciones"].includes(
                      user.rol
                    ) && (
                      <li className="nav-item">
                        <Link className={activeClass("/usuarios")} to="/usuarios">
                          Administrar Usuarios
                        </Link>
                      </li>
                    )}
                  
                  {/* Botón de Cierre de Sesión */}
                  <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                    <button
                      onClick={handleLogout}
                      className="btn btn-sm btn-outline-danger fw-semibold px-3 py-1.5"
                      style={{ borderRadius: "5px" }}
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;