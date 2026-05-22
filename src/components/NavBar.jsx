import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { logout } from "../services/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

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

  return (
    <nav className="navbar navbar-expand-lg bg-white w-100 shadow">
      <div className="container-fluid">
        {/* ✅ Logo con texto */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" className="me-2 logo-img" />
        </Link>

        {/* 🔹 Botón para menú en móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔹 Menú de navegación */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          {!loading && (
            <ul className="navbar-nav">
              {!user ? (
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/">
                    🔑 Iniciar Sesión
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/dashboard">
                      📊 Dashboard
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
                          <Link className="nav-link text-dark" to="/lotes">
                            📦 Lotes
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link text-dark" to="/productos">
                            🏷️ Productos
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link text-dark" to="/clientes">
                            🤝 Clientes
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link text-dark" to="/salidas">
                            🚀 Entregado
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link text-dark" to="/lotes/ubicados-no-ubicados">
                            🔎 Ubicar
                          </Link>
                        </li>
                      </>
                    )}
                  {user?.rol &&
                    ["Administrador", "Jefe de operaciones"].includes(
                      user.rol
                    ) && (
                      <li className="nav-item">
                        <Link className="nav-link text-dark" to="/usuarios">
                          🛠️ Administrar Usuarios
                        </Link>
                      </li>
                    )}
                  <li className="nav-item">
                    <button
                      onClick={handleLogout}
                      className="btn btn-danger ms-2"
                    >
                      🚪 Cerrar Sesión
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
