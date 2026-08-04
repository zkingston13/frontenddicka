import React, { useEffect, useState } from "react";
import {
  getDetalleLote,
  getRecomendacionLote,
  terminarUbicacionLote,
  imprimirEtiquetaPallet,
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
  const [ubicacionesConfirmadas, setUbicacionesConfirmadas] = useState([]);
  const [confirmando, setConfirmando] = useState(null);
  const [imprimiendoCodigo, setImprimiendoCodigo] = useState(null);
  const [ubicacionIngresada, setUbicacionIngresada] = useState("");

  /**
   * Cargar información completa del lote.
   */
  const cargarDetalle = async () => {
    try {
      setError("");

      const data = await getDetalleLote(id);

      console.log("Detalle del lote:", data);

      setDetalle(data);

      const confirmadas =
        data.lote_ubicaciones?.map(
          (ubicacion) =>
            ubicacion.qr_ubicacion?.trim().toUpperCase()
        ) || [];

      setUbicacionesConfirmadas(confirmadas);

      /*
       * Solo solicitar recomendaciones cuando
       * el lote todavía no esté ubicado.
       */
      if (data.ubi === "No Ubicado") {
        try {
          const respuesta = await getRecomendacionLote(id);

          setRecomendaciones(
            respuesta.recomendaciones || []
          );

          setMensaje(
            respuesta.mensaje ||
              `Se encontraron ${
                respuesta.recomendaciones?.length || 0
              } ubicaciones recomendadas`
          );
        } catch (err) {
          console.error(
            "Error al cargar recomendaciones:",
            err
          );

          setMensaje(
            err.response?.data?.error ||
              err.response?.data?.message ||
              "No hay recomendaciones disponibles."
          );

          setRecomendaciones([]);
        }
      } else {
        setRecomendaciones([]);
        setMensaje("");
      }
    } catch (err) {
      console.error("Error al cargar el lote:", err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "No se pudo cargar la información del lote."
      );
    }
  };

  useEffect(() => {
    cargarDetalle();
  }, [id]);

  /**
   * Sincronizar las ubicaciones registradas desde la app móvil.
   * Consulta únicamente el detalle para no solicitar recomendaciones
   * en cada actualización.
   */
  useEffect(() => {
    const sincronizarUbicaciones = async () => {
      try {
        const data = await getDetalleLote(id);

        setDetalle(data);

        const confirmadas =
          data.lote_ubicaciones?.map(
            (ubicacion) =>
              ubicacion.qr_ubicacion?.trim().toUpperCase()
          ) || [];

        setUbicacionesConfirmadas(confirmadas);

        if (data.ubi === "Ubicado") {
          setRecomendaciones([]);
        }
      } catch (err) {
        // No reemplazamos la pantalla por un error si falla
        // solamente una consulta automática.
        console.error(
          "Error al sincronizar ubicaciones:",
          err
        );
      }
    };

    const intervalo = setInterval(
      sincronizarUbicaciones,
      3000
    );

    return () => clearInterval(intervalo);
  }, [id]);

  /**
   * Confirmar una ubicación recomendada.
   */
  const confirmarUbicacion = async (codigo) => {
    const codigoLimpio = codigo?.trim().toUpperCase();

    if (!codigoLimpio) {
      alert("Ingresa o escanea una ubicación.");
      return;
    }

    const recomendacionValida = recomendaciones.find(
      (recomendacion) =>
        recomendacion.ubicacion
          ?.trim()
          .toUpperCase() === codigoLimpio
    );

    if (!recomendacionValida) {
      const codigosPermitidos = recomendaciones
        .map((recomendacion) =>
          recomendacion.ubicacion
            ?.trim()
            .toUpperCase()
        )
        .filter(Boolean)
        .join(", ");

      setUbicacionIngresada("");

      alert(
        codigosPermitidos
          ? `La ubicación ${codigoLimpio} no está sugerida para este lote. Ubicaciones permitidas: ${codigosPermitidos}.`
          : "Este lote no tiene ubicaciones sugeridas disponibles."
      );

      return;
    }

    if (ubicacionesConfirmadas.includes(codigoLimpio)) {
      setUbicacionIngresada("");
      alert("Esta ubicación ya está confirmada.");
      return;
    }

    try {
      setConfirmando(codigoLimpio);

      const respuesta = await terminarUbicacionLote(
        id,
        codigoLimpio
      );

      setUbicacionesConfirmadas((anteriores) => {
        if (anteriores.includes(codigoLimpio)) {
          return anteriores;
        }

        return [...anteriores, codigoLimpio];
      });

      setUbicacionIngresada("");

      /*
       * Recargar siempre para obtener desde el backend
       * el pallet_numero asignado a la ubicación.
       */
      await cargarDetalle();

      if (respuesta.completado) {
        setMensaje(
          respuesta.message ||
            respuesta.mensaje ||
            "Todas las ubicaciones fueron confirmadas."
        );
      }
    } catch (err) {
      console.error(
        "Error al confirmar ubicación:",
        err
      );

      const mensajeError =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.response?.data?.detalle ||
        "No se pudo confirmar la ubicación.";

      alert(mensajeError);
    } finally {
      setConfirmando(null);
    }
  };

  /**
   * Confirmar el valor escrito o recibido por un lector de códigos.
   * La mayoría de los lectores envían Enter al terminar el escaneo.
   */
  const confirmarUbicacionIngresada = async (event) => {
    event.preventDefault();
    await confirmarUbicacion(ubicacionIngresada);
  };

  /**
   * Solicitar al backend el PDF correspondiente
   * a un pallet y abrirlo en una ventana nueva.
   */
  const imprimirUbicacion = async (ubicacion) => {
    let ventanaPdf = null;

    try {
      if (!ubicacion) {
        throw new Error(
          "No se recibió la información de la ubicación."
        );
      }

      const codigo = ubicacion.qr_ubicacion;

      const palletNumero =
        ubicacion.pallet_numero ||
        ubicacion.etiqueta_numero ||
        ubicacion.num_pallet;

      if (!codigo) {
        throw new Error(
          "La ubicación no tiene un código registrado."
        );
      }

      if (!palletNumero) {
        throw new Error(
          "La ubicación no tiene asignado un número de pallet."
        );
      }

      setImprimiendoCodigo(codigo);

      /*
       * Se abre antes de la petición para evitar que
       * el navegador bloquee la ventana emergente.
       */
      ventanaPdf = window.open(
        "",
        "_blank",
        "width=700,height=800"
      );

      if (!ventanaPdf) {
        throw new Error(
          "El navegador bloqueó la ventana. Habilita las ventanas emergentes."
        );
      }

      ventanaPdf.document.open();

      ventanaPdf.document.write(`
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="UTF-8">
            <title>Generando etiqueta</title>

            <style>
              body {
                margin: 0;
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: Arial, Helvetica, sans-serif;
                background: #f8f9fa;
              }

              .contenedor {
                text-align: center;
                background: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              }

              .spinner {
                width: 35px;
                height: 35px;
                margin: 0 auto 15px;
                border: 4px solid #dddddd;
                border-top-color: #0d6efd;
                border-radius: 50%;
                animation: girar 0.8s linear infinite;
              }

              @keyframes girar {
                to {
                  transform: rotate(360deg);
                }
              }

              p {
                margin: 0;
                color: #555555;
              }
            </style>
          </head>

          <body>
            <div class="contenedor">
              <div class="spinner"></div>
              <p>Generando etiqueta del pallet ${palletNumero}...</p>
            </div>
          </body>
        </html>
      `);

      ventanaPdf.document.close();

      const pdfBlob = await imprimirEtiquetaPallet(
        id,
        palletNumero
      );

      /*
       * Algunos servicios devuelven directamente el Blob.
       * Otros devuelven response.data.
       */
      const archivoPdf =
        pdfBlob?.data instanceof Blob
          ? pdfBlob.data
          : pdfBlob;

      if (!(archivoPdf instanceof Blob)) {
        throw new Error(
          "El backend no devolvió un archivo PDF válido."
        );
      }

      const pdfUrl = URL.createObjectURL(
        new Blob([archivoPdf], {
          type: "application/pdf",
        })
      );

      ventanaPdf.location.replace(pdfUrl);

      /*
       * Liberar la URL cuando ya no sea necesaria.
       */
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 120000);
    } catch (err) {
      console.error(
        "Error al imprimir etiqueta:",
        err
      );

      if (
        ventanaPdf &&
        !ventanaPdf.closed
      ) {
        ventanaPdf.close();
      }

      let mensajeError =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "No se pudo generar la etiqueta.";

      /*
       * Cuando Laravel devuelve un error JSON,
       * Axios puede recibirlo como Blob.
       */
      if (
        err.response?.data instanceof Blob &&
        err.response.data.type ===
          "application/json"
      ) {
        try {
          const texto =
            await err.response.data.text();

          const respuestaError =
            JSON.parse(texto);

          mensajeError =
            respuestaError.error ||
            respuestaError.message ||
            mensajeError;
        } catch (errorLectura) {
          console.error(
            "No se pudo leer el error del backend:",
            errorLectura
          );
        }
      }

      alert(mensajeError);
    } finally {
      setImprimiendoCodigo(null);
    }
  };

  /**
   * Pantalla de carga.
   */
  if (!detalle && !error) {
    return (
      <div className="text-center my-5 py-5">
        <div
          className="spinner-border text-primary spinner-border-sm"
          role="status"
        />

        <p className="text-muted small mt-2">
          Consultando detalles del lote comercial...
        </p>
      </div>
    );
  }

  /**
   * Pantalla de error.
   */
  if (error) {
    return (
      <div
        className="container py-5"
        style={{ maxWidth: "550px" }}
      >
        <div className="alert alert-danger shadow-sm border-0 small text-center mb-4">
          {error}
        </div>

        <div className="text-center">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm px-4 fw-medium"
            onClick={() => navigate(-1)}
          >
            Regresar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container py-4"
      style={{ maxWidth: "700px" }}
    >
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-link link-secondary text-decoration-none p-0 small fw-medium"
          onClick={() => navigate(-1)}
        >
          &larr; Volver al tablero general
        </button>
      </div>

      <div
        className="card border shadow-sm"
        style={{ borderRadius: "8px" }}
      >
        <div className="card-header bg-light border-bottom py-3 px-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span
                className="text-muted text-uppercase font-monospace"
                style={{ fontSize: "0.75rem" }}
              >
                Especificación de Registro
              </span>

              <h4 className="fw-bold text-dark mb-0 font-monospace mt-1">
                {detalle.lote}
              </h4>
            </div>

            <span
              className={`badge px-2 py-1 font-monospace ${
                detalle.ubi === "Ubicado"
                  ? "bg-success-subtle text-success border border-success-subtle"
                  : "bg-danger-subtle text-danger border border-danger-subtle"
              }`}
              style={{
                fontSize: "0.75rem",
                borderRadius: "4px",
              }}
            >
              {detalle.ubi}
            </span>
          </div>
        </div>

        <div className="card-body p-4">
          <div
            className="p-3 bg-light border mb-4"
            style={{ borderRadius: "6px" }}
          >
            <div className="text-secondary small text-uppercase fw-semibold">
              Producto asociado
            </div>

            <div className="text-dark fw-bold fs-6 mt-1">
              {detalle.producto?.nombre ||
                "Sin especificar"}
            </div>

            {detalle.producto?.sku && (
              <div className="text-muted small mt-1">
                SKU: {detalle.producto.sku}
              </div>
            )}
          </div>

          {/* LOTE UBICADO */}
          {detalle.ubi === "Ubicado" && (
            <div className="mt-2">
              <h6 className="fw-bold mb-3">
                Ubicaciones asignadas
              </h6>

              {detalle.lote_ubicaciones?.length >
              0 ? (
                <div className="d-flex flex-column gap-2">
                  {detalle.lote_ubicaciones.map(
                    (ubicacion, index) => {
                      const codigo =
                        ubicacion.qr_ubicacion;

                      const palletNumero =
                        ubicacion.pallet_numero ||
                        ubicacion.etiqueta_numero ||
                        ubicacion.num_pallet;

                      const estaImprimiendo =
                        imprimiendoCodigo === codigo;

                      return (
                        <div
                          key={`${codigo}-${index}`}
                          className="alert alert-success d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-0"
                        >
                          <div>
                            <div>
                              <span className="me-2">
                                Ubicación:
                              </span>

                              <strong className="font-monospace">
                                {codigo}
                              </strong>
                            </div>

                            {palletNumero && (
                              <div className="small text-muted mt-1">
                                Pallet:{" "}
                                <strong>
                                  {palletNumero}
                                </strong>
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm fw-medium"
                            disabled={
                              estaImprimiendo ||
                              !palletNumero
                            }
                            onClick={() =>
                              imprimirUbicacion(
                                ubicacion
                              )
                            }
                          >
                            {estaImprimiendo ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm me-1"
                                  style={{
                                    width: "10px",
                                    height: "10px",
                                  }}
                                />

                                Generando...
                              </>
                            ) : (
                              "Imprimir"
                            )}
                          </button>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="alert alert-warning">
                  Este lote no tiene ubicaciones
                  registradas.
                </div>
              )}
            </div>
          )}

          {/* LOTE NO UBICADO */}
{detalle.ubi === "No Ubicado" && (
  <div
    className="border border-warning-subtle bg-warning-subtle bg-opacity-10 p-4 mb-2"
    style={{ borderRadius: "6px" }}
  >
    <h6
      className="fw-bold text-warning-emphasis text-uppercase font-monospace mb-1"
      style={{ fontSize: "0.75rem" }}
    >
      Propuesta de Acomodo Óptimo
    </h6>

    <p className="text-muted small mb-3">
      {mensaje}
    </p>

    {/* CAPTURA MANUAL O MEDIANTE LECTOR */}
    <form
      className="bg-white border rounded p-3 mb-3"
      onSubmit={confirmarUbicacionIngresada}
    >
      <label
        htmlFor="ubicacionIngresada"
        className="form-label fw-semibold small"
      >
        Ingresar o escanear ubicación
      </label>

      <div className="input-group">
        <input
          id="ubicacionIngresada"
          type="text"
          list="ubicacionesSugeridas"
          className="form-control font-monospace text-uppercase"
          placeholder="Ej. A-01-02"
          value={ubicacionIngresada}
          disabled={confirmando !== null}
          autoComplete="off"
          autoFocus
          onChange={(event) =>
            setUbicacionIngresada(
              event.target.value.toUpperCase()
            )
          }
        />

        <button
          type="submit"
          className="btn btn-success"
          disabled={
            !ubicacionIngresada.trim() ||
            confirmando !== null
          }
        >
          {confirmando ===
          ubicacionIngresada.trim().toUpperCase()
            ? "Confirmando..."
            : "Confirmar"}
        </button>
      </div>

      <datalist id="ubicacionesSugeridas">
        {recomendaciones.map(
          (recomendacion, index) => (
            <option
              key={`${recomendacion.ubicacion}-${index}`}
              value={recomendacion.ubicacion}
            >
              {recomendacion.pallet_numero
                ? `Pallet ${recomendacion.pallet_numero}`
                : "Ubicación sugerida"}
            </option>
          )
        )}
      </datalist>

      <div className="form-text">
        Solo se aceptan los códigos sugeridos para este lote. Puedes escribirlos o escanearlos.
      </div>
    </form>

    {recomendaciones.length > 0 ? (
      <div className="d-flex flex-column gap-2">
        {recomendaciones.map((recomendacion, index) => {
          const codigo = recomendacion.ubicacion
            ?.trim()
            .toUpperCase();

          /*
           * Verifica si esta ubicación ya fue confirmada.
           */
          const estaConfirmada =
            ubicacionesConfirmadas.includes(codigo);

          /*
           * Después de confirmar, buscamos en el detalle
           * la ubicación guardada por el backend.
           */
          const ubicacionConfirmada =
            detalle.lote_ubicaciones?.find(
              (ubicacion) =>
                ubicacion.qr_ubicacion
                  ?.trim()
                  .toUpperCase() === codigo
            );

          /*
           * Número de pallet devuelto por el backend.
           */
          const palletNumero =
            ubicacionConfirmada?.pallet_numero ||
            ubicacionConfirmada?.etiqueta_numero ||
            ubicacionConfirmada?.num_pallet ||
            recomendacion.pallet_numero ||
            null;

          const codigoPallet =
            ubicacionConfirmada?.codigo_pallet ||
            recomendacion.codigo_pallet ||
            recomendacion.pallet_codigo ||
            palletNumero;

          const estaConfirmando =
            confirmando === codigo;

          const estaImprimiendo =
            imprimiendoCodigo === codigo;

          /*
           * Imprimir solamente cuando:
           * 1. La ubicación ya fue confirmada.
           * 2. Existe el objeto de ubicación guardado.
           * 3. Existe el número de pallet.
           */
          const puedeImprimir =
            estaConfirmada &&
            ubicacionConfirmada &&
            palletNumero;

          return (
            <div
              key={codigo || index}
              className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 border rounded p-2 bg-white"
            >
              <div>
                <div>
                  <span className="text-muted small me-2">
                    Código de ubicación:
                  </span>

                  <strong className="font-monospace">
                    {codigo}
                  </strong>
                </div>

                <div className="small text-muted mt-1">
                  Código de pallet:{" "}
                  <strong className="font-monospace">
                    {codigoPallet || "Sin código asignado"}
                  </strong>
                </div>

                {estaConfirmada && palletNumero && (
                  <div className="small text-success mt-1">
                    Pallet confirmado:{" "}
                    <strong>{palletNumero}</strong>
                  </div>
                )}

                {!estaConfirmada &&
                  recomendacion.pallet_numero && (
                    <div className="small text-muted mt-1">
                      Pallet sugerido:{" "}
                      <strong>
                        {recomendacion.pallet_numero}
                      </strong>
                    </div>
                  )}
              </div>

              <div className="d-flex align-items-center gap-2">
                {/* BOTÓN CONFIRMAR */}
                <button
                  type="button"
                  className={
                    estaConfirmada
                      ? "btn btn-success btn-sm"
                      : "btn btn-danger btn-sm"
                  }
                  disabled={
                    estaConfirmada ||
                    estaConfirmando
                  }
                  onClick={() =>
                    confirmarUbicacion(codigo)
                  }
                >
                  {estaConfirmada
                    ? "Confirmado"
                    : estaConfirmando
                      ? "Confirmando..."
                      : "Confirmar"}
                </button>

                {/* BOTÓN IMPRIMIR */}
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm fw-medium"
                  disabled={
                    !puedeImprimir ||
                    estaImprimiendo
                  }
                  onClick={() =>
                    imprimirUbicacion(
                      ubicacionConfirmada
                    )
                  }
                >
                  {estaImprimiendo ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        style={{
                          width: "10px",
                          height: "10px",
                        }}
                      />

                      Generando...
                    </>
                  ) : (
                    "Imprimir"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="alert alert-warning mb-0">
        No se encontraron ubicaciones recomendadas.
      </div>
    )}
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default DetalleLote;
