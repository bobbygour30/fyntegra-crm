import { useState } from "react";
import api from "../../api/api";

export default function AddUserForm({ onAdded }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
  });

  const submit = async () => {
    await api.post("/contacts", form);
    setForm({ name: "", phone: "", email: "", company: "" });
    onAdded();
  };

  return (
    <div className="bg-gray-50 p-4 rounded mb-4">
      <div className="grid md:grid-cols-4 gap-3">
        {Object.keys(form).map((k) => (
          <input
            key={k}
            className="input"
            placeholder={k}
            value={form[k]}
            onChange={(e) =>
              setForm({ ...form, [k]: e.target.value })
            }
          />
        ))}
      </div>

      <button
        onClick={submit}
        className="btn-primary mt-3"
      >
        Add Contact
      </button>
    </div>
  );
}
