// src/components/layout/Header.jsx
import { useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    
    // Trigger the custom event to force App to re-check auth
    window.dispatchEvent(new Event("logout"));
    
    // Navigate to root
    navigate("/", { replace: true });
  };

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <Logo />
      <button
        onClick={logout}
        className="text-red-600 text-sm font-medium hover:underline"
      >
        Logout
      </button>
    </header>
  );
}