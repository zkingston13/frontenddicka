import React, { useEffect, useState, useCallback } from "react";
import api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Bootstrap para estilos

const Dashboard = () => {
  const [data, setData] = useState({
    totalPiezasAlmacen: 0,
    ubicacionesOcupadas: 0,
    productosEnAlmacen: [],
    productosPorLote: [],
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // 🔹 Una sola barra de búsqueda

  const fetchDashboardData = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("⚠️ No hay sesión iniciada.");
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

      setError(""); // ✅ Limpiar errores previos
    } catch (error) {
      setError("❌ Error al obtener datos del dashboard.");
      console.error(
        "Error en dashboard:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/"; // 🔹 Redirigir al login si hay error 401
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

  // 🔹 Filtrar productos según folio o lote (una sola barra de búsqueda)
  const filteredProducts = data.productosEnAlmacen.filter(
    (producto) =>
      searchQuery === "" ||
      producto.folio?.toString().includes(searchQuery) ||
      producto.lote?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">📊 Dashboard - Estado del Almacén</h1>

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {isLoading && (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      )}

      {/* 🔹 Barra de búsqueda (Folio o Lote) */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Buscar por Folio o Lote"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 🔹 Tarjetas de estadísticas con mini-tablas */}
      <div className="row text-center">
        {/* 📦 Total de Piezas en Almacén */}
        <div className="col-md-6 mb-3">
          <div className="card border-primary shadow-sm">
            <div className="card-body">
              <h2 className="card-title">📦 {data.totalPiezasAlmacen}</h2>
              <p className="card-text">Total Piezas en Almacén</p>
              {/* 🔹 Mini-tabla con lotes en almacén */}
              <div
                className="table-responsive"
                style={{ maxHeight: "150px", overflowY: "auto" }}
              >
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th>🔢 Lote</th>
                      <th>📦 Piezas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.productosPorLote.length > 0 ? (
                      data.productosPorLote.map((lote, index) => (
                        <tr key={index}>
                          <td>{lote.lote}</td>
                          <td>{lote.cantidad_total}</td>{" "}
                          {/* ✅ Sumado correctamente */}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center text-muted">
                          ⚠️ No hay lotes en almacén.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* 📍 Total de Ubicaciones Ocupadas */}
        <div className="col-md-6 mb-3">
          <div className="card border-success shadow-sm">
            <div className="card-body">
              <h2 className="card-title">📍 {data.ubicacionesOcupadas}</h2>
              <p className="card-text">Ubicaciones Ocupadas</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Tabla de productos en almacén */}
      <h2 className="mt-4 text-center">📦 Productos en Almacén</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>🆔 SKU</th>
              <th>📍 Ubicación</th>
              <th>🏷️ Producto</th>
              <th>🔢 Lote</th>
              <th>📦 Piezas</th>
              <th>📄 Folio</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.sku}</td>
                  <td>{producto.ubicacion}</td>
                  <td>{producto.producto}</td>
                  <td>{producto.lote}</td>
                  <td>{producto.piezas}</td>
                  <td>{producto.folio}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  ⚠️ No hay productos en almacén.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
