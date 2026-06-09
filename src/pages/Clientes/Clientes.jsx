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
        setError("No tienes sesión iniciada.");
        return;
      }
      const data = await getClientes(token);
      setClientes(data);
    } catch (err) {
      setError("Error al cargar clientes.");
    }
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este cliente?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No tienes sesión iniciada.");
        return;
      }
      await deleteCliente(id, token);
      setClientes(clientes.filter((cliente) => cliente.id !== id)); 
    } catch (err) {
      setError("Error al eliminar cliente.");
    }
  };

  return (
    <div className="container-fluid px-4 py-4" style={{ backgroundColor: "#fdfdfd", minHeight: "100vh" }}>
      
      {/* Barra Superior Unificada */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center border-bottom pb-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-0" style={{ letterSpacing: "-0.5px" }}>Gestión de Clientes</h2>
          <p className="text-muted small mb-0">Directorio de cuentas comerciales, razones sociales y domicilios de entrega</p>
        </div>
        
        <div className="mt-3 mt-md-0 w-100 w-md-auto text-end">
          <Link to="/clientes/nuevo" className="btn btn-primary btn-sm fw-medium px-3 text-nowrap" style={{ borderRadius: "6px" }}>
            Crear Cliente
          </Link>
        </div>
      </div>

      {error && <div className="alert alert-danger shadow-sm border-0 small text-center mb-4">{error}</div>}

      {/* Contenedor de la Tabla Principal */}
      <div className="card border shadow-sm" style={{ borderRadius: "8px" }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.88rem" }}>
            <thead className="table-light border-bottom text-muted">
              <tr>
                <th className="py-2.5 ps-3 fw-semibold text-center" style={{ width: "10%" }}>ID</th>
                <th className="py-2.5 fw-semibold" style={{ width: "40%" }}>Razón Social</th>
                <th className="py-2.5 fw-semibold" style={{ width: "40%" }}>Domicilio</th>
                <th className="py-2.5 fw-semibold text-center pe-3" style={{ width: "10%" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length > 0 ? (
                clientes.map((cliente) => (
                  <tr key={cliente.id} className="border-bottom">
                    
                    {/* ID de Cliente */}
                    <td className="py-3 text-center text-muted font-monospace" style={{ fontSize: "0.85rem" }}>
                      {cliente.id}
                    </td>
                    
                    {/* Razón Social */}
                    <td className="py-3 text-dark fw-semibold">
                      {cliente.razonSocial}
                    </td>
                    
                    {/* Domicilio */}
                    <td className="py-3 text-secondary">
                      {cliente.domicilio}
                    </td>
                    
                    {/* Botones de Acción */}
                    <td className="py-3 text-center pe-3">
                      <div className="d-flex justify-content-center gap-1.5">
                        <Link
                          to={`/clientes/editar/${cliente.id}`}
                          className="btn btn-outline-secondary btn-xs fw-medium"
                          style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", borderRadius: "4px" }}
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(cliente.id)}
                          className="btn btn-outline-danger btn-xs fw-medium"
                          style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", borderRadius: "4px" }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted small">
                    No hay clientes registrados en el sistema.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clientes;