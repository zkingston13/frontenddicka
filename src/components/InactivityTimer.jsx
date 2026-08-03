import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const InactivityTimer = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Si no hay un usuario logueado, no necesitamos iniciar el temporizador
    if (!user) return;

    let timeoutId;

    const handleLogout = () => {
      console.warn("Sesión cerrada por inactividad.");
      // Limpiamos el token de almacenamiento
      localStorage.removeItem("token");
      // Actualizamos el contexto global a nulo
      if (setUser) setUser(null);
      // Redirigimos al login
      navigate("/login");
    };

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      // Configuración del tiempo: 15 minutos (15 * 60 * 1000 milisegundos)
      // Puedes cambiar el 15 por los minutos que consideres necesarios
      timeoutId = setTimeout(handleLogout, 5 * 60 * 1000);
    };

    // Lista de eventos que demuestran que el usuario sigue activo
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart"
    ];

    // Asignar los "escuchadores" de eventos a la ventana del navegador
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Iniciar el temporizador por primera vez
    resetTimer();

    // Función de limpieza: se ejecuta al desmontar el componente
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [user, navigate, setUser]);

  // Este componente no renderiza nada en la interfaz
  return null; 
};

export default InactivityTimer;
