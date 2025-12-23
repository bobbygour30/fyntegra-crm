import Logo from "../ui/Logo";

export default function Header() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between">
      <Logo />
      <button
        onClick={logout}
        className="text-red-600 text-sm font-medium"
      >
        Logout
      </button>
    </header>
  );
}
