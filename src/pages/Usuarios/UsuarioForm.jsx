import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api"; // Importación de la instancia global de la API
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
        setError("No tienes sesión iniciada.");
        setIsLoading(false);
        return;
      }
      
      // Petición para obtener los datos del usuario a editar
      api
        .get(`/usuarios/${id}`)
        .then((response) => {
          const usuario = response.data;
          setNombre(usuario.nombre);
          setNombreUsuario(usuario.nombreUsuario);
          setNumEmpleado(usuario.numEmpleado?.toString() || "");
          setEmail(usuario.email || "");
          setIsActive(usuario.IsActive);
          setRolId(usuario.rol_id);
        })
        .catch(() => setError("Error al cargar los datos del usuario."))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  // Función para validar la complejidad de la contraseña
  const isPasswordValid = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No tienes sesión iniciada.");
      return;
    }

    if (!user?.id) {
      setError("No se pudo determinar el usuario autenticado.");
      return;
    }

    // Validaciones del Frontend
    if (!nombre.trim() || !nombreUsuario.trim()) {
      setError("El nombre y el nombre de usuario son obligatorios y no pueden contener solo espacios.");
      return;
    }

    if (numEmpleado <= 0) {
      setError("El número de empleado debe ser mayor a cero.");
      return;
    }

    // Validar contraseña solo si se está creando un usuario nuevo o si se escribió algo al editar
    if (!id || (id && password.trim() !== "")) {
      if (!isPasswordValid(password)) {
        setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial (ej. @, $, !, %, *, ?, &, .).");
        return;
      }
    }

    const usuarioData = {
      nombre: nombre.trim(),
      nombreUsuario: nombreUsuario.trim().toLowerCase().replace(/\s+/g, ''), // Minúsculas y sin espacios
      numEmpleado: parseInt(numEmpleado, 10),
      email: email.trim() || null, // Se envía null si está vacío para evitar problemas en BD
      password: password ? password.trim() : undefined,
      IsActive,
      rol_id: parseInt(rol_id, 10),
      usuarioModificacion: user.id,
    };

    try {
      setIsLoading(true);
      console.log("Enviando datos de usuario:", usuarioData);
      
      if (id) {
        await api.put(`/usuarios/${id}`, usuarioData);
      } else {
        await api.post("/usuarios", usuarioData);
      }
      
      navigate("/usuarios");
    } catch (error) {
      // Captura de errores específicos de validación del backend 
      if (error.response) {
        if (error.response.status === 422 || error.response.status === 409) {
          setError("El Nombre de Usuario, Correo o Número de Empleado ya existe en el sistema. Por favor, verifica la información.");
        } else {
          setError("Error al guardar el usuario. Verifica la conexión con el servidor.");
        }
      } else {
         setError("Error de conexión. No se pudo conectar con el servidor.");
      }
      
      console.error(
        "Error en la ejecución de handleSubmit:",
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
            {id ? "Editar Usuario" : "Registrar Nuevo Usuario"}
          </h2>
          
          {error && <div className="alert alert-danger text-center fw-bold">{error}</div>}
          
          <form
            onSubmit={handleSubmit}
            className="border p-4 rounded shadow-sm bg-white"
          >
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label fw-medium">
                Nombre Completo
              </label>
              <input
                type="text"
                id="nombre"
                className="form-control"
                placeholder="Ingrese el nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value.toUpperCase())}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="nombreUsuario" className="form-label fw-medium">
                Nombre de Usuario (Para iniciar sesión)
              </label>
              <input
                type="text"
                id="nombreUsuario"
                className="form-control"
                placeholder="ejemplo: jlopez"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value.toLowerCase().replace(/\s+/g, ''))} // Fuerza formato minúsculas sin espacios
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="numEmpleado" className="form-label fw-medium">
                Número de Empleado
              </label>
              <input
                type="number"
                id="numEmpleado"
                className="form-control"
                placeholder="Ingrese el número de nómina"
                value={numEmpleado}
                onChange={(e) => setNumEmpleado(e.target.value)}
                min="1"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-medium">
                Correo Electrónico <span className="text-muted fw-normal">(Opcional)</span>
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="ejemplo@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                disabled={isLoading}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-medium">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder={id ? "Deje en blanco para conservar la actual" : "Ingrese una contraseña segura"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!id}
                disabled={isLoading}
              />
               {!id && (
                 <small className="form-text text-muted">
                    Debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.
                 </small>
               )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="rol_id" className="form-label fw-medium">
                Rol en el Sistema
              </label>
              <select
                id="rol_id"
                className="form-select"
                value={rol_id}
                onChange={(e) => setRolId(e.target.value)}
                required
                disabled={isLoading}
              >
                <option value="">-- Seleccione un Rol --</option>
                <option value="1">Administrador</option>
                <option value="2">Jefe de Operaciones</option>
                <option value="3">Supervisor</option>
                <option value="4">Verificador</option>
                <option value="5">Montacarguista</option>
              </select>
            </div>

            <div className="mb-4 form-check">
              <input
                type="checkbox"
                id="isActive"
                className="form-check-input"
                checked={IsActive}
                onChange={(e) => setIsActive(e.target.checked)}
                disabled={isLoading}
              />
              <label className="form-check-label user-select-none" htmlFor="isActive">
                Usuario Activo (Permitir acceso al sistema)
              </label>
            </div>
            
            <hr className="my-4" />
            
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/usuarios")}
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
                  : "Registrar Usuario"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsuarioForm;
