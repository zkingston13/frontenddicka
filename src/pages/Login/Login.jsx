import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/logopng.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Intentando iniciar sesión...");

    try {
      await login(nombreUsuario, password, setUser);
    } catch (err) {
      console.error("Error en login:", err);
      // Mensaje de error más formal y descriptivo
      setError("Credenciales incorrectas. Verifica tu usuario y contraseña.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh" }} // Cambiado a 100vh para centrar perfectamente en toda la pantalla
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "100%",
          maxWidth: "450px",
          // Se eliminó el height: "500px" para que el contenedor crezca dinámicamente si aparece el error
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-4 p-sm-5">
          
          {/* LOGO */}
          <div className="text-center mb-4">
            <a href="#">
              <img
                src={logo}
                alt="Logo"
                className="img-fluid"
                style={{ width: "120px" }}
              />
            </a>
          </div>

          {/* TÍTULO */}
          <h1 className="fs-4 fw-bold lh-sm text-dark text-center mb-4">
            Inicio de Sesión
          </h1>

          {/* MENSAJE DE ERROR */}
          {error && (
            <div 
              className="alert alert-danger text-center py-2 mb-4" 
              style={{ fontSize: "0.9rem" }}
              role="alert"
            >
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin}>
            
            {/* USUARIO */}
            <div className="mb-4">
              <label htmlFor="nombreUsuario" className="form-label fw-semibold">
                Usuario
              </label>
              <input
                type="text"
                id="nombreUsuario"
                className="form-control form-control-lg"
                placeholder="Ingresa tu usuario..."
                value={nombreUsuario}
                onChange={(e) => {
                  setNombreUsuario(e.target.value);
                  setError(""); // Limpia el error al empezar a escribir
                }}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Ingresa tu contraseña..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(""); // Limpia el error al empezar a escribir
                }}
                required
              />
            </div>

            {/* BOTÓN */}
            <button
              type="submit"
              className="btn w-100 text-white fw-bold py-2 mt-2"
              style={{
                backgroundColor: "#8DB9F5",
                borderRadius: "12px",
              }}
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
