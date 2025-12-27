import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // We'll use react-router-dom
import Logo from "../ui/Logo";

const navItems = [
  { name: "Contacts", path: "/dashboard/contacts" },
  { name: "Banks", path: "/dashboard/banks" },
  { name: "Templates", path: "/dashboard/templates" },
  { name: "Campaigns", path: "/dashboard/campaigns" },
  { name: "Reports", path: "/dashboard/reports" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } flex`}
      >
        <div className="p-6">
          <Logo />
        </div>

        <nav className="px-6 space-y-4 text-sm flex-1">
          <p className="text-gray-400 uppercase text-xs">CRM</p>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block py-2 px-3 rounded-lg transition ${
                    currentPath === item.path
                      ? "bg-red-50 text-red-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}