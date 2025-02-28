"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import axios from "axios";

interface AuthContextType {
  user: any;
  login: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string, username: string) => {
    const response = await axios.post("/api/login", { email, password, username }, { withCredentials: true });
    setUser(response.data.user);
  };

  const logout = () => {
    setUser(null);
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Borra la cookie
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}