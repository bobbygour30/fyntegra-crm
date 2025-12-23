import { BANKS } from "../../utils/banks";

export default function BankTemplateSelector({ onSelect }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Select Bank & Template
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {BANKS.map((bank) => (
          <div
            key={bank.id}
            onClick={() => onSelect(bank)}
            className="bg-white border rounded-xl p-4 cursor-pointer hover:border-red-500 hover:shadow transition"
          >
            <h3 className="font-semibold text-black">
              {bank.name}
            </h3>
            <p className="text-xs text-gray-500 mt-2 whitespace-pre-wrap">
              {bank.template.slice(0, 90)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
