//pages/restablecer.tsx

"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Restablecer() {
    const router = useRouter();
    const { token } = router.query; 
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            setMensaje('Token inválido o faltante');
        }
    }, [token]);    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;
        if (password !== confirm) {
    return setMensaje('Las contraseñas no coinciden');
    }

    setLoading(true);
    try {
        const res = await fetch('/api/restablecer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
        if (res.ok) {
            setMensaje('Contraseña actualizada correctamente. Redirigiendo...');
            setTimeout(() => router.push('/login'), 3000);
    } else {
        setMensaje(data.message || 'Error al restablecer contraseña');
    }
    } catch (error) {
        setMensaje('Error en el servidor');
    } finally {
        setLoading(false);
    }
};

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
    >
        <h1 className="text-2xl font-bold mb-4">Restablecer contraseña</h1>

        {mensaje && <p className="mb-4 text-sm text-red-600">{mensaje}</p>}

        <label className="block mb-2 text-sm">Nueva contraseña</label>
        <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
        />

        <label className="block mb-2 text-sm">Confirmar contraseña</label>
        <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
        />

        <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
            {loading ? 'Procesando...' : 'Actualizar contraseña'}
        </button>
        </form>
    </div>
    );
}
