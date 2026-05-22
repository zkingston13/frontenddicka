import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Usuarios from "./pages/Usuarios/Usuarios";
import UsuarioForm from "./pages/Usuarios/UsuarioForm";
import Productos from "./pages/Productos/Productos";
import ProductoForm from "./pages/Productos/ProductoForm";
import Clientes from "./pages/Clientes/Clientes";
import ClienteForm from "./pages/Clientes/ClienteForm";
import Lotes from "./pages/Lotes/Lotes";
import LoteForm from "./pages/Lotes/LoteForm";
import Salidas from "./pages/Salidas/Salidas";
import LotesUbicadosNoUbicados from "./pages/LotesUbi/LotesUbicadosNoUbicados";
import DetalleLote from "./pages/LotesUbi/DetalleLote";
import RackMap from "./pages/LotesUbi/rackMap";

const Router = () => (
  <>
    <Navbar />
    <Routes>
      {/* 🔹 Login */}
      <Route path="/" element={<Login />} />

      {/* 🔹 Rutas Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Usuarios */}
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuarios/nuevo" element={<UsuarioForm />} />
        <Route path="/usuarios/editar/:id" element={<UsuarioForm />} />

        {/* Productos */}
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/nuevo" element={<ProductoForm />} />
        <Route path="/productos/editar/:id" element={<ProductoForm />} />

        {/* Lotes */}
        <Route path="/lotes" element={<Lotes />} />
        <Route path="/lotes/nuevo" element={<LoteForm />} />
        <Route path="/lotes/editar/:id" element={<LoteForm />} />

        {/* Clientes */}
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/nuevo" element={<ClienteForm />} />
        <Route path="/clientes/editar/:id" element={<ClienteForm />} />

        {/* Salidas */}
        <Route path="/salidas" element={<Salidas />} />

        {/*Ubicacion lotes*/}
        <Route path="/lotes/ubicados-no-ubicados" element={<LotesUbicadosNoUbicados />} />
        <Route path="/lotes/detalle/:id" element={<DetalleLote />} />
        <Route path="/racks/mapa" element={<RackMap />}/>
      </Route>
    </Routes>
  </>
);

export default Router;
