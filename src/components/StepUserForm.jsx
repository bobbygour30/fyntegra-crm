import { useState } from "react";

export default function StepUserForm({ onNext }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });

  const saveUser = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    onNext();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-black mb-1">
        Add User Details
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        This information will be used for loan communication
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(form).map((field) => (
          <input
            key={field}
            placeholder={field.toUpperCase()}
            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
          />
        ))}
      </div>

      <button
        onClick={saveUser}
        className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
      >
        Save & Continue
      </button>
    </div>
  );
}
