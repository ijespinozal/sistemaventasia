import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold">Inventario IA</Link>
        <nav className="flex gap-4 text-sm">
          <NavLink to="/products" className={({isActive}) => isActive ? "text-blue-600" : ""}>Productos</NavLink>
          <NavLink to="/insights" className={({isActive}) => isActive ? "text-blue-600" : ""}>Insights</NavLink>
        </nav>
        <div className="text-sm flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:block">{user.full_name}</span>
              <button onClick={logout} className="btn btn-primary">Salir</button>
            </>
          ) : (
            <NavLink to="/login" className="btn btn-primary">Ingresar</NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
