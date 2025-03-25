import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import AlertMessage from "../components/common/AlertMessage";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!authContext) {
    return (
      <p className="text-center text-red-500">
        Error: AuthContext is not available
      </p>
    );
  }

  const { login } = authContext;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4)), url('/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Logo & Title */}
      <div className="mb-4 flex flex-col items-center">
        <span className="text-pink-700 text-lg font-semibold">
          QR SCANNER By:
        </span>
        <img
          src="/agendakota2.png"
          alt="Agendakota Logo"
          className="w-32 mt-2"
        />
      </div>

      {/* Card Login */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md relative">
        <h2 className="text-2xl font-bold text-pink-700 text-center mb-6">
          Login
        </h2>

        {/* Pastikan alert muncul */}
        {successMessage && (
          <AlertMessage type="success" message={successMessage} />
        )}
        {errorMessage && <AlertMessage type="error" message={errorMessage} />}

        {/* Form */}
        <LoginForm
          login={login}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
        />

        {/* Register Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <a
              href="https://agendakota.id/register-user"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 font-semibold hover:underline"
            >
              Daftar di sini
            </a>
          </p>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-white text-xs mt-6">
        &copy; 2025 Agendakota.id. All Rights Reserved.
      </p>
    </div>
  );
};

export default LoginPage;
