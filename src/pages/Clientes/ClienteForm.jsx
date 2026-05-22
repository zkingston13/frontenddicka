import { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import AuthContext from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const ClienteForm = () => {
  const [razonSocial, setRazonSocial] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const fetchCliente = useCallback(async () => {
    if (!id || !token) return;

    try {
      setIsLoading(true);
      const response = await api.get(`/clientes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRazonSocial(response.data.razonSocial);
      setDomicilio(response.data.domicilio);
    } catch (err) {
      setError("❌ Error al cargar cliente.");
      console.error(
        "Error al obtener cliente:",
        err.response?.data || err.message
      );
    } finally {
      setIsLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchCliente();
  }, [fetchCliente]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("⚠️ No tienes sesión iniciada.");
      return;
    }

    if (!user?.id) {
      setError("⚠️ No se pudo determinar el usuario autenticado.");
      return;
    }

    const clienteData = {
      razonSocial,
      domicilio,
      usuario_id: user.id,
    };

    try {
      setIsLoading(true);
      if (id) {
        await api.put(`/clientes/${id}`, clienteData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/clientes", clienteData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/clientes");
    } catch (error) {
      setError("❌ Error al guardar cliente.");
      console.error(
        "Error al guardar cliente:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">
        {id ? "✏️ Editar Cliente" : "🆕 Registrar Cliente"}
      </h2>

      {/* 📸 Icono de empresa */}
      <div className="text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
          alt="Cliente"
          className="mb-3"
          style={{ width: "80px", height: "80px" }}
        />
      </div>

      {/* 🔹 Mostrar errores */}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {/* 🔹 Formulario con Bootstrap */}
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label htmlFor="razonSocial" className="form-label">
            🏢 Razón Social
          </label>
          <input
            type="text"
            id="razonSocial"
            className="form-control"
            placeholder="Ingrese la razón social"
            value={razonSocial}
            onChange={(e) => setRazonSocial(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="domicilio" className="form-label">
            📍 Domicilio
          </label>
          <input
            type="text"
            id="domicilio"
            className="form-control"
            placeholder="Ingrese el domicilio"
            value={domicilio}
            onChange={(e) => setDomicilio(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
          {isLoading
            ? "⏳ Guardando..."
            : id
            ? "💾 Actualizar Cliente"
            : "📝 Registrar Cliente"}
        </button>
      </form>
    </div>
  );
};

export default ClienteForm;
