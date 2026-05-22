import React, { useEffect, useState, useCallback } from "react";
import {
  getLotesUbicados,
  getLotesNoUbicados,
  buscarLote,
} from "../../services/lotes";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LotesUbicadosNoUbicados = () => {
  const [ubicados, setUbicados] = useState([]);
  const [noUbicados, setNoUbicados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  // ✅ Cargar datos al iniciar
  useEffect(() => {
    cargarDatos();
    obtenerRolUsuario();
  }, []);

  // ✅ Cargar lotes ubicados y no ubicados
  const cargarDatos = async () => {
    try {
      const ubicadosData = await getLotesUbicados();
      const noUbicadosData = await getLotesNoUbicados();

      setUbicados(Array.isArray(ubicadosData) ? ubicadosData : []);
      setNoUbicados(Array.isArray(noUbicadosData) ? noUbicadosData : []);
    } catch (err) {
      console.error("❌ Error al cargar lotes:", err);
      setError("Error al cargar los lotes desde la API.");
    }
  };

  // ✅ Obtener rol del usuario almacenado
  const obtenerRolUsuario = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    setUserRole(usuario?.rol || "");
  };

  // ✅ Buscar lote por texto
  const handleBusqueda = useCallback(async (e) => {
    const valor = e.target.value;
    setBusqueda(valor);

    if (valor.trim() === "") return cargarDatos();

    try {
      const resultado = await buscarLote(valor);

      setUbicados(resultado.filter((l) => l.ubi === "Ubicado"));
      setNoUbicados(resultado.filter((l) => l.ubi === "No Ubicado"));
    } catch (err) {
      console.error("❌ Error en búsqueda:", err);
      setError("Error al realizar la búsqueda.");
    }
  }, []);

  return (
    <div className="container mt-4">

      {/* 🆕 Botón para ir a la vista de racks */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/racks/mapa")}
        >
          🗄️ Ver Mapa de Racks
        </button>
      </div>

      <h1 className="text-center mb-4">📦 Lotes Ubicados y No Ubicados</h1>

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

      {/* ✅ Tabla de lotes ubicados */}
      <div className="table-responsive mt-4">
        <h4 className="text-success">✅ Lotes Ubicados</h4>
        <table className="table table-striped table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>📜 Lote</th>
              <th>📦 Producto</th>
              <th>🏷️ Estado</th>
              <th>⚙️ Acción</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {ubicados.length > 0 ? (
              ubicados.map((lote) => (
                <tr key={lote.id}>
                  <td>{lote.lote}</td>
                  <td>{lote.producto?.nombre || "🔘 Sin producto"}</td>
                  <td>{lote.ubi}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/lotes/detalle/${lote.id}`)}
                      className="btn btn-info btn-sm"
                    >
                      🔍 Ver detalle
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-muted">
                  ❌ No hay lotes ubicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ✅ Tabla de lotes no ubicados */}
        <h4 className="text-danger mt-5">🚫 Lotes No Ubicados</h4>
        <table className="table table-striped table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>📜 Lote</th>
              <th>📦 Producto</th>
              <th>🏷️ Estado</th>
              <th>⚙️ Acción</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {noUbicados.length > 0 ? (
              noUbicados.map((lote) => (
                <tr key={lote.id}>
                  <td>{lote.id}</td>
                  <td>{lote.lote}</td>
                  <td>{lote.producto?.nombre || "🔘 Sin producto"}</td>
                  <td>{lote.ubi}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/lotes/detalle/${lote.id}`)}
                      className="btn btn-warning btn-sm"
                    >
                      📍 Recomendar ubicación
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-muted">
                  ❌ No hay lotes no ubicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LotesUbicadosNoUbicados;
