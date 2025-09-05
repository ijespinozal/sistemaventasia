import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";

export default function Products() {
  const api = useApi();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/products");
        setRows(data);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-3">Productos</h1>
      {err && <p className="text-red-600 text-sm mb-3">{err}</p>}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-3 py-2">SKU</th>
                <th className="text-left px-3 py-2">Nombre</th>
                <th className="text-right px-3 py-2">Costo</th>
                <th className="text-right px-3 py-2">Precio</th>
                <th className="text-right px-3 py-2">Stock</th>
                <th className="text-right px-3 py-2">Min</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="px-3 py-2">{r.sku}</td>
                  <td className="px-3 py-2">{r.name}</td>
                  <td className="px-3 py-2 text-right">S/ {Number(r.cost).toFixed(2)}</td>
                  <td className="px-3 py-2 text-right">S/ {Number(r.price).toFixed(2)}</td>
                  <td className="px-3 py-2 text-right">{r.stock ?? 0}</td>
                  <td className="px-3 py-2 text-right">{r.min_stock}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan="6" className="px-3 py-4 text-center text-gray-500">No hay productos</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
