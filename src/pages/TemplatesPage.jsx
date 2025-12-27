// src/pages/TemplatesPage.jsx
import { useEffect, useState } from "react";
import api from "../api/api";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState({ name: "", content: "" });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    try {
      const res = await api.get("/templates");
      setTemplates(res.data);
    } catch (err) {
      console.error("Failed to load templates:", err);
      setTemplates([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    try {
      if (editingId) {
        await api.put(`/templates/${editingId}`, form);
      } else {
        await api.post("/templates", form);
      }
      setForm({ name: "", content: "" });
      setEditingId(null);
      load();
    } catch (err) {
      alert("Error saving template");
    }
  };

  const edit = (template) => {
    setForm({ name: template.name, content: template.content });
    setEditingId(template._id);
  };

  const remove = async (id) => {
    if (confirm("Delete this template?")) {
      try {
        await api.delete(`/templates/${id}`);
        load();
      } catch (err) {
        alert("Error deleting");
      }
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Custom Templates</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Template" : "Add New Template"}
        </h2>

        <input
          className="input mb-4"
          placeholder="Template Name (e.g. Follow Up, Approval)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          className="input h-40"
          placeholder="Template content... Use {{name}}, {{link}}, {{amount}} etc."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <div className="mt-4">
          <button onClick={submit} className="btn-primary">
            {editingId ? "Update" : "Add"} Template
          </button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm({ name: "", content: "" });
              }}
              className="btn-secondary ml-3"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {templates.length === 0 ? (
          <p className="text-gray-500 col-span-2 text-center py-8">
            No custom templates yet. Add one above!
          </p>
        ) : (
          templates.map((template) => (
            <div key={template._id} className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold text-lg">{template.name}</h3>
              <pre className="bg-gray-50 p-4 rounded mt-3 text-sm whitespace-pre-wrap">
                {template.content}
              </pre>
              <div className="mt-4 flex gap-3">
                <button onClick={() => edit(template)} className="btn-secondary">
                  Edit
                </button>
                <button
                  onClick={() => remove(template._id)}
                  className="btn-secondary text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}