import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";

interface LoginFormProps {
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  setErrorMessage: (message: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
}

const LoginForm = ({
  login,
  setErrorMessage,
  setSuccessMessage,
}: LoginFormProps) => {
  const [email, setEmail] = useState(
    localStorage.getItem("rememberEmail") || ""
  );
  const [password, setPassword] = useState(
    localStorage.getItem("rememberPassword") || ""
  );
  const [rememberMe, setRememberMe] = useState<boolean>(
    localStorage.getItem("rememberMe") === "true"
  );
  const [isLoading, setIsLoading] = useState(false); // Tambahkan state untuk loader
  const navigate = useNavigate();

  useEffect(() => {
    if (!rememberMe) {
      localStorage.removeItem("rememberEmail");
      localStorage.removeItem("rememberPassword");
    }
  }, [rememberMe]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true); // Tampilkan Loader

    const result = await login(email, password);

    setIsLoading(false); // Sembunyikan Loader setelah login selesai

    if (!result.success) {
      setErrorMessage(result.message);
    } else {
      setSuccessMessage(result.message);
      setTimeout(() => navigate("/scan"), 1000);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {/* Loader akan muncul jika isLoading bernilai true */}
      {isLoading && <Loader />}

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
          required
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
          required
        />
      </div>

      {/* Checkbox Remember Me */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
          className="mr-2"
        />
        <label htmlFor="rememberMe" className="text-gray-700 text-sm">
          Remember Me
        </label>
      </div>

      {/* Tombol login akan nonaktif saat isLoading */}
      <button
        type="submit"
        className="w-full bg-pink-700 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
