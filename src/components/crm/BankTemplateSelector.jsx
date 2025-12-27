import { useEffect, useState } from "react";
import api from "../../api/api";

export default function BankTemplateSelector({ onSelect }) {
  const [banks, setBanks] = useState([]);

 // In BankTemplateSelector.jsx – replace hardcoded fetch with api
useEffect(() => {
  api.get("/banks").then((res) => setBanks(res.data));
}, []);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {banks.map((b) => (
        <div
          key={b._id}
          onClick={() => onSelect(b)}
          className="bg-white p-4 border rounded-xl cursor-pointer hover:border-red-500"
        >
          <h3 className="font-semibold">{b.name}</h3>
          <p className="text-xs text-gray-500 mt-2">
            {b.template.slice(0, 80)}...
          </p>
        </div>
      ))}
    </div>
  );
}
