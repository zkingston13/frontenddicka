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
    console.log("🔹 Botón presionado, intentando iniciar sesión...");

    try {
      const userData = await login(nombreUsuario, password, setUser);
    } catch (err) {
      console.error("❌ Error en login:", err);
      setError("❌ Credenciales incorrectas");
    }
  };

   return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "90vh" }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "100%",
          maxWidth: "450px",
          height:"500px",
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-5">

      
  <div className="text-center mb-4">
    <a href="#">
      <img  src={logo} alt="Logo" className="img-fluid "
    style={{ width: "120px" }} />
    </a>
    </div>
        
          <h1 className="fs-4 fw-bold lh-sm text-dark ">
            Inicio de Sesión
          </h1>

    
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin}>

            {/* USUARIO */}
            <div className="mb-4">
              <label
                htmlFor="nombreUsuario"
                className="form-label fw-semibold"
              >
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
                  setError("");
                }}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="form-label fw-semibold"
              >
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
                  setError("");
                }}
                required
              />
            </div>

            {/* BOTON */}
            <button
              type="submit"
              className="btn w-100 text-white fw-bold py-2"
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
