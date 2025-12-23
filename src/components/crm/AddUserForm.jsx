import { useState } from "react";
import { addUser } from "../../utils/storage";

export default function AddUserForm({ onAdded }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
  });

  const submit = () => {
    if (!form.name || !form.phone) return;

    addUser({
      id: crypto.randomUUID(),
      ...form,
    });

    onAdded();
    setForm({ name: "", phone: "", email: "", company: "" });
  };

  return (
    <div className="bg-gray-50 border rounded-xl p-4 mb-4">
      <h3 className="text-sm font-semibold mb-3">
        Add New Contact
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          className="input"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />
        <input
          className="input"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <input
          className="input"
          placeholder="Company"
          value={form.company}
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
        />
      </div>

      <button
        onClick={submit}
        className="btn-primary mt-4"
      >
        Add Contact
      </button>
    </div>
  );
}
