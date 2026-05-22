import React, { useEffect, useState, useRef } from "react";
import { getRacks, getNiveles, getUbicaciones, actualizarUbicacion } from "../../services/racks";
import "bootstrap/dist/css/bootstrap.min.css";

const RackMap = () => {
  const [racks, setRacks] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [selectedRack, setSelectedRack] = useState("");
  const [selectedNivel, setSelectedNivel] = useState("");
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    cargarRacks();
    // listener para cerrar dropdown al hacer click fuera
    const handleClickOutside = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setDropdownOpenId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const cargarRacks = async () => {
    setErrorMsg("");
    try {
      const res = await getRacks();
      setRacks(res || []);
    } catch (err) {
      console.error("Error cargando racks:", err);
      setErrorMsg("No se pudieron cargar los racks.");
      setRacks([]);
    }
  };

  const cargarNiveles = async (rackId) => {
    setErrorMsg("");
    try {
      const res = await getNiveles(rackId);
      setNiveles(res || []);
    } catch (err) {
      console.error("Error cargando niveles:", err);
      setErrorMsg("No se pudieron cargar los niveles.");
      setNiveles([]);
    }
  };

  const cargarUbicaciones = async (rackId, nivel) => {
    if (!rackId || !nivel) return;
    setLoading(true);
    setErrorMsg("");
    setDropdownOpenId(null);
    try {
      const res = await getUbicaciones(rackId, nivel);
      // Normalizar cada ubicación: asegurar que exista un id único y estado en minúsculas
      const norm = (res || []).map((u) => {
        const id = u.id ?? u._id ?? `${u.rack ?? ""}-${u.nivel ?? ""}-${u.posicion ?? u.codigo ?? Math.random()}`;
        return {
          ...u,
          __uid: id,
          estado_norm: (u.estado ?? u.estado_string ?? "").toString().toLowerCase()
        };
      });
      setUbicaciones(norm);
    } catch (err) {
      console.error("Error cargando ubicaciones:", err);
      setErrorMsg("No se pudieron cargar las ubicaciones.");
      setUbicaciones([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRackChange = (e) => {
    const rackId = e.target.value;
    setSelectedRack(rackId);
    setSelectedNivel("");
    setUbicaciones([]);
    setDropdownOpenId(null);
    if (rackId) cargarNiveles(rackId);
    else setNiveles([]);
  };

  const handleNivelChange = (e) => {
    const nivel = e.target.value;
    setSelectedNivel(nivel);
    setDropdownOpenId(null);
    cargarUbicaciones(selectedRack, nivel);
  };

  const cambiarEstado = async (estado, ubicacion) => {
    if (!ubicacion) return;
    setErrorMsg("");
    const uid = ubicacion.__uid;
    try {
      // Optimista: marcar localmente mientras se hace petición
      setUbicaciones((prev) =>
        prev.map((p) =>
          p.__uid === uid ? { ...p, estado_norm: estado.toLowerCase(), estado: capitalize(estado) } : p
        )
      );

      await actualizarUbicacion(ubicacion.id ?? ubicacion._id ?? ubicacion.__uid, { estado });

      // reload del nivel para garantizar consistencia con servidor
      await cargarUbicaciones(selectedRack, selectedNivel);
      setDropdownOpenId(null);
    } catch (err) {
      console.error("Error actualizando ubicación:", err);
      setErrorMsg("No se pudo actualizar la ubicación. Intenta de nuevo.");
      // revertir (simple re-fetch)
      cargarUbicaciones(selectedRack, selectedNivel);
    }
  };

  const toggleDropdown = (uid, e) => {
    // evitar que el click se propague y el listener global lo cierre
    e.stopPropagation && e.stopPropagation();
    setDropdownOpenId((prev) => (prev === uid ? null : uid));
  };

  const capitalize = (s) => {
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  };

  return (
    <div className="container mt-4" ref={containerRef}>
      <h3 className="mb-3">Mapa de Racks</h3>

      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      {/* Controles */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label>Rack:</label>
          <select className="form-control" onChange={handleRackChange} value={selectedRack}>
            <option value="">-- Seleccionar --</option>
            {racks.map((rack) => {
              // normalizar id/nombre
              const key = rack.id ?? rack._id ?? rack.rack ?? rack.nombre;
              const nombre = rack.nombre ?? rack.rack ?? key;
              return (
                <option key={key} value={key}>
                  {nombre}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-md-4">
          <label>Nivel:</label>
          <select
            className="form-control"
            disabled={!selectedRack}
            onChange={handleNivelChange}
            value={selectedNivel}
          >
            <option value="">-- Seleccionar --</option>
            {niveles.map((nivel) => (
              <option key={nivel} value={nivel}>
                {nivel}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Estado de carga */}
      {loading && (
        <div className="text-center mb-3">
          <div className="spinner-border text-success" role="status" />
        </div>
      )}

      {/* GRID */}
      <div className="row">
        {ubicaciones.length === 0 && !loading && (
          <div className="col-12">
            <div className="alert alert-info">No hay ubicaciones para mostrar.</div>
          </div>
        )}

        {ubicaciones.map((u) => {
          const uid = u.__uid;
          const estado = (u.estado_norm ?? "").toLowerCase();
          const isOpen = dropdownOpenId === uid;

          return (
            <div key={uid} className="col-md-2 mb-4 position-relative" onClick={(e) => e.stopPropagation()}>
              <div
                role="button"
                className={`p-3 text-center rounded shadow-sm border ${estado === "vacio" ? "bg-success text-white" : estado === "ocupado" ? "bg-danger text-white" : "bg-warning text-dark"
                  }`}
                style={{ cursor: "pointer" }}
                onClick={(e) => toggleDropdown(uid, e)}
              >
                <b>{u.codigo ?? `${u.rack ?? ""}-${u.nivel ?? ""}-${u.posicion ?? ""}`}</b>
                <div style={{ fontSize: 12 }}>{capitalize(u.estado ?? u.estado_norm ?? "")}</div>
              </div>

              {/* Dropdown */}
              {isOpen && (
                <div
                  className="card shadow position-absolute"
                  style={{ top: "105%", left: 0, width: "100%", zIndex: 30 }}
                >
                  <ul className="list-group list-group-flush">
                    <li
                      className="list-group-item list-group-item-action text-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => cambiarEstado("vacio", u)}
                    >
                       Vacío
                    </li>
                    <li
                      className="list-group-item list-group-item-action text-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => cambiarEstado("ocupado", u)}
                    >
                       Ocupado
                    </li>
                    <li
                      className="list-group-item list-group-item-action text-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => cambiarEstado("mantenimiento", u)}
                    >
                       Mantenimiento
                    </li>
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RackMap;
