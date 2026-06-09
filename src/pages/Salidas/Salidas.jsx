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
      console.log("📦 Datos de salidas recibidos:", salidasOrdenadas); 
      setError("");
    } catch (err) {
      setError("Error al cargar salidas.");
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
    <div className="container-fluid px-4 py-4" style={{ backgroundColor: "#fdfdfd", minHeight: "100vh" }}>
      
      {/* Barra Superior Unificada */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center border-bottom pb-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-0" style={{ letterSpacing: "-0.5px" }}>Historial de Salidas</h2>
          <p className="text-muted small mb-0">Bitácora de despachos, control de embarques y palets validados en piso</p>
        </div>
        
        <div className="mt-3 mt-md-0 w-100 w-md-auto" style={{ maxWidth: "350px" }}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Buscar por lote..."
            value={busqueda}
            onChange={handleBusqueda}
            style={{ minWidth: "240px", borderRadius: "6px" }}
          />
        </div>
      </div>

      {error && <div className="alert alert-danger shadow-sm border-0 small text-center mb-4">{error}</div>}

      {/* Spinner de Carga Estilizado */}
      {isLoading && (
        <div className="text-center my-5 py-5">
          <div className="spinner-border text-primary spinner-border-sm" role="status"></div>
          <p className="text-muted small mt-2">Consultando bitácora de despachos...</p>
        </div>
      )}

      {/* Contenedor de la Tabla Principal */}
      {!isLoading && (
        <div className="card border shadow-sm" style={{ borderRadius: "8px" }}>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.88rem" }}>
              <thead className="table-light border-bottom text-muted">
                <tr>
                  <th className="py-2.5 ps-3 fw-semibold text-center" style={{ width: "8%" }}>ID</th>
                  <th className="py-2.5 fw-semibold text-center" style={{ width: "12%" }}>Lote</th>
                  <th className="py-2.5 fw-semibold" style={{ width: "15%" }}>Embarque</th>
                  <th className="py-2.5 fw-semibold text-end" style={{ width: "10%" }}>No. Pallet</th>
                  <th className="py-2.5 fw-semibold text-end text-primary" style={{ width: "15%" }}>Cant. Entregada</th>
                  <th className="py-2.5 fw-semibold text-center" style={{ width: "15%" }}>Fecha de Salida</th>
                  <th className="py-2.5 fw-semibold" style={{ width: "12%" }}>Operador / Usuario</th>
                  <th className="py-2.5 fw-semibold pe-3" style={{ width: "13%" }}>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {salidasFiltradas.length > 0 ? (
                  salidasFiltradas.map((salida) => (
                    <tr key={salida.id} className="border-bottom">
                      
                      {/* ID */}
                      <td className="py-3 text-center text-muted font-monospace" style={{ fontSize: "0.8rem" }}>
                        {salida.id}
                      </td>
                      
                      {/* Lote */}
                      <td className="py-3 text-center font-monospace text-dark fw-bold">
                        {salida.lote?.lote || <span className="text-muted fw-normal">N/A</span>}
                      </td>
                      
                      {/* Embarque (Código QR) */}
                      <td className="py-3 text-secondary font-monospace" style={{ fontSize: "0.85rem" }}>
                        {salida.qrEmbarque || <span className="text-muted fw-normal">N/A</span>}
                      </td>
                      
                      {/* No. Pallet */}
                      <td className="py-3 text-end font-monospace text-secondary">
                        {salida.paletPiso}
                      </td>
                      
                      {/* Cantidad Entregada */}
                      <td className="py-3 text-end font-monospace fw-bold text-primary">
                        {salida.cantidadEntregada}
                      </td>
                      
                      {/* Fecha Local es-MX */}
                      <td className="py-3 text-center text-secondary small">
                        {salida.created_at
                          ? new Date(salida.created_at).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" })
                          : <span className="text-muted">Sin fecha</span>}
                      </td>
                      
                      {/* Usuario */}
                      <td className="py-3 text-dark fw-medium">
                        {salida.usuario?.nombre || <span className="text-muted fw-normal">Desconocido</span>}
                      </td>
                      
                      {/* Observaciones */}
                      <td className="py-3 text-secondary text-truncate pe-3" style={{ maxWidth: "160px" }}>
                        {salida.observaciones || <span className="text-muted-light italic">Sin observaciones</span>}
                      </td>
                      
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted small">
                      No se encontraron registros de salidas para el lote especificado.
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

export default Salidas;