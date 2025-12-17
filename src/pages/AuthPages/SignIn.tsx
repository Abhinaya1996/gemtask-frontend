import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function SignIn() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // hardcoded credentials
    if (email === "test@gmail.com" && password === "pass@123") {
      setError("");
      login();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          TeleHealth Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-brand-500 text-white p-2 rounded hover:bg-brand-600"
        >
          Login
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Demo Credentials: <br />
          <b>Email:</b> test@gmail.com <br />
          <b>Password:</b> pass@123
        </p>
      </div>
    </div>
  );
}
