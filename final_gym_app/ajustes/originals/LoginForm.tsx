"useclient"

import { useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const { login } = useAuth(); // Obtiene la función login del contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");  // Estado para el nuevo input
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, username); // Usa el contexto para el login
      router.push(`/dashboard1?username=${username}`); // Redirige al dashboard pasando el username en la URL
    } catch (error: any) {
      setError(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-700">Iniciar Sesión</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Correo Electrónico</label>
            <input
              type="email"
              name="email"  
              className="text-black w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="tuemail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              type="password"
              name="password"  
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
             />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Nombre de Usuario</label>
            <input
              type="text"
              name="username" 
               className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Iniciar Sesión
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          ¿No tienes una cuenta? <Link href="/registro" className="text-blue-500 hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
