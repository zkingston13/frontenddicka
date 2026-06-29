import React, { useEffect, useState, useCallback } from "react";
import { getLotes, imprimirEtiqueta, deleteLote } from "../../services/lotes";
import { Link, useNavigate } from "react-router-dom"; // 🛠️ MODIFICACIÓN: Agregamos useNavigate para redirigir al flujo de ubicación
import "bootstrap/dist/css/bootstrap.min.css";

const Lotes = () => {
  const [lotes, setLotes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");
  const [imprimiendoId, setImprimiendoId] = useState(null);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate(); // 🛠️ MODIFICACIÓN: Instanciamos navigate para controlar la acción de ubicar

  useEffect(() => {
    fetchLotes();
    obtenerRolUsuario();
  }, []);

  const fetchLotes = async () => {
    try {
      const data = await getLotes();
      if (!Array.isArray(data)) {
        throw new Error("Los datos de lotes no son un array.");
      }
      setLotes(data.slice(-20));
    } catch (err) {
      setError("Error al cargar lotes.");
      console.error("Error al cargar lotes:", err.message);
    }
  };

  const obtenerRolUsuario = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    setUserRole(usuario?.rol || "");
  };

  const handleBusqueda = useCallback((e) => {
    setBusqueda(e.target.value);
  }, []);

  const handleImpresion = (id) => {
    window.open(
      `http://localhost:8000/api/lotes/${id}/imprimir-etiquetas`,
      "_blank"
    );
  };

  const handleEliminar = async (id) => {
    if (
      !window.confirm(
        "¿Estás seguro de eliminar este lote? Esta acción no se puede deshacer."
      )
    )
      return;

    try {
      await deleteLote(id);
      setLotes((prevLotes) => prevLotes.filter((lote) => lote.id !== id));
      alert("Lote eliminado correctamente.");
    } catch (err) {
      console.error("Error al eliminar lote:", err);
      alert(
        `Error al eliminar: ${err.response?.data?.error || err.message}`
      );
    }
  };

  const lotesFiltrados = Array.isArray(lotes)
    ? lotes.filter((lote) =>
      lote.lote.toLowerCase().includes(busqueda.toLowerCase())
    )
    : [];

  return (
    <div className="container-fluid px-4 py-4" style={{ backgroundColor: "#fdfdfd", minHeight: "100vh" }}>

      {/* Encabezado con buscador e inserción alineados */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center border-bottom pb-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-0" style={{ letterSpacing: "-0.5px" }}>Entradas de Lotes</h2>
          <p className="text-muted small mb-0">Gestión de stock recibido y control de empaques por tarima</p>
        </div>

        <div className="d-flex flex-column flex-sm-row gap-2 mt-3 mt-md-0 w-100 w-md-auto" style={{ maxWidth: "500px" }}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Buscar por lote..."
            value={busqueda}
            onChange={handleBusqueda}
            style={{ minWidth: "220px", borderRadius: "6px" }}
          />
          <Link to="/lotes/nuevo" className="btn btn-primary btn-sm fw-medium px-3 text-nowrap" style={{ borderRadius: "6px" }}>
            Registrar Nuevo Lote
          </Link>
        </div>
      </div>

      {error && <div className="alert alert-danger shadow-sm border-0 small text-center mb-4">{error}</div>}

      {/* Contenedor principal de la tabla */}
      <div className="card border shadow-sm" style={{ borderRadius: "8px" }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.88rem" }}>
            <thead className="table-light border-bottom text-muted">
              <tr>
                <th className="py-2.5 ps-3 fw-semibold text-center">ID</th>
                <th className="py-2.5 fw-semibold text-center">Folio</th>
                <th className="py-2.5 fw-semibold text-center">Lote</th>
                <th className="py-2.5 fw-semibold">Producto</th>
                <th className="py-2.5 fw-semibold text-center">Estado</th> {/*  MODIFICACIÓN: Agregamos columna Estado */}
                <th className="py-2.5 fw-semibold text-center">Caducidad</th>
                <th className="py-2.5 fw-semibold text-center">Ingreso</th>
                <th className="py-2.5 fw-semibold text-end">Palets</th>
                <th className="py-2.5 fw-semibold text-end">Pzas x Palet</th>
                <th className="py-2.5 fw-semibold text-end">Total Pzas</th>
                <th className="py-2.5 fw-semibold text-center">Unidad</th>
                <th className="py-2.5 fw-semibold">Observaciones</th>
                <th className="py-2.5 fw-semibold text-center pe-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lotesFiltrados.length > 0 ? (
                lotesFiltrados.map((lote) => (
                  <tr key={lote.id} className="border-bottom">
                    {/* ID */}
                    <td className="py-3 text-center text-muted font-monospace" style={{ fontSize: "0.8rem" }}>{lote.id}</td>

                    {/* Folio */}
                    <td className="py-3 text-center font-monospace text-secondary fw-medium">{lote.folio}</td>

                    {/* Lote */}
                    <td className="py-3 text-center font-monospace text-dark fw-bold">{lote.lote}</td>

                    {/* Producto */}
                    <td className="py-3 text-dark fw-semibold">
                      {lote.producto ? lote.producto.nombre : <span className="text-muted fw-normal">Sin producto</span>}
                    </td>

                    {/* Estado */}
                    {/*  MODIFICACIÓN: Renderizado dinámico del badge de estado basado en si contiene ubicacion_id o no */}
                    <td className="py-3 text-center">
                      <span
                        className={`badge ${lote.ubi === "No Ubicado"
                            ? "bg-danger-subtle text-danger border border-danger-subtle"
                            : "bg-success-subtle text-success border border-success-subtle"
                          }`}
                      >
                        {lote.ubi}
                      </span>
                    </td>

                    {/* Caducidad */}
                    <td className="py-3 text-center text-secondary">{lote.caducidad}</td>

                    {/* Ingreso */}
                    <td className="py-3 text-center text-secondary">{lote.fechaRecibido || <span className="text-muted">No especificado</span>}</td>

                    {/* Cantidades alineadas numéricamente */}
                    <td className="py-3 text-end font-monospace">{lote.numPalets}</td>

                    {/* Piezas por Palet */}
                    <td className="py-3 text-end font-monospace">{lote.piezasPalet}</td>

                    {/* Piezas Totales */}
                    <td className="py-3 text-end font-monospace fw-bold text-primary">{lote.piezasLote}</td>

                    {/* Unidad */}
                    <td className="py-3 text-center text-muted">{lote.unidadMedida}</td>

                    {/* Observaciones */}
                    <td className="py-3 text-secondary text-truncate" style={{ maxWidth: "180px" }}>
                      {lote.observaciones || <span className="text-muted-light italic">Sin observaciones</span>}
                    </td>

                    {/* Botones de acción limpios */}
                    <td className="py-3 text-center pe-3">
                      <div className="d-flex justify-content-center gap-1.5">
                        {/* Botón Dinámico Ubicar */}
                        {/*  AJUSTE: Redirigir correctamente a la ruta del mapa con el ID del lote */}
                        {!lote.ubicacion_id && (
                          <button
                            onClick={() => navigate(`/lotes/detalle/${lote.id}`)}
                            className="btn btn-primary btn-xs fw-medium"
                            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", borderRadius: "4px" }}
                          >
                            Ubicar
                          </button>
                        )}

                        <Link
                          to={`/lotes/editar/${lote.id}`}
                          className="btn btn-outline-secondary btn-xs fw-medium"
                          style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", borderRadius: "4px" }}
                        >
                          Editar
                        </Link>

                        <button
                          onClick={() => handleImpresion(lote.id)}
                          className="btn btn-outline-primary btn-xs fw-medium"
                          style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", borderRadius: "4px" }}
                          disabled={imprimiendoId === lote.id}
                        >
                          {imprimiendoId === lote.id ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-1" style={{ width: "10px", height: "10px" }}></span>
                              ...
                            </>
                          ) : (
                            "Imprimir"
                          )}
                        </button>

                        {[
                          "Administrador",
                          "Jefe de operaciones",
                          "Supervisor",
                        ].includes(userRole) && (
                            <button
                              onClick={() => handleEliminar(lote.id)}
                              className="btn btn-outline-danger btn-xs fw-medium"
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
                  <td colSpan="13" className="text-center py-4 text-muted small"> {/* 🛠️ MODIFICACIÓN: Incrementado colSpan a 13 por la nueva columna */}
                    No se encontraron registros de lotes con el parámetro de búsqueda actual.
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

export default Lotes;