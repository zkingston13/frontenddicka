import React, { useEffect, useState, useCallback } from "react";
import api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css"; 

const Dashboard = () => {
  const [data, setData] = useState({
    totalPiezasAlmacen: 0,
    ubicacionesOcupadas: 0,
    productosEnAlmacen: [],
    productosPorLote: [],
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 

  const fetchDashboardData = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay sesión iniciada.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.get("/dashboard/estadisticas");

      setData({
        totalPiezasAlmacen: response.data.totalPiezasAlmacen,
        ubicacionesOcupadas: response.data.ubicacionesOcupadas,
        productosEnAlmacen: response.data.productosEnAlmacen || [],
        productosPorLote: response.data.productosPorLote || [],
      });

      setError(""); 
    } catch (error) {
      setError("Error al obtener datos del dashboard.");
      console.error(
        "Error en dashboard:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/"; 
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 500000);
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  const filteredProducts = data.productosEnAlmacen.filter(
    (producto) =>
      searchQuery === "" ||
      producto.folio?.toString().includes(searchQuery) ||
      producto.lote?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid px-4 py-4" style={{ backgroundColor: "#fdfdfd", minHeight: "100vh" }}>
      
      {/* Barra Superior de Control */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center border-bottom pb-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-0" style={{ letterSpacing: "-0.5px" }}>Estado del Almacén</h2>
          <p className="text-muted small mb-0">Métricas de operación y control de existencias en tiempo real</p>
        </div>
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Buscar por folio o lote..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ maxWidth: "260px", borderRadius: "6px" }}
          />
          <button className="btn btn-primary btn-sm fw-medium px-3" style={{ borderRadius: "6px" }} onClick={fetchDashboardData}>
            Sincronizar
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger shadow-sm border-0 small text-center mb-4">{error}</div>}
      
      {isLoading && (
        <div className="d-flex justify-content-center my-3">
          <div className="spinner-border text-primary spinner-border-sm" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {/* Fila de Tarjetas KPI Informativas */}
      <div className="row g-3 mb-4 text-center">
        {/* Tarjeta Unidades Totales */}
        <div className="col-md-6">
          <div className="card h-100 border shadow-sm" style={{ borderRadius: "8px", borderTop: "4px solid #0d6efd" }}>
            <div className="card-body py-4">
              <h1 className="display-5 fw-bold text-dark mb-1">{data.totalPiezasAlmacen.toLocaleString()}</h1>
              <p className="text-uppercase text-muted fw-semibold small mb-0" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
                Total Piezas en Almacén
              </p>
            </div>
          </div>
        </div>

        {/* Tarjeta Ubicaciones Activas */}
        <div className="col-md-6">
          <div className="card h-100 border shadow-sm" style={{ borderRadius: "8px", borderTop: "4px solid #198754" }}>
            <div className="card-body py-4">
              <h1 className="display-5 fw-bold text-dark mb-1">{data.ubicacionesOcupadas}</h1>
              <p className="text-uppercase text-muted fw-semibold small mb-0" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
                Ubicaciones Ocupadas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Espacio Operativo de Tablas */}
      <div className="row g-4">
        
        {/* Sección de Inventario Detallado (Izquierda) */}
        <div className="col-lg-9">
          <div className="card border shadow-sm" style={{ borderRadius: "8px" }}>
            <div className="card-header bg-white py-3 border-bottom-0">
              <h6 className="fw-bold text-dark mb-0">Productos en Almacén</h6>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.9rem" }}>
                <thead className="table-light border-bottom text-muted">
                  <tr>
                    <th className="py-2.5 ps-3 fw-semibold">SKU</th>
                    <th className="py-2.5 fw-semibold">Ubicación</th>
                    <th className="py-2.5 fw-semibold">Producto</th>
                    <th className="py-2.5 fw-semibold">Lote</th>
                    <th className="py-2.5 fw-semibold text-end">Piezas</th>
                    <th className="py-2.5 fw-semibold text-end pe-3">Folio</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((producto, index) => (
                      <tr key={index} className="border-bottom">
                        <td className="py-3 ps-3 font-monospace text-secondary" style={{ fontSize: "0.85rem" }}>{producto.sku}</td>
                        <td className="py-3">
                          <span className="badge bg-light text-dark border px-2 py-1.5 fw-bold" style={{ fontSize: "0.75rem" }}>
                            {producto.ubicacion}
                          </span>
                        </td>
                        <td className="py-3 fw-semibold text-dark">{producto.producto}</td>
                        <td className="py-3 text-secondary font-monospace" style={{ fontSize: "0.85rem" }}>{producto.lote}</td>
                        <td className="py-3 text-end fw-bold text-primary">{producto.piezas}</td>
                        <td className="py-3 text-end pe-3 text-muted font-monospace" style={{ fontSize: "0.85rem" }}>{producto.folio}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted small">
                        No se encontraron productos registrados con el filtro actual.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Panel Resumen por Lotes (Derecha) */}
        <div className="col-lg-3">
          <div className="card border shadow-sm" style={{ borderRadius: "8px" }}>
            <div className="card-header bg-white py-3 border-bottom-0">
              <h6 className="fw-bold text-dark mb-0">Resumen por Lote</h6>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive" style={{ maxHeight: "435px", overflowY: "auto" }}>
                <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.85rem" }}>
                  <thead className="table-light sticky-top border-bottom text-muted">
                    <tr>
                      <th className="py-2 ps-3 fw-semibold">Lote</th>
                      <th className="py-2 text-end pe-3 fw-semibold">Piezas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.productosPorLote.length > 0 ? (
                      data.productosPorLote.map((lote, index) => (
                        <tr key={index} className="border-bottom">
                          <td className="py-2.5 ps-3 text-secondary font-monospace">{lote.lote}</td>
                          <td className="py-2.5 text-end pe-3 fw-bold text-dark">{lote.cantidad_total}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center py-3 text-muted small">
                          No hay lotes activos.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;