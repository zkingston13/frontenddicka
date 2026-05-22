import React, { useEffect, useState } from "react";
import { getSalidas } from "../../services/salidas";
import "bootstrap/dist/css/bootstrap.min.css";

const Salidas = () => {
  const [salidas, setSalidas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSalidas();
  }, []);

  const fetchSalidas = async () => {
    try {
      const response = await getSalidas();

      if (!Array.isArray(response)) {
        throw new Error("Los datos recibidos no son válidos.");
      }

      const salidasOrdenadas = response
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 20);

      setSalidas(salidasOrdenadas);
      console.log("📦 Datos de salidas recibidos:", salidasOrdenadas); // 🔹 Agregar log para depuración
      setError("");
    } catch (err) {
      setError("❌ Error al cargar salidas.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const salidasFiltradas = salidas.filter((salida) =>
    salida.lote?.lote.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center">🚛 Historial de Salidas</h1>

      {/* 🔹 Buscador */}
      <div className="row mb-3">
        <div className="col-md-6 mx-auto">
          <div className="input-group">
            <span className="input-group-text">🔍</span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por número de lote..."
              value={busqueda}
              onChange={handleBusqueda}
            />
          </div>
        </div>
      </div>

      {/* 🔹 Mostrar errores */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* 🔹 Mostrar spinner de carga */}
      {isLoading && (
        <div className="text-center my-3">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2">Cargando historial de salidas...</p>
        </div>
      )}

      {/* 🔹 Tabla responsiva con Bootstrap */}
      {!isLoading && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark text-center">
              <tr>
                <th>🆔 ID</th>
                <th>📦 Lote</th>
                <th>🚚 Embarque</th>
                <th>📦 No. Pallet</th>
                <th>📊 Cantidad Entregada</th>
                <th>📅 Fecha</th>
                <th>👤 Usuario</th>
                <th>⚙️ Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {salidasFiltradas.length > 0 ? (
                salidasFiltradas.map((salida) => (
                  <tr key={salida.id}>
                    <td>{salida.id}</td>
                    <td>{salida.lote?.lote || "N/A"}</td>
                    <td>{salida.qrEmbarque || "N/A"}</td>{" "}
                    {/* 🔹 FIX: Cambio transporte?.qr por qrEmbarque */}
                    <td>{salida.paletPiso}</td>
                    <td>{salida.cantidadEntregada}</td>
                    <td>
                      {salida.created_at
                        ? new Date(salida.created_at).toLocaleString("es-MX")
                        : "Sin fecha"}
                    </td>
                    <td>{salida.usuario?.nombre || "Desconocido"}</td>
                    <td>{salida.observaciones || "Sin observaciones"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    ⚠️ No hay registros de salidas.
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

export default Salidas;
