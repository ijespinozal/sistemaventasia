import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../src/components/ProtectedRoute";
import Login from "../src/pages/Login";
import Products from "../src/pages/Products";
import Insights from "../src/pages/Insights";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Insights />} />
          <Route path="/products" element={<Products />} />
          <Route path="/insights" element={<Insights />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;