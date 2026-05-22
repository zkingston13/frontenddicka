import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import AuthContext from "../../context/AuthContext";
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
    console.log("🔹 Botón presionado, intentando iniciar sesión...");

    try {
      const userData = await login(nombreUsuario, password, setUser);
    } catch (err) {
      console.error("❌ Error en login:", err);
      setError("❌ Credenciales incorrectas");
    }
  };

  return (
    <div className="d-flex vh-100 w-100 justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow-lg text-center" style={{ width: "400px" }}>
        
        {/* 🖼 Imagen de usuario */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
          alt="Usuario"
          className="mb-3 mx-auto"
          style={{ width: "80px", height: "80px" }}
        />

        <h2 className="mb-3">🔑 Iniciar Sesión</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          {/* 🧑‍💻 Usuario */}
          <div className="mb-3 text-start">
            <label htmlFor="nombreUsuario" className="form-label">
              🧑‍💻 Usuario
            </label>
            <input
              type="text"
              id="nombreUsuario"
              className="form-control"
              placeholder="Ingresa tu usuario..."
              value={nombreUsuario}
              onChange={(e) => {
                setNombreUsuario(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          {/* 🔒 Contraseña */}
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">
              🔒 Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Ingresa tu contraseña..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            🚀 Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
