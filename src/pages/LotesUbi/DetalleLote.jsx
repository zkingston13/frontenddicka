import React, { useEffect, useState } from "react";
import { getDetalleLote, getRecomendacionLote, terminarUbicacionLote } from "../../services/lotes";
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
            setMensaje(rec.mensaje || `Se encontraron ${rec.recomendaciones?.length || 0} ubicaciones recomendadas`);
          } catch (err) {
            const apiError = err.response?.data?.error || "No hay recomendaciones disponibles.";
            setMensaje(apiError);
            setRecomendaciones([]);
          }
        }
      } catch (err) {
        console.error("Error:", err);
        setError("No se pudo cargar la información del lote.");
      }
    };

    cargarDetalle();
  }, [id]);

  if (!detalle && !error) {
    return (
      <div className="text-center my-5 py-5">
        <div className="spinner-border text-primary spinner-border-sm" role="status"></div>
        <p className="text-muted small mt-2">Consultando detalles del lote comercial...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5" style={{ maxWidth: "550px" }}>
        <div className="alert alert-danger shadow-sm border-0 small text-center mb-4">{error}</div>
        <div className="text-center">
          <button className="btn btn-outline-secondary btn-sm px-4 fw-medium" onClick={() => navigate(-1)}>
            Regresar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      
      {/* Botón superior de retorno */}
      <div className="mb-3">
        <button className="btn btn-link link-secondary text-decoration-none p-0 small fw-medium" onClick={() => navigate(-1)}>
          &larr; Volver al tablero general
        </button>
      </div>

      <div className="card border shadow-sm" style={{ borderRadius: "8px" }}>
        
        {/* Cabecera Técnica */}
        <div className="card-header bg-light border-bottom py-3 px-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="text-muted text-uppercase tracking-wider font-monospace" style={{ fontSize: "0.75rem" }}>Especificación de Registro</span>
              <h4 className="fw-bold text-dark mb-0 font-monospace mt-0.5">{detalle.lote}</h4>
            </div>
            <span className={`badge px-2.5 py-1.5 font-monospace ${detalle.ubi === "Ubicado" ? "bg-success-subtle text-success border border-success-subtle" : "bg-danger-subtle text-danger border border-danger-subtle"}`} style={{ fontSize: "0.75rem", borderRadius: "4px" }}>
              {detalle.ubi}
            </span>
          </div>
        </div>

        {/* Cuerpo del Detalle */}
        <div className="card-body p-4">
          
          {/* Ficha Técnica */}
          <div className="p-3 bg-light border mb-4" style={{ borderRadius: "6px" }}>
            <div className="row">
              <div className="col-14 text-secondary small text-uppercase fw-semibold tracking-wide">Producto Asociado</div>
              <div className="col-14 text-dark fw-bold fs-6 mt-1">{detalle.producto?.nombre || "Sin especificar"}</div>
            </div>
          </div>

          {/* Bloque Condicional: YA ESTÁ UBICADO */}
          {detalle.ubi === "Ubicado" && detalle.lote_ubicaciones?.length > 0 && (
            <div className="mt-2">
              <h6 className="fw-bold text-secondary text-uppercase tracking-wider font-monospace mb-2.5" style={{ fontSize: "0.75rem" }}>Posiciones en Almacén</h6>
              <div className="list-group" style={{ borderRadius: "6px" }}>
                {detalle.lote_ubicaciones.map((u, idx) => (
                  <div key={idx} className="list-group-item d-flex justify-content-between align-items-center py-2.5 px-3 bg-white">
                    <span className="text-muted small">Posición asignada</span>
                    <span className="font-monospace text-dark fw-bold">{u.qr_ubicacion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bloque Condicional: NO ESTÁ UBICADO (Sistema de sugerencia inteligente) */}
          {detalle.ubi === "No Ubicado" && (
            <div className="border border-warning-subtle bg-warning-subtle bg-opacity-10 p-4 mb-2" style={{ borderRadius: "6px" }}>
              <h6 className="fw-bold text-warning-emphasis text-uppercase tracking-wider font-monospace mb-1" style={{ fontSize: "0.75rem" }}>Propuesta de Acomodo Óptimo</h6>
              <p className="text-muted small mb-3">{mensaje}</p>

              {recomendaciones.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {recomendaciones.map((r, i) => (
                    <span key={i} className="badge bg-white text-dark border shadow-sm font-monospace py-2 px-3 fs-6" style={{ borderRadius: "4px" }}>
                      {r.codigo || r.ubicacion}
                    </span>
                  ))}
                </div>
              )}

              <button
                className="btn btn-success btn-sm w-100 fw-semibold tracking-wide py-2"
                style={{ borderRadius: "5px" }}
                onClick={async () => {
                  try {
                    const res = await terminarUbicacionLote(id);
                    alert(res.message);
                    window.location.reload();
                  } catch (error) {
                    alert("Error al actualizar el estado del lote.");
                  }
                }}
              >
                Confirmar Posición Fija
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DetalleLote;