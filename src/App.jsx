import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./components/NavBar";

// ATENCIÓN: Aquí importamos el nuevo componente del temporizador
import InactivityTimer from "./components/InactivityTimer"; 

// Carga diferida (Lazy Loading)
const Login = lazy(() => import("./pages/Login/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Lotes = lazy(() => import("./pages/Lotes/Lotes"));
const LoteForm = lazy(() => import("./pages/Lotes/LoteForm"));
const Productos = lazy(() => import("./pages/Productos/Productos"));
const ProductoForm = lazy(() => import("./pages/Productos/ProductoForm"));
const Clientes = lazy(() => import("./pages/Clientes/Clientes"));
const ClienteForm = lazy(() => import("./pages/Clientes/ClienteForm"));
const Salidas = lazy(() => import("./pages/Salidas/Salidas"));
const Usuarios = lazy(() => import("./pages/Usuarios/Usuarios"));
const UsuarioForm = lazy(() => import("./pages/Usuarios/UsuarioForm"));
const LotesUbicadosNoUbicados = lazy(() => import("./pages/LotesUbi/LotesUbicadosNoUbicados"));
const DetalleLote = lazy(() => import("./pages/LotesUbi/DetalleLote"));
const RackMap = lazy(() => import("./pages/LotesUbi/rackMap"));

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* ATENCIÓN: Aquí colocamos el temporizador. Al estar dentro del Router, puede redirigir al login, y al no tener diseño, es invisible en tu interfaz. */}
        <InactivityTimer />
        
        <Navbar />
        <Suspense fallback={<div className="loading-screen">Cargando...</div>}>
          <Routes>
            {/* Redirigir a Dashboard si está autenticado */}
            <Route path="/" element={<ProtectedHome />} />
            
            {/* RUTA DE LOGIN AGREGADA AQUÍ PARA EVITAR EL ERROR 404 */}
            <Route path="/login" element={<Login />} />

            {/* Rutas Protegidas */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lotes" element={<Lotes />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/salidas" element={<Salidas />} />
            <Route path="/usuarios" element={<Usuarios />} />
            
            {/* CRUD de Lotes */}
            <Route path="/lotes/nuevo" element={<LoteForm />} />
            <Route path="/lotes/editar/:id" element={<LoteForm />} />
            
            {/* CRUD de Productos */}
            <Route path="/productos/nuevo" element={<ProductoForm />} />
            <Route path="/productos/editar/:id" element={<ProductoForm />} />
            
            {/* CRUD de Clientes */}
            <Route path="/clientes/nuevo" element={<ClienteForm />} />
            <Route path="/clientes/editar/:id" element={<ClienteForm />} />
            
            {/* CRUD de Usuarios */}
            <Route path="/usuarios/nuevo" element={<UsuarioForm />} />
            <Route path="/usuarios/editar/:id" element={<UsuarioForm />} />

            {/* Vistas de lotes Ubicados */}
            <Route path="/lotes/ubicados-no-ubicados" element={<LotesUbicadosNoUbicados />} />
            <Route path="/lotes/detalle/:id" element={<DetalleLote />} />
            <Route path="/racks/mapa/:loteId?" element={<RackMap />} />

            {/* Página 404 */}
            <Route path="*" element={<h2>Página no encontrada</h2>} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

function ProtectedHome() {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/dashboard" /> : <Login />;
}

export default App;
