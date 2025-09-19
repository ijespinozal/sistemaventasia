// frontend/src/components/CategoryForm.jsx
import { useState, useEffect } from "react";

export default function CategoryForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: "", description: "", is_active: 1 });

  useEffect(() => {
    if (initial) setForm({
      name: initial.name ?? "",
      description: initial.description ?? "",
      is_active: initial.is_active ?? 1
    });
  }, [initial]);

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? (checked ? 1 : 0) : value }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm">Nombre</label>
        <input name="name" value={form.name} onChange={handle}
          className="input input-bordered w-full" required />
      </div>
      <div>
        <label className="block text-sm">Descripción</label>
        <input name="description" value={form.description ?? ''} onChange={handle}
          className="input input-bordered w-full" />
      </div>
      <label className="inline-flex items-center gap-2">
        <input type="checkbox" name="is_active"
          checked={!!form.is_active} onChange={handle} />
        Activo
      </label>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="btn">Cancelar</button>
        <button className="btn btn-primary">Guardar</button>
      </div>
    </form>
  );
}
