import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import AuthContext from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductoForm = () => {
  const [sku, setSku] = useState("");
  const [nombre, setNombre] = useState("");
  const [cliente_id, setClienteId] = useState("");
  const [propiedades, setPropiedades] = useState(""); // Ahora es solo texto
  const [caracteristicas, setCaracteristicas] = useState(""); // Ahora es solo texto
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
      setError("⚠️ No tienes sesión iniciada.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await api.get("/clientes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClientes(response.data);
    } catch (err) {
      setError("❌ Error al cargar clientes.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducto = async () => {
    if (!token) {
      setError("⚠️ No tienes sesión iniciada.");
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
      setPropiedades(producto.propiedades || ""); // Ahora maneja valores vacíos
      setCaracteristicas(producto.caracteristicas || ""); // Ahora maneja valores vacíos
    } catch (err) {
      setError("❌ Error al cargar producto.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("⚠️ No tienes sesión iniciada.");
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
      setError("❌ Error al guardar producto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">
        {id ? "✏️ Editar Producto" : "🆕 Registrar Producto"}
      </h2>

      {/* 📦 Icono representativo */}
      <div className="text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
          alt="Producto"
          className="mb-3"
          style={{ width: "80px", height: "80px" }}
        />
      </div>

      {/* 🔹 Mostrar errores */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label htmlFor="sku" className="form-label">
            🏷️ SKU
          </label>
          <input
            type="text"
            id="sku"
            className="form-control"
            placeholder="Ingrese SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            📦 Nombre del Producto
          </label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            placeholder="Nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cliente" className="form-label">
            🤝 Cliente
          </label>
          <select
            id="cliente"
            className="form-select"
            value={cliente_id}
            onChange={(e) => setClienteId(e.target.value)}
            required
            disabled={isLoading}
          >
            <option value="">Seleccionar Cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.razonSocial}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="propiedades" className="form-label">
            ⚙️ Propiedades
          </label>
          <textarea
            id="propiedades"
            className="form-control"
            placeholder="Ingrese propiedades del producto"
            value={propiedades}
            onChange={(e) => setPropiedades(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="caracteristicas" className="form-label">
            📋 Características
          </label>
          <textarea
            id="caracteristicas"
            className="form-control"
            placeholder="Ingrese características del producto"
            value={caracteristicas}
            onChange={(e) => setCaracteristicas(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={isLoading}
        >
          {isLoading
            ? "⏳ Guardando..."
            : id
            ? "💾 Actualizar Producto"
            : "📝 Registrar Producto"}
        </button>
      </form>
    </div>
  );
};

export default ProductoForm;
