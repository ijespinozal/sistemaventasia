import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const nav = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      nav("/products");
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <form onSubmit={onSubmit} className="card w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4">Iniciar sesión</h1>
        {err && <p className="text-red-600 text-sm mb-2">{err}</p>}
        <label className="text-sm">Email</label>
        <input className="input mb-3" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label className="text-sm">Contraseña</label>
        <input className="input mb-4" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button disabled={loading} className="btn btn-primary w-full">
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
