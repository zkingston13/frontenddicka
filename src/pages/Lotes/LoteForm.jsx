import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import AuthContext from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const LoteForm = () => {
  const [folio, setFolio] = useState("");
  const [producto_id, setProductoId] = useState("");
  const [productos, setProductos] = useState([]);
  const [sku, setSku] = useState("");
  const [lote, setLote] = useState("");
  const [caducidad, setCaducidad] = useState("");
  const [fechaRecibido, setFechaRecibido] = useState("");
  const [numPalets, setNumPalets] = useState("");
  const [piezasPalet, setPiezasPalet] = useState("");
  const [piezasLote, setPiezasLote] = useState("");
  const [unidadMedida, setUnidadMedida] = useState("");
  const [operador, setOperador] = useState("");
  const[lt, setLt] = useState("");
  const[placas, setPlacas] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // 🔹 Cuando el producto cambia, actualizar el SKU automáticamente
    const productoSeleccionado = productos.find(
      (p) => p.id === Number(producto_id)
    );
    setSku(productoSeleccionado ? productoSeleccionado.sku : "");
  }, [producto_id, productos]);

  useEffect(() => {
    fetchProductos();
    if (id) fetchLote();
  }, [id]);

  const fetchProductos = async () => {
    if (!token) {
      setError("⚠️ No tienes sesión iniciada.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.get("/productos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(response.data || []);
    } catch (err) {
      setError("❌ Error al cargar productos.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLote = async () => {
    if (!token) {
      setError("⚠️ No tienes sesión iniciada.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.get(`/lotes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const loteData = response.data;

      if (!loteData) {
        setError("❌ No se encontraron datos del lote.");
        return;
      }

      setFolio(loteData.folio || "");
      setProductoId(loteData.producto_id || "");
      setLote(loteData.lote || "");
      setCaducidad(loteData.caducidad || "");
      setFechaRecibido(loteData.fechaRecibido || "");
      setNumPalets(loteData.numPalets || "");
      setPiezasPalet(loteData.piezasPalet || "");
      setPiezasLote(loteData.piezasLote || "");
      setUnidadMedida(loteData.unidadMedida || "");
      serOperador(loteData.operador || "");
      setLt(loteData.lt || "");
      setPlacas(loteData.placas || "");
      setObservaciones(loteData.observaciones || "");
    } catch (err) {
      setError("❌ Error al cargar lote.");
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

    const loteData = {
      folio,
      producto_id,
      lote,
      caducidad,
      fechaRecibido,
      numPalets,
      piezasPalet,
      piezasLote,
      unidadMedida,
      operador,
      lt,
      placas,
      observaciones,
      usuario_id: user.id,
    };

    try {
      setIsLoading(true);
      if (id) {
        await api.put(`/lotes/${id}`, loteData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/lotes", loteData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/lotes");
    } catch (error) {
      setError("❌ Error al guardar lote.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">
        {id ? "✏️ Editar Lote" : "📦 Registrar Lote"}
      </h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {isLoading && (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label htmlFor="folio" className="form-label">
            📜 Folio
          </label>
          <input
            type="number"
            id="folio"
            className="form-control"
            value={folio}
            onChange={(e) => setFolio(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="producto" className="form-label">
            📌 Seleccionar Producto
          </label>
          <select
            id="producto"
            className="form-select"
            value={producto_id}
            onChange={(e) => setProductoId(e.target.value)}
            required
          >
            <option value="">Seleccione un producto</option>
            {productos.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.nombre} (SKU: {prod.sku})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="fechaRecibido" className="form-label">
            📥 Fecha de Recibido
          </label>
          <input
            type="date"
            id="fechaRecibido"
            className="form-control"
            value={fechaRecibido}
            onChange={(e) => setFechaRecibido(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lote" className="form-label">
            🔢 Número de Lote
          </label>
          <input
            type="text"
            id="lote"
            className="form-control"
            value={lote}
            onChange={(e) => setLote(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="caducidad" className="form-label">
            📅 Fecha de Caducidad
          </label>
          <input
            type="date"
            id="caducidad"
            className="form-control"
            value={caducidad}
            onChange={(e) => setCaducidad(e.target.value)}
            required
          />
        </div>

        {/* 📦 Número de Palets */}
        <div className="mb-3">
          <label htmlFor="numPalets" className="form-label">
            📦 Número de Palets
          </label>
          <input
            type="number"
            id="numPalets"
            className="form-control"
            value={numPalets}
            onChange={(e) => setNumPalets(e.target.value)}
            required
          />
        </div>

        {/* 🔢 Piezas por Pallet */}
        <div className="mb-3">
          <label htmlFor="piezasPalet" className="form-label">
            🔢 Piezas por Pallet
          </label>
          <input
            type="number"
            id="piezasPalet"
            className="form-control"
            value={piezasPalet}
            onChange={(e) => setPiezasPalet(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="unidadMedida" className="form-label">
            ⚖️ Unidad de Medida
          </label>
          <input
            type="text"
            id="unidadMedida"
            className="form-control"
            value={unidadMedida}
            onChange={(e) => setUnidadMedida(e.target.value)}
            required
          />
        </div>
          <div className="mb-3">
          <label htmlFor="operador" className="form-label">
            Operador
          </label>
          <input
            type="text"
            id="operador"
            className="form-control"
            value={operador}
            onChange={(e) => setOperador(e.target.value)}
            required
          />
        </div>
         
             <div className="mb-3">
          <label htmlFor="lt" className="form-label">
            Lt
          </label>
          <input
            type="text"
            id="lt"
            className="form-control"
            value={lt}
            onChange={(e) => setLt(e.target.value)}
            required
          />
        </div>
        
            <div className="mb-3">
          <label htmlFor="placas" className="form-label">
            Placas
          </label>
          <input
            type="text"
            id="placas"
            className="form-control"
            value={placas}
            onChange={(e) => setPlacas(e.target.value)}
            required
          />
        </div>


        <div className="mb-3">
          <label htmlFor="observaciones" className="form-label">
            📝 Observaciones
          </label>
          <textarea
            id="observaciones"
            className="form-control"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
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
            ? "💾 Actualizar Lote"
            : "📝 Registrar Lote"}
        </button>
      </form>
    </div>
  );
};

export default LoteForm;
