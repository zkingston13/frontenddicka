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
      setError("Error al cargar la información del cliente.");
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
      setError("No tienes sesión iniciada.");
      return;
    }

    if (!user?.id) {
      setError("No se pudo determinar el usuario autenticado.");
      return;
    }

    // Validacion basica frontend para evitar envios vacios de puros espacios
    if (!razonSocial.trim() || !domicilio.trim()) {
      setError("Todos los campos son obligatorios y no pueden estar vacíos.");
      return;
    }

    const clienteData = {
      razonSocial: razonSocial.trim(),
      domicilio: domicilio.trim(),
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
      // Manejo de errores de validacion del backend (ej. Razon social duplicada)
      if (error.response && error.response.status === 422) {
        setError("La razón social ya existe o los datos son inválidos. Verifica la información.");
      } else {
        setError("Error al guardar la información del cliente.");
      }
      console.error(
        "Error al guardar cliente:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h2 className="text-center mb-4">
            {id ? "Editar Cliente" : "Registrar Nuevo Cliente"}
          </h2>

          {error && (
            <div className="alert alert-danger text-center fw-bold" role="alert">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="border p-4 rounded shadow-sm bg-white"
          >
            <div className="mb-3">
              <label htmlFor="razonSocial" className="form-label fw-medium">
                Razón Social
              </label>
              <input
                type="text"
                id="razonSocial"
                className="form-control"
                placeholder="Ingrese la razón social"
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value.toUpperCase())}
                required
                disabled={isLoading}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="domicilio" className="form-label fw-medium">
                Domicilio Fiscal / Dirección
              </label>
              <input
                type="text"
                id="domicilio"
                className="form-control"
                placeholder="Ingrese el domicilio fiscal"
                value={domicilio}
                onChange={(e) => setDomicilio(e.target.value.toUpperCase())}
                required
                disabled={isLoading}
              />
            </div>

            <hr className="my-4" />

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/clientes")}
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
                  : "Registrar Cliente"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClienteForm;
