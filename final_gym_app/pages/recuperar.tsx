// pages/recuperar.tsx

"use client"

import { useState } from 'react';
import axios from 'axios';

export default function Recuperar() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/recuperar', { email });
      setMensaje(res.data.message);
    } catch (error: any) {
      setMensaje(error.response?.data?.message || 'Error al enviar el correo');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">¿Olvidaste tu contraseña?</h1>
      <form onSubmit={handleSubmit} className="text-black">
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded" type="submit">
          Enviar correo de recuperación
        </button>
      </form>
      {mensaje && <p className="mt-4 text-center text-sm text-gray-700">{mensaje}</p>}
    </div>
  );
}
