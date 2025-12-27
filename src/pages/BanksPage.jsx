import { useEffect, useState } from "react";
import api from "../api/api";

export default function BanksPage() {
  const [banks, setBanks] = useState([]);
  const [form, setForm] = useState({ name: "", link: "", template: "" });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const res = await api.get("/banks");
    setBanks(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    if (editingId) {
      await api.put(`/banks/${editingId}`, form);
    } else {
      await api.post("/banks", form);
    }
    setForm({ name: "", link: "", template: "" });
    setEditingId(null);
    load();
  };

  const edit = (bank) => {
    setForm({ name: bank.name, link: bank.link, template: bank.template });
    setEditingId(bank._id);
  };

  const remove = async (id) => {
    if (confirm("Delete this bank?")) {
      await api.delete(`/banks/${id}`);
      load();
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Banks & Templates</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Bank" : "Add New Bank"}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            className="input"
            placeholder="Bank Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="input"
            placeholder="Login Link"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
          />
        </div>
        <textarea
          className="input mt-4 h-32"
          placeholder="Message Template (use {{name}} and {{link}})"
          value={form.template}
          onChange={(e) => setForm({ ...form, template: e.target.value })}
        />
        <div className="mt-4">
          <button onClick={submit} className="btn-primary">
            {editingId ? "Update" : "Add"} Bank
          </button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm({ name: "", link: "", template: "" });
              }}
              className="btn-secondary ml-3"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {banks.map((bank) => (
          <div key={bank._id} className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg">{bank.name}</h3>
            <p className="text-sm text-gray-600 mt-2 break-all">
              <strong>Link:</strong> {bank.link}
            </p>
            <pre className="bg-gray-50 p-4 rounded mt-3 text-sm whitespace-pre-wrap">
              {bank.template}
            </pre>
            <div className="mt-4 flex gap-3">
              <button onClick={() => edit(bank)} className="btn-secondary">
                Edit
              </button>
              <button onClick={() => remove(bank._id)} className="btn-secondary text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}