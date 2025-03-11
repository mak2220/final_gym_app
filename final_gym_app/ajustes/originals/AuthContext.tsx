"use client"

import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import axios from "axios";

// Definimos el tipo del contexto para incluir el username
interface AuthContextType {
  user: { username: string } | null;
  login: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ username: string } | null>(null);

  // Modificamos el login para almacenar el username
  const login = async (email: string, password: string, username: string) => {
    try {
      const response = await axios.post("/api/login", { email, password, username }, { withCredentials: true });
      if (response.data.user) {
        // Asumimos que la API devuelve el objeto user con un campo 'username'
        setUser({ username: response.data.user.username });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  // Modificamos logout para borrar el estado del usuario
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


