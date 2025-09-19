// frontend/src/pages/Admin/Categories.jsx
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import CategoryForm from "../../components/CategoryForm";
import DashboardLayout from "../../components/layouts/DashboardLayout";

export default function Categories() {
  const api = useApi();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ rows: [], total: 0 });
  const [editing, setEditing] = useState(null); // null=create, obj=edit, false=closed

  const fetchData = async () => {
    const res = await api.get(`/categories?q=${encodeURIComponent(q)}&page=${page}&pageSize=10`);
    setData(res.data);
  };

  useEffect(() => { fetchData(); /* eslint-disable-next-line */ }, [page]);

  const onCreate = async (payload) => {
    await api.post("/categories", payload);
    setEditing(false);
    fetchData();
  };
  const onUpdate = async (payload) => {
    await api.put(`/categories/${editing.id}`, payload);
    setEditing(false);
    fetchData();
  };
  const onDelete = async (id) => {
    if (!confirm("¿Eliminar categoría?")) return;
    await api.delete(`/categories/${id}`);
    fetchData();
  };

  const totalPages = Math.max(1, Math.ceil(data.total / 10));

  return (
    <DashboardLayout activeMenu="Categorias">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold">Categorías</h1>
          <div className="flex gap-2">
            <input
              value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar..."
              className="input input-bordered"
              onKeyDown={(e)=> e.key==='Enter' && (setPage(1), fetchData())}
            />
            <button className="btn" onClick={()=> (setPage(1), fetchData())}>Buscar</button>
            <button className="btn btn-primary" onClick={()=> setEditing({})}>Nueva</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr><th>Nombre</th><th>Descripción</th><th>Activo</th><th></th></tr>
            </thead>
            <tbody>
              {data.rows.map(c => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>{c.is_active ? 'Sí' : 'No'}</td>
                  <td className="text-right">
                    <button className="btn btn-sm" onClick={()=> setEditing(c)}>Editar</button>
                    <button className="btn btn-sm btn-error ml-2" onClick={()=> onDelete(c.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {data.rows.length === 0 && (
                <tr><td colSpan={4} className="text-center text-sm py-6">Sin resultados</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end items-center gap-2 mt-3">
          <button className="btn" disabled={page<=1} onClick={()=> setPage(p=>p-1)}>«</button>
          <span className="text-sm">Página {page} de {totalPages}</span>
          <button className="btn" disabled={page>=totalPages} onClick={()=> setPage(p=>p+1)}>»</button>
        </div>

        {editing !== false && (
          <div className="fixed inset-0 bg-black/40 grid place-items-center">
            <div className="bg-white p-4 rounded-xl w-full max-w-md">
              <h2 className="text-lg font-semibold mb-2">
                {editing && editing.id ? 'Editar categoría' : 'Nueva categoría'}
              </h2>
              <CategoryForm
                initial={editing && editing.id ? editing : null}
                onSubmit={editing && editing.id ? onUpdate : onCreate}
                onCancel={()=> setEditing(false)}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
