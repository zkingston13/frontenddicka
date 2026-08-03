import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import AuthContext from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductoForm = () => {
  const [sku, setSku] = useState("");
  const [nombre, setNombre] = useState("");
  const [cliente_id, setClienteId] = useState("");
  const [propiedades, setPropiedades] = useState(""); 
  const [caracteristicas, setCaracteristicas] = useState(""); 
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchClientes();
    if (id) fetchProducto();
  }, [id]);

  const fetchClientes = async () => {
    if (!token) {
      setError("No tienes sesión iniciada.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await api.get("/clientes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClientes(response.data);
    } catch (err) {
      setError("Error al cargar la lista de clientes.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducto = async () => {
    if (!token) {
      setError("No tienes sesión iniciada.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await api.get(`/productos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const producto = response.data;
      setSku(producto.sku);
      setNombre(producto.nombre);
      setClienteId(producto.cliente_id);
      setPropiedades(producto.propiedades || ""); 
      setCaracteristicas(producto.caracteristicas || ""); 
    } catch (err) {
      setError("Error al cargar los datos del producto.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("No tienes sesión iniciada.");
      return;
    }

    const productoData = {
      sku,
      nombre,
      cliente_id,
      propiedades,
      caracteristicas,
      usuarioModificacion: user.id,
    };

    try {
      setIsLoading(true);
      if (id) {
        await api.put(`/productos/${id}`, productoData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/productos", productoData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/productos");
    } catch (error) {
      setError("Error al guardar el producto. Verifica los datos proporcionados.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h2 className="text-center mb-4">
            {id ? "Editar Producto" : "Registrar Nuevo Producto"}
          </h2>

          {error && <div className="alert alert-danger text-center">{error}</div>}

          <form
            onSubmit={handleSubmit}
            className="border p-4 rounded shadow-sm bg-white"
          >
            <div className="mb-3">
              <label htmlFor="sku" className="form-label fw-medium">
                SKU
              </label>
              <input
                type="text"
                id="sku"
                className="form-control"
                placeholder="Ingrese el código SKU"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="nombre" className="form-label fw-medium">
                Nombre del Producto
              </label>
              <input
                type="text"
                id="nombre"
                className="form-control"
                placeholder="Ingrese el nombre descriptivo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cliente" className="form-label fw-medium">
                Cliente Asociado
              </label>
              <select
                id="cliente"
                className="form-select"
                value={cliente_id}
                onChange={(e) => setClienteId(e.target.value)}
                required
                disabled={isLoading}
              >
                <option value="">-- Seleccione un Cliente --</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.razonSocial}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="propiedades" className="form-label fw-medium">
                Propiedades
              </label>
              <textarea
                id="propiedades"
                className="form-control"
                rows="3"
                placeholder="Especifique las propiedades del producto"
                value={propiedades}
                onChange={(e) => setPropiedades(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="caracteristicas" className="form-label fw-medium">
                Características
              </label>
              <textarea
                id="caracteristicas"
                className="form-control"
                rows="3"
                placeholder="Especifique las características del producto"
                value={caracteristicas}
                onChange={(e) => setCaracteristicas(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <hr className="my-4" />

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/productos")}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={isLoading}
              >
                {isLoading
                  ? "Procesando..."
                  : id
                  ? "Guardar Cambios"
                  : "Registrar Producto"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductoForm;
