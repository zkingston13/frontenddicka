import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api"; // Importa la instancia global
import AuthContext from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const UsuarioForm = () => {
  const [nombre, setNombre] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [numEmpleado, setNumEmpleado] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [IsActive, setIsActive] = useState(true);
  const [rol_id, setRolId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("⚠️ No tienes sesión iniciada.");
        setIsLoading(false);
        return;
      }
      // Usamos la instancia global para obtener el usuario
      api
        .get(`/usuarios/${id}`)
        .then((response) => {
          const usuario = response.data;
          setNombre(usuario.nombre);
          setNombreUsuario(usuario.nombreUsuario);
          setNumEmpleado(usuario.numEmpleado?.toString() || "");
          setEmail(usuario.email);
          setIsActive(usuario.IsActive);
          setRolId(usuario.rol_id);
        })
        .catch(() => setError("❌ Error al cargar usuario"))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("⚠️ No tienes sesión iniciada.");
      return;
    }

    const usuarioData = {
      nombre,
      nombreUsuario,
      numEmpleado: parseInt(numEmpleado, 10) || 0,
      email, // Campo opcional
      password: password || undefined,
      IsActive,
      rol_id,
      usuarioModificacion: user.id,
    };

    try {
      setIsLoading(true);
      console.log("📤 Enviando datos:", usuarioData);
      if (id) {
        await api.put(`/usuarios/${id}`, usuarioData);
      } else {
        await api.post("/usuarios", usuarioData);
      }
      navigate("/usuarios");
    } catch (error) {
      console.error(
        "❌ Error en handleSubmit:",
        error.response?.data || error.message
      );
      setError("❌ Error al guardar usuario. Verifica los datos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">
        {id ? "✏️ Editar Usuario" : "🆕 Registrar Usuario"}
      </h2>
      <div className="text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Usuario"
          className="mb-3"
          style={{ width: "80px", height: "80px" }}
        />
      </div>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            👤 Nombre Completo
          </label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            placeholder="Ingrese el nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nombreUsuario" className="form-label">
            🏷️ Nombre de Usuario
          </label>
          <input
            type="text"
            id="nombreUsuario"
            className="form-control"
            placeholder="Ingrese el nombre de usuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="numEmpleado" className="form-label">
            🔢 Número de Empleado
          </label>
          <input
            type="number"
            id="numEmpleado"
            className="form-control"
            placeholder="Ingrese el número de empleado"
            value={numEmpleado}
            onChange={(e) => setNumEmpleado(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            📧 Correo Electrónico (opcional)
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Ingrese el correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // Se elimina el 'required' para hacerlo opcional
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            🔒 Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Ingrese la contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="isActive"
            className="form-check-input"
            checked={IsActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="isActive">
            🟢 Usuario Activo
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="rol_id" className="form-label">
            🔑 Rol
          </label>
          <select
            className="form-select"
            value={rol_id}
            onChange={(e) => setRolId(e.target.value)}
            required
          >
            <option value="">Seleccionar Rol</option>
            <option value="1">👑 Administrador</option>
            <option value="2">📋 Jefe de Operaciones</option>
            <option value="3">🔍 Supervisor</option>
            <option value="4">✅ Verificador</option>
            <option value="5">🚜 Montacarguista</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
          {isLoading
            ? "⏳ Guardando..."
            : id
            ? "💾 Actualizar Usuario"
            : "📝 Registrar Usuario"}
        </button>
      </form>
    </div>
  );
};

export default UsuarioForm;
