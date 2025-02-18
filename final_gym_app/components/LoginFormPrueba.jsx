"use client"

import Link from 'next/link';

export default function Login() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-xl">
          <h2 className="text-2xl font-bold text-center text-gray-700">Iniciar Sesión</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Correo Electrónico</label>
              <input 
                type="text" 
                className="text-black w-ful px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="tuemail@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Contraseña</label>
              <input 
                type="password" 
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                placeholder="********"
              />
            </div>
            <button 
              type="submit" 
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
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
  