import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser, loginUser, logoutUser } from "../services/api";

// ✅ Definisikan tipe User agar tidak error
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  organizerIds: number[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
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

  const login = async (email: string, password: string) => {
    try {
      const userData = await loginUser(email, password);
      if (userData) setUser(userData);
    } catch (error) {
      throw error;
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
