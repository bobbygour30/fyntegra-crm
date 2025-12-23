import Logo from "../ui/Logo";

export default function Header() {
  const logout = () => {
    localStorage.removeItem("auth");
    window.location.reload();
  };

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <Logo />

      <button
        onClick={logout}
        className="text-sm font-medium text-red-600 hover:underline"
      >
        Logout
      </button>
    </header>
  );
}
