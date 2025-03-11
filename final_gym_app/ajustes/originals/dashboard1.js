"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      // Obtiene el username de la URL si está disponible
      const urlUsername = searchParams.get("username");
      if (urlUsername) {
        setUsername(urlUsername);
      } else {
        setUsername(user.name); // Usa el nombre del usuario autenticado si no viene en la URL
      }
    }
  }, [user, router, searchParams]);

  if (!user) return null; // Evita mostrar el contenido mientras redirige

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700">Bienvenido, {username}</h1>
      <button 
        onClick={logout} 
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
