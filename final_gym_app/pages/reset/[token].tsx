// pages/reset/[token].tsx
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/reset', { token, password });
      setMensaje(res.data.message);
    } catch (error: any) {
      setMensaje(error.response?.data?.message || 'Error al cambiar la contraseña');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">Restablecer contraseña</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button className="w-full bg-green-600 text-white p-2 rounded" type="submit">
          Restablecer
        </button>
      </form>
      {mensaje && <p className="mt-4 text-center text-sm text-gray-700">{mensaje}</p>}
    </div>
  );
}
