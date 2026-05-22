import React, { useEffect, useState, useContext } from "react";
import { getUsuarios, deleteUsuario } from "../../services/usuarios";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]); // 🔹 Asegurar array inicial
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
      setUsuarios(response || []); // 🔹 Evita `undefined.length`
      setError("");
    } catch (err) {
      setError("❌ Error al cargar usuarios.");
      setUsuarios([]); // 🔹 Asegurar que `usuarios` siempre sea un array
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("🗑️ ¿Estás seguro de eliminar este usuario?")) return;

    try {
      const eliminado = await deleteUsuario(id);
      if (eliminado) {
        setUsuarios((prevUsuarios) => prevUsuarios.filter((u) => u.id !== id));
      } else {
        setError("❌ No se pudo eliminar el usuario.");
      }
    } catch (err) {
      setError("❌ Error al eliminar usuario.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">🛠️ Administración de Usuarios</h1>

      {/* 🔹 Botón para crear usuario */}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/usuarios/nuevo" className="btn btn-primary">
          ➕ Crear Usuario
        </Link>
      </div>

      {/* 🔹 Mostrar errores */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* 🔹 Mostrar spinner de carga */}
      {isLoading && (
        <div className="text-center my-3">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2">Cargando usuarios...</p>
        </div>
      )}

      {/* 🔹 Tabla responsiva con Bootstrap */}
      {!isLoading && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark text-center">
              <tr>
                <th>🆔 ID</th>
                <th>👤 Nombre Completo</th>
                <th>🆎 Usuario</th>
                <th>📧 Email</th>
                <th>🔑 Rol</th>
                <th>⚙️ Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre || "Sin nombre"}</td>{" "}
                    {/* ✅ Nombre completo */}
                    <td>{usuario.nombreUsuario || "❌ No asignado"}</td>{" "}
                    {/* ✅ Nombre de usuario */}
                    <td>
                      {usuario.email ? usuario.email : "📭 No tiene email"}
                    </td>{" "}
                    {/* ✅ Mostrar email si está disponible */}
                    <td>
                      {usuario.rol && usuario.rol.puesto
                        ? usuario.rol.puesto
                        : "🔘 Sin rol"}
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/usuarios/editar/${usuario.id}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        ✏️ Editar
                      </Link>
                      {user?.rol_id === 1 && (
                        <button
                          onClick={() => handleDelete(usuario.id)}
                          className="btn btn-danger btn-sm"
                        >
                          🗑️ Eliminar
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    ⚠️ No hay usuarios disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
