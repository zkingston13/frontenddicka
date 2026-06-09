import React, { useEffect, useState } from "react";
import { getProductos, deleteProducto } from "../../services/productos";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Productos = () => {
  const [productos, setProductos] = useState([]); 
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      setIsLoading(true);
      const productosObtenidos = await getProductos(); 
      setProductos(productosObtenidos || []); 
      setError("");
    } catch (err) {
      setError("Error al cargar productos.");
      setProductos([]); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await deleteProducto(id);
      fetchProductos(); 
    } catch (err) {
      setError("Error al eliminar producto.");
    }
  };

  const productosFiltrados = productos.filter(
    (producto) =>
      producto.sku.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container-fluid px-4 py-4" style={{ backgroundColor: "#fdfdfd", minHeight: "100vh" }}>
      
      {/* Barra Superior Unificada */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center border-bottom pb-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-0" style={{ letterSpacing: "-0.5px" }}>Gestión de Productos</h2>
          <p className="text-muted small mb-0">Catálogo maestro de artículos, SKUs asignados y cuentas de clientes</p>
        </div>
        
        <div className="d-flex flex-column flex-sm-row gap-2 mt-3 mt-md-0 w-100 w-md-auto" style={{ maxWidth: "500px" }}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Buscar por SKU o nombre..."
            value={busqueda}
            onChange={handleBusqueda}
            style={{ minWidth: "240px", borderRadius: "6px" }}
          />
          <Link to="/productos/nuevo" className="btn btn-primary btn-sm fw-medium px-3 text-nowrap" style={{ borderRadius: "6px" }}>
            Agregar Producto
          </Link>
        </div>
      </div>

      {error && <div className="alert alert-danger shadow-sm border-0 small text-center mb-4">{error}</div>}

      {/* Spinner de Carga Estilizado */}
      {isLoading && (
        <div className="text-center my-5 py-5">
          <div className="spinner-border text-primary spinner-border-sm" role="status"></div>
          <p className="text-muted small mt-2">Cargando catálogo maestro...</p>
        </div>
      )}

      {/* Contenedor de la Tabla Principal */}
      {!isLoading && (
        <div className="card border shadow-sm" style={{ borderRadius: "8px" }}>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.88rem" }}>
              <thead className="table-light border-bottom text-muted">
                <tr>
                  <th className="py-2.5 ps-3 fw-semibold" style={{ width: "15%" }}>SKU</th>
                  <th className="py-2.5 fw-semibold" style={{ width: "25%" }}>Producto</th>
                  <th className="py-2.5 fw-semibold" style={{ width: "20%" }}>Cliente</th>
                  <th className="py-2.5 fw-semibold" style={{ width: "15%" }}>Propiedades</th>
                  <th className="py-2.5 fw-semibold" style={{ width: "15%" }}>Características</th>
                  <th className="py-2.5 fw-semibold text-center pe-3" style={{ width: "10%" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.length > 0 ? (
                  productosFiltrados.map((producto) => (
                    <tr key={producto.id} className="border-bottom">
                      
                      {/* SKU en formato código */}
                      <td className="py-3 ps-3 font-monospace text-secondary fw-medium" style={{ fontSize: "0.85rem" }}>
                        {producto.sku}
                      </td>
                      
                      {/* Nombre de Producto */}
                      <td className="py-3 text-dark fw-semibold">
                        {producto.nombre}
                      </td>
                      
                      {/* Cliente */}
                      <td className="py-3 text-secondary">
                        {producto.cliente || <span className="text-muted-light">Sin cliente</span>}
                      </td>
                      
                      {/* Propiedades */}
                      <td className="py-3 text-secondary text-truncate" style={{ maxWidth: "150px" }}>
                        {producto.propiedades?.trim() || <span className="text-muted-light small">Sin propiedades</span>}
                      </td>
                      
                      {/* Características */}
                      <td className="py-3 text-secondary text-truncate" style={{ maxWidth: "150px" }}>
                        {producto.caracteristicas?.trim() || <span className="text-muted-light small">Sin características</span>}
                      </td>
                      
                      {/* Acciones */}
                      <td className="py-3 text-center pe-3">
                        <div className="d-flex justify-content-center gap-1.5">
                          <Link
                            to={`/productos/editar/${producto.id}`}
                            className="btn btn-outline-secondary btn-xs fw-medium"
                            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", borderRadius: "4px" }}
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(producto.id)}
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
                    <td colSpan="6" className="text-center py-4 text-muted small">
                      No se encontraron productos que coincidan con los criterios de búsqueda.
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

export default Productos;