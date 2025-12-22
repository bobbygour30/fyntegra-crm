import { useState } from "react";

const BANKS = [
  {
    name: "Bajaj Finserv",
    link:
      "https://oneapp.abfldirect.com/esb/login?dsa_hash=f4f648ab7ce0ac9913236711bd00f4a48612db3467429160d160a8b91857f5f6",
    template:
      "Hi {{name}}, your Rs. 7,00,000 loan record is now active.\n\nNext: Upload documents\n\nLoan ID:\n{{link}}\n\nWe’ll notify you once disbursement is complete.",
  },
  {
    name: "HDFC Bank",
    link: "https://hdfc.example/loan",
    template:
      "Hi {{name}}, your Rs. 5,00,000 loan record is now active.\n\nNext: Upload documents\n\nLoan ID:\n{{link}}\n\nWe’ll notify you once disbursement is complete.",
  },
  {
    name: "ICICI Bank",
    link: "https://icici.example/loan",
    template:
      "Hi {{name}}, your Rs. 10,00,000 loan record is now active.\n\nNext: Upload documents\n\nLoan ID:\n{{link}}\n\nWe’ll notify you once disbursement is complete.",
  },
  {
    name: "SBI Bank",
    link: "https://sbi.example/loan",
    template:
      "Hi {{name}}, your Rs. 5,00,000 loan record is now active.\n\nNext: Upload documents\n\nLoan ID:\n{{link}}\n\nWe’ll notify you once disbursement is complete.",
  },
  {
    name: "Yes Bank",
    link: "https://yesbank.example/loan",
    template:
      "Hi {{name}}, your Rs. 7,00,000 loan record is now active.\n\nNext: Upload documents\n\nLoan ID:\n{{link}}\n\nWe’ll notify you once disbursement is complete.",
  },
];

export default function StepBankSelect({ onNext }) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const [userIndex, setUserIndex] = useState(0);
  const [bankIndex, setBankIndex] = useState(0);

  const bank = BANKS[bankIndex];
  const message = bank.template
    .replace("{{name}}", users[userIndex]?.name)
    .replace("{{link}}", bank.link);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold mb-6">
        Select Bank & Template
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <select
          className="p-3 border rounded-lg"
          onChange={(e) => setUserIndex(e.target.value)}
        >
          {users.map((u, i) => (
            <option key={i} value={i}>
              {u.name} ({u.phone})
            </option>
          ))}
        </select>

        <select
          className="p-3 border rounded-lg"
          onChange={(e) => setBankIndex(e.target.value)}
        >
          {BANKS.map((b, i) => (
            <option key={i} value={i}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 bg-gray-50 border rounded-lg p-4 text-sm whitespace-pre-wrap">
        {message}
      </div>

      <button
        onClick={() => onNext(users[userIndex], message)}
        className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
      >
        Continue to Send
      </button>
    </div>
  );
}
