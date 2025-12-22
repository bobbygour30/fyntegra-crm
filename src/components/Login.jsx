import { useState } from "react";
import Logo from "./Logo";

export default function Login({ setLoggedIn }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("loggedIn", "true");
      setLoggedIn(true);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <Logo />

        <h2 className="mt-8 text-2xl font-semibold text-black">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Login to manage loan notifications
        </p>

        <div className="mt-6 space-y-4">
          <input
            placeholder="Email address"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          onClick={handleLogin}
          className="mt-6 w-full py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
