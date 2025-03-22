// LoginForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  login: (email: string, password: string) => Promise<void>;
  setErrorMessage: (message: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
}

const LoginForm = ({
  login,
  setErrorMessage,
  setSuccessMessage,
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Gunakan navigate di sini

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await login(email, password);
      setSuccessMessage("Login berhasil!");
      setTimeout(() => navigate("/scan"), 500); // Redirect setelah 1.5 detik
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Login gagal. Silakan coba lagi.");
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="Masukkan email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-pink-700 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition duration-200"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
