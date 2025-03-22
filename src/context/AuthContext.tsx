import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser, loginUser, logoutUser } from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  organizerIds: number[];
}

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedInUser = getCurrentUser();
    if (loggedInUser) setUser(loggedInUser);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const userData = await loginUser(email, password);

      if (!userData || !userData.id) {
        return { success: false, message: "Email atau password salah." };
      }

      setUser(userData);
      return { success: true, message: "Login berhasil!" };
    } catch (error) {
      return {
        success: false,
        message: "Terjadi kesalahan saat login. Silakan coba lagi.",
      };
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
