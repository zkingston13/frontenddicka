import React, { useEffect, useState, useCallback } from "react";
import { getLotes, imprimirEtiqueta, deleteLote } from "../../services/lotes"; // 🔹 Asegurar que deleteLote esté importado
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Lotes = () => {
  const [lotes, setLotes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");
  const [imprimiendoId, setImprimiendoId] = useState(null);
  const [userRole, setUserRole] = useState("");

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
      setLotes(data.slice(-20)); // 🔹 Últimos 20 lotes
    } catch (err) {
      setError("❌ Error al cargar lotes.");
      console.error("❌ Error al cargar lotes:", err.message);
    }
  };

  const obtenerRolUsuario = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    setUserRole(usuario?.rol || "");
  };

  const handleBusqueda = useCallback((e) => {
    setBusqueda(e.target.value);
  }, []);

  const handleImpresion = useCallback(
    async (id) => {
      if (imprimiendoId) return;
      if (!window.confirm("¿Deseas imprimir las etiquetas de este lote?"))
        return;
      setImprimiendoId(id);
      try {
        await imprimirEtiqueta(id);
        alert("✅ Etiqueta enviada a impresión");
      } catch (err) {
        console.error("❌ Error al imprimir:", err);
        alert(
          `❌ Error al imprimir: ${err.response?.data?.error || err.message}`
        );
      } finally {
        setImprimiendoId(null);
      }
    },
    [imprimiendoId]
  );

  const handleEliminar = async (id) => {
    if (
      !window.confirm(
        "⚠️ ¿Estás seguro de eliminar este lote? Esta acción no se puede deshacer."
      )
    )
      return;

    try {
      await deleteLote(id);
      setLotes((prevLotes) => prevLotes.filter((lote) => lote.id !== id));
      alert("✅ Lote eliminado correctamente.");
    } catch (err) {
      console.error("❌ Error al eliminar lote:", err);
      alert(
        `❌ Error al eliminar: ${err.response?.data?.error || err.message}`
      );
    }
  };

  const lotesFiltrados = Array.isArray(lotes)
    ? lotes.filter((lote) =>
        lote.lote.toLowerCase().includes(busqueda.toLowerCase())
      )
    : [];

  return (
    <div className="container mt-4">
      <h1 className="text-center">📦 Entradas de Lotes</h1>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row mb-3">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Buscar por número de lote..."
            value={busqueda}
            onChange={handleBusqueda}
          />
        </div>
      </div>

      <div className="mb-3 text-end">
        <Link to="/lotes/nuevo" className="btn btn-primary">
          ➕ Registrar Nuevo Lote
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>📜 Folio</th>
              <th>🏷️ Lote</th>
              <th>📦 Producto</th>
              <th>📅 Fecha de Caducidad</th>
              <th>📥 Fecha de Ingreso</th>
              <th>📦 Palets</th>
              <th>📦 Piezas x Pallet</th>
              <th>📊 Piezas Totales</th>
              <th>⚖️ Unidad</th>
              <th>📝 Observaciones</th>
              <th>⚙️ Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {lotesFiltrados.length > 0 ? (
              lotesFiltrados.map((lote) => (
                <tr key={lote.id}>
                  <td>{lote.id}</td>
                  <td>{lote.folio}</td>
                  <td>{lote.lote}</td>
                  <td>
                    {lote.producto ? lote.producto.nombre : "🔘 Sin producto"}
                  </td>
                  <td>{lote.caducidad}</td>
                  <td>{lote.fechaRecibido || "🔘 No especificado"}</td>
                  <td>{lote.numPalets}</td>
                  <td>{lote.piezasPalet}</td> {/* 🔹 Se reemplazó numPiezas */}
                  <td>{lote.piezasLote}</td> {/* 🔹 Se agregó piezasLote */}
                  <td>{lote.unidadMedida}</td>
                  <td>{lote.observaciones || "🔘 Sin observaciones"}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link
                        to={`/lotes/editar/${lote.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        ✏️ Editar
                      </Link>
                      <button
                        onClick={() => handleImpresion(lote.id)}
                        className="btn btn-success btn-sm"
                        disabled={imprimiendoId === lote.id}
                      >
                        {imprimiendoId === lote.id ? (
                          <>
                            <span className="spinner-border spinner-border-sm"></span>{" "}
                            Imprimiendo...
                          </>
                        ) : (
                          "🖨️ Imprimir"
                        )}
                      </button>
                      {[
                        "Administrador",
                        "Jefe de operaciones",
                        "Supervisor",
                      ].includes(userRole) && (
                        <button
                          onClick={() => handleEliminar(lote.id)}
                          className="btn btn-danger btn-sm"
                        >
                          🗑️ Eliminar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center text-muted">
                  ❌ No hay lotes disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lotes;
