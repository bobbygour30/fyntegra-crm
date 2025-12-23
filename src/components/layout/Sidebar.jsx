import Logo from "../ui/Logo";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-white border-r flex-col">
      <div className="p-6">
        <img
        src="https://fyntegra.com/assets/logo-B6xZ6gZ0.png"
        alt="LoanNotify Logo"
        className="w-22 object-contain"
      />
      </div>

      <nav className="px-6 space-y-4 text-sm">
        <p className="text-gray-400 uppercase text-xs">
          CRM
        </p>

        <ul className="space-y-3">
          <li className="text-red-600 font-medium">
            Contacts
          </li>
          <li className="text-gray-600">Banks</li>
          <li className="text-gray-600">Templates</li>
          <li className="text-gray-600">Campaigns</li>
          <li className="text-gray-600">Reports</li>
        </ul>
      </nav>
    </aside>
  );
}
