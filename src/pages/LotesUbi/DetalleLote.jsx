import React, { useEffect, useState } from "react";
import {
  getDetalleLote,
  getRecomendacionLote,
  terminarUbicacionLote,
} from "../../services/lotes";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DetalleLote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detalle, setDetalle] = useState(null);
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        const data = await getDetalleLote(id);
        setDetalle(data);

        if (data.ubi === "No Ubicado") {
          try {
            const rec = await getRecomendacionLote(id);

            setRecomendaciones(rec.recomendaciones || []);

            setMensaje(
              rec.mensaje ||
                `Se encontraron ${rec.recomendaciones?.length || 0} ubicaciones recomendadas`
            );
          } catch (err) {
            // Si la API de recomendaciones falla
            const apiError = err.response?.data?.error || "No hay recomendaciones disponibles.";
            setMensaje(apiError);
            setRecomendaciones([]);
          }
        }
      } catch (err) {
        console.error("❌ Error:", err);
        setError("No se pudo cargar la información del lote.");
      }
    };

    cargarDetalle();
  }, [id]);

  // Loading
  if (!detalle && !error) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted">Cargando detalle del lote...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error}</div>
        <div className="text-center">
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            ⬅️ Regresar
          </button>
        </div>
      </div>
    );
  }

  // Render principal
  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-header bg-success text-white text-center fw-bold fs-5">
          📋 Detalle del Lote
        </div>

        <div className="card-body">
          {/* Datos generales */}
          <div className="row mb-3">
            <div className="col-md-6">
              <p>
                <b>📜 Lote:</b> {detalle.lote}
              </p>
              <p>
                <b>🏷️ Estado:</b>{" "}
                <span
                  className={`badge ${
                    detalle.ubi === "Ubicado" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {detalle.ubi}
                </span>
              </p>
            </div>

            <div className="col-md-6">
              <p>
                <b>📦 Producto:</b>{" "}
                {detalle.producto?.nombre || "Sin producto"}
              </p>
            </div>
          </div>

          {/* Si está ubicado */}
          {detalle.ubi === "Ubicado" &&
            detalle.lote_ubicaciones?.length > 0 && (
              <div className="mt-4">
                <h5 className="text-success fw-bold">
                  📍 Ubicaciones del lote:
                </h5>
                <ul className="list-group mt-2">
                  {detalle.lote_ubicaciones.map((u, idx) => (
                    <li key={idx} className="list-group-item">
                      <b>Rack:</b> {u.qr_ubicacion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Si NO está ubicado */}
          {detalle.ubi === "No Ubicado" && (
            <div className="alert alert-warning mt-4 text-center shadow-sm">
              <h5 className="fw-bold mb-3">📍 Recomendaciones de Ubicación</h5>

              {recomendaciones.length > 0 ? (
                <>
                  <p className="fw-bold">{mensaje}</p>

                  <ul className="list-group list-group-flush">
                    {recomendaciones.map((r, i) => (
                      <li key={i} className="list-group-item fw-semibold">
                        🟡 {r.codigo || r.ubicacion}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-danger fw-bold">{mensaje}</p>
              )}

              <button
                className="btn btn-success mt-3 px-4"
                onClick={async () => {
                  try {
                    const res = await terminarUbicacionLote(id);
                    alert(res.message);
                    window.location.reload();
                  } catch (error) {
                    alert("❌ Error al actualizar el estado del lote.");
                  }
                }}
              >
                ✅ Terminar de ubicar
              </button>
            </div>
          )}

          <div className="text-center mt-4">
            <button
              className="btn btn-outline-success px-4"
              onClick={() => navigate(-1)}
            >
              ⬅️ Regresar a la lista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleLote;
