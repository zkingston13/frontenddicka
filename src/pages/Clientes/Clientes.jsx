import React, { useEffect, useState, useCallback } from "react";
import { getClientes, deleteCliente } from "../../services/clientes";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");

  const fetchClientes = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("⚠️ No tienes sesión iniciada.");
        return;
      }
      const data = await getClientes(token);
      setClientes(data);
    } catch (err) {
      setError("❌ Error al cargar clientes.");
    }
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  const handleDelete = async (id) => {
    if (!window.confirm("🗑️ ¿Estás seguro de eliminar este cliente?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("⚠️ No tienes sesión iniciada.");
        return;
      }
      await deleteCliente(id, token);
      setClientes(clientes.filter((cliente) => cliente.id !== id)); // ✅ Elimina cliente sin recargar
    } catch (err) {
      setError("❌ Error al eliminar cliente.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">🤝 Gestión de Clientes</h1>

      {/* 🔹 Botón para crear cliente */}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/clientes/nuevo" className="btn btn-primary">
          ➕ Crear Cliente
        </Link>
      </div>

      {/* 🔹 Mostrar errores */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* 🔹 Tabla responsiva con Bootstrap */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark text-center">
            <tr>
              <th>🆔 ID</th>
              <th>🏢 Razón Social</th>
              <th>📍 Domicilio</th>
              <th>⚙️ Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.razonSocial}</td>
                  <td>{cliente.domicilio}</td>
                  <td className="text-center">
                    <Link
                      to={`/clientes/editar/${cliente.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      ✏️ Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(cliente.id)}
                      className="btn btn-danger btn-sm"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  ⚠️ No hay clientes disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
