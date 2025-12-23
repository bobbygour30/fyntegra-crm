import { useState } from "react";
import Login from "./components/auth/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [auth, setAuth] = useState(
    localStorage.getItem("auth") === "true"
  );

  return auth ? (
    <Dashboard />
  ) : (
    <Login setAuth={setAuth} />
  );
}
