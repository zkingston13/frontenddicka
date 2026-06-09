import React, { useEffect, useState, useContext } from "react";
import { getUsuarios, deleteUsuario } from "../../services/usuarios";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setIsLoading(true);
      const response = await getUsuarios();
      setUsuarios(response || []);
      setError("");
    } catch (err) {
      setError("Error al cargar la lista de usuarios.");
      setUsuarios([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar permanentemente este usuario?")) return;

    try {
      const eliminado = await deleteUsuario(id);
      if (eliminado) {
        setUsuarios((prevUsuarios) => prevUsuarios.filter((u) => u.id !== id));
      } else {
        setError("No se pudo completar la eliminación del usuario.");
      }
    } catch (err) {
      setError("Error al intentar eliminar al usuario solicitado.");
    }
  };

  return (
    <div className="container-fluid px-4 py-4" style={{ backgroundColor: "#fdfdfd", minHeight: "100vh" }}>
      
      {/* Encabezado Principal Unificado */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center border-bottom pb-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-0" style={{ letterSpacing: "-0.5px" }}>Administración de Usuarios</h2>
          <p className="text-muted small mb-0">Gestión de credenciales, roles y accesos al sistema de inventario</p>
        </div>
        
        <div className="mt-3 mt-md-0 w-100 w-md-auto text-end">
          <Link 
            to="/usuarios/nuevo" 
            className="btn btn-primary btn-sm fw-medium px-3 text-nowrap"
            style={{ borderRadius: "6px" }}
          >
            Crear Usuario
          </Link>
        </div>
      </div>

      {/* Alertas de error */}
      {error && <div className="alert alert-danger shadow-sm border-0 small text-center mb-4">{error}</div>}

      {/* Spinner de Carga Estilizado */}
      {isLoading && (
        <div className="text-center my-5 py-5">
          <div className="spinner-border text-primary spinner-border-sm" role="status"></div>
          <p className="text-muted small mt-2">Consultando registros del personal...</p>
        </div>
      )}

      {/* Tabla de Control Operativo */}
      {!isLoading && (
        <div className="card border shadow-sm" style={{ borderRadius: "8px" }}>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.88rem" }}>
              <thead className="table-light border-bottom text-muted">
                <tr>
                  <th className="py-2.5 ps-3 text-center" style={{ width: "8%" }}>ID</th>
                  <th className="py-2.5" style={{ width: "25%" }}>Nombre Completo</th>
                  <th className="py-2.5 font-monospace" style={{ width: "18%" }}>Usuario</th>
                  <th className="py-2.5" style={{ width: "22%" }}>Email</th>
                  <th className="py-2.5 text-center" style={{ width: "12%" }}>Rol</th>
                  <th className="py-2.5 text-center pe-3" style={{ width: "15%" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length > 0 ? (
                  usuarios.map((usuario) => (
                    <tr key={usuario.id} className="border-bottom">
                      <td className="py-3 text-center text-muted font-monospace">{usuario.id}</td>
                      <td className="py-3 text-dark fw-medium">{usuario.nombre || "Sin nombre"}</td>
                      <td className="py-3 font-monospace text-secondary">{usuario.nombreUsuario || "No asignado"}</td>
                      <td className="py-3 text-secondary">{usuario.email || "No registrado"}</td>
                      <td className="py-3 text-center">
                        <span 
                          className={`badge rounded-pill px-2.5 py-1.5 font-monospace ${
                            usuario.rol?.puesto?.toLowerCase().includes("admin") 
                              ? "bg-dark-subtle text-dark border border-dark-subtle" 
                              : "bg-light text-secondary border"
                          }`}
                          style={{ fontSize: "0.75rem" }}
                        >
                          {usuario.rol?.puesto || "Sin rol"}
                        </span>
                      </td>
                      <td className="py-3 text-center pe-3">
                        <div className="d-inline-flex gap-1.5">
                          <Link
                            to={`/usuarios/editar/${usuario.id}`}
                            className="btn btn-outline-secondary btn-xs fw-medium"
                            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", borderRadius: "4px" }}
                          >
                            Editar
                          </Link>
                          {user?.rol_id === 1 && (
                            <button
                              onClick={() => handleDelete(usuario.id)}
                              className="btn btn-outline-danger btn-xs fw-semibold"
                              style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", borderRadius: "4px" }}
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted small">
                      No se encontraron registros de usuarios en la base de datos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;