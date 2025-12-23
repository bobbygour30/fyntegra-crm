import { useState } from "react";
import Logo from "../ui/Logo";

export default function Login({ setAuth }) {
  const login = () => {
    localStorage.setItem("auth", "true");
    setAuth(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <Logo />

        <h2 className="mt-8 text-xl font-semibold text-black">
          CRM Login
        </h2>

        <input className="input mt-4" placeholder="Email" />
        <input className="input mt-3" type="password" placeholder="Password" />

        <button onClick={login} className="btn-primary mt-6 w-full">
          Login
        </button>
      </div>
    </div>
  );
}
