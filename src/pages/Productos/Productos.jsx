import React, { useEffect, useState } from "react";
import { getProductos, deleteProducto } from "../../services/productos";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Productos = () => {
  const [productos, setProductos] = useState([]); // ✅ Inicializar como array vacío
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      setIsLoading(true);
      const productosObtenidos = await getProductos(); // ✅ Obtener productos de la API
      setProductos(productosObtenidos || []); // ✅ Asegurar que siempre sea un array
      setError("");
    } catch (err) {
      setError("❌ Error al cargar productos.");
      setProductos([]); // ✅ Evitar que productos sea undefined
    } finally {
      setIsLoading(false);
    }
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("🗑️ ¿Estás seguro de eliminar este producto?")) return;

    try {
      await deleteProducto(id);
      fetchProductos(); // Recargar la lista
    } catch (err) {
      setError("❌ Error al eliminar producto.");
    }
  };

  // ✅ Filtrar productos por SKU o nombre
  const productosFiltrados = productos.filter(
    (producto) =>
      producto.sku.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center">📦 Gestión de Productos</h1>

      {/* 🔹 Buscador */}
      <div className="row mb-3">
        <div className="col-md-6 mx-auto">
          <div className="input-group">
            <span className="input-group-text">🔍</span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por SKU o nombre..."
              value={busqueda}
              onChange={handleBusqueda}
            />
          </div>
        </div>
      </div>

      {/* 🔹 Botón para crear producto */}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/productos/nuevo" className="btn btn-primary">
          ➕ Agregar Producto
        </Link>
      </div>

      {/* 🔹 Mostrar errores */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* 🔹 Mostrar spinner de carga */}
      {isLoading && (
        <div className="text-center my-3">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2">Cargando productos...</p>
        </div>
      )}

      {/* 🔹 Tabla responsiva con Bootstrap */}
      {!isLoading && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark text-center">
              <tr>
                <th>🏷️ SKU</th>
                <th>📦 Producto</th>
                <th>🤝 Cliente</th>
                <th>⚙️ Propiedades</th>
                <th>📋 Características</th>
                <th>⚙️ Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.sku}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.cliente || "🔘 Sin cliente"}</td>
                    <td>
                      {producto.propiedades?.trim() || "🔘 Sin propiedades"}
                    </td>
                    <td>
                      {producto.caracteristicas?.trim() ||
                        "🔘 Sin características"}
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/productos/editar/${producto.id}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        ✏️ Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(producto.id)}
                        className="btn btn-danger btn-sm"
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    ⚠️ No hay productos disponibles.
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

export default Productos;
