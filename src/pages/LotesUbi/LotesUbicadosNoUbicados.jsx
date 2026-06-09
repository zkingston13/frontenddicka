import React, { useEffect, useState, useCallback } from "react";
import { getLotesUbicados, getLotesNoUbicados, buscarLote } from "../../services/lotes";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LotesUbicadosNoUbicados = () => {
  const [ubicados, setUbicados] = useState([]);
  const [noUbicados, setNoUbicados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    cargarDatos();
    obtenerRolUsuario();
  }, []);

  const cargarDatos = async () => {
    try {
      const ubicadosData = await getLotesUbicados();
      const noUbicadosData = await getLotesNoUbicados();

      setUbicados(Array.isArray(ubicadosData) ? ubicadosData : []);
      setNoUbicados(Array.isArray(noUbicadosData) ? noUbicadosData : []);
    } catch (err) {
      console.error("Error al cargar lotes:", err);
      setError("Error al cargar los lotes desde la API.");
    }
  };

  const obtenerRolUsuario = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    setUserRole(usuario?.rol || "");
  };

  const handleBusqueda = useCallback(async (e) => {
    const valor = e.target.value;
    setBusqueda(valor);

    if (valor.trim() === "") return cargarDatos();

    try {
      const resultado = await buscarLote(valor);
      setUbicados(resultado.filter((l) => l.ubi === "Ubicado"));
      setNoUbicados(resultado.filter((l) => l.ubi === "No Ubicado"));
    } catch (err) {
      console.error("Error en búsqueda:", err);
      setError("Error al realizar la búsqueda.");
    }
  }, []);

  return (
    <div className="container-fluid px-4 py-4" style={{ backgroundColor: "#fdfdfd", minHeight: "100vh" }}>
      
      {/* Barra Superior Unificada */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center border-bottom pb-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-0" style={{ letterSpacing: "-0.5px" }}>Monitoreo de Lotes</h2>
          <p className="text-muted small mb-0">Control de inventario en piso y asignación de espacios en almacén</p>
        </div>
        
        <div className="mt-3 mt-md-0 d-flex gap-2 w-100 w-md-auto">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Buscar por lote..."
            value={busqueda}
            onChange={handleBusqueda}
            style={{ maxWidth: "240px", borderRadius: "6px" }}
          />
          <button
            className="btn btn-primary btn-sm fw-medium px-3 text-nowrap"
            onClick={() => navigate("/racks/mapa")}
            style={{ borderRadius: "6px" }}
          >
            Ver Mapa de Racks
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger shadow-sm border-0 small text-center mb-4">{error}</div>}

      {/* Sección: Lotes No Ubicados (Prioridad Operativa) */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-3">
          <span className="badge bg-danger-subtle text-danger border border-danger-subtle me-2 px-2.5 py-1.5" style={{ fontSize: "0.75rem" }}>Por Ubicar</span>
          <h5 className="fw-bold text-dark mb-0">Pendientes de Asignación</h5>
        </div>
        
        <div className="card border shadow-sm" style={{ borderRadius: "8px" }}>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.88rem" }}>
              <thead className="table-light border-bottom text-muted">
                <tr>
                  <th className="py-2.5 ps-3 text-center" style={{ width: "10%" }}>ID</th>
                  <th className="py-2.5 font-monospace" style={{ width: "20%" }}>Lote</th>
                  <th className="py-2.5" style={{ width: "45%" }}>Producto</th>
                  <th className="py-2.5 text-center" style={{ width: "13%" }}>Estado</th>
                  <th className="py-2.5 text-center pe-3" style={{ width: "12%" }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {noUbicados.length > 0 ? (
                  noUbicados.map((lote) => (
                    <tr key={lote.id} className="border-bottom">
                      <td className="py-3 text-center text-muted font-monospace">{lote.id}</td>
                      <td className="py-3 font-monospace text-dark fw-bold">{lote.lote}</td>
                      <td className="py-3 text-secondary">{lote.producto?.nombre || "Sin producto asignado"}</td>
                      <td className="py-3 text-center">
                        <span className="badge rounded-pill bg-danger-subtle text-danger border border-danger-subtle font-monospace px-2" style={{ fontSize: "0.75rem" }}>
                          {lote.ubi}
                        </span>
                      </td>
                      <td className="py-3 text-center pe-3">
                        <button
                          onClick={() => navigate(`/lotes/detalle/${lote.id}`)}
                          className="btn btn-outline-warning btn-xs fw-semibold text-nowrap"
                          style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", borderRadius: "4px" }}
                        >
                          Recomendar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted small">No hay lotes pendientes de ubicación.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sección: Lotes Ubicados */}
      <div>
        <div className="d-flex align-items-center mb-3">
          <span className="badge bg-success-subtle text-success border border-success-subtle me-2 px-2.5 py-1.5" style={{ fontSize: "0.75rem" }}>Resguardado</span>
          <h5 className="fw-bold text-dark mb-0">Lotes Ubicados</h5>
        </div>

        <div className="card border shadow-sm" style={{ borderRadius: "8px" }}>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.88rem" }}>
              <thead className="table-light border-bottom text-muted">
                <tr>
                  <th className="py-2.5 ps-3 font-monospace" style={{ width: "25%" }}>Lote</th>
                  <th className="py-2.5" style={{ width: "50%" }}>Producto</th>
                  <th className="py-2.5 text-center" style={{ width: "13%" }}>Estado</th>
                  <th className="py-2.5 text-center pe-3" style={{ width: "12%" }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {ubicados.length > 0 ? (
                  ubicados.map((lote) => (
                    <tr key={lote.id} className="border-bottom">
                      <td className="py-3 ps-3 font-monospace text-dark fw-bold">{lote.lote}</td>
                      <td className="py-3 text-secondary">{lote.producto?.nombre || "Sin producto asignado"}</td>
                      <td className="py-3 text-center">
                        <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle font-monospace px-2" style={{ fontSize: "0.75rem" }}>
                          {lote.ubi}
                        </span>
                      </td>
                      <td className="py-3 text-center pe-3">
                        <button
                          onClick={() => navigate(`/lotes/detalle/${lote.id}`)}
                          className="btn btn-outline-secondary btn-xs fw-medium text-nowrap"
                          style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", borderRadius: "4px" }}
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted small">No se encontraron lotes ubicados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LotesUbicadosNoUbicados;