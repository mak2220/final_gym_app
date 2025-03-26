"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Observaciones from "@/components/Observaciones";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);


  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/user?email=${user.email}`);
        if (!res.ok) throw new Error("Error al obtener datos");
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, router]);

  if (!user) return null; // Evita mostrar contenido antes de redirigir
  if (loading) return <p className="text-center mt-10 text-lg">Cargando datos...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <navbar>
        <div className="bg-black w-full flex flex-col md:flex-row justify-between items-center h-auto md:h-24 px-4 text-white space-y-4 md:space-y-0">
          {/* Logo */}
          <h1 className="w-full text-3xl font-bold text-[#00df9a] text-center md:text-left">Gym App.</h1>
          <h2 className="text-2xl font-semibold text-white-800 text-center md:text-left">
            Bienvenid@, {userData?.nombre.charAt(0).toUpperCase() + userData?.nombre.slice(1)} 👋
          </h2>
          <p className="text-center md:text-left">Aquí tienes tu información personalizada.</p>
        </div>
      </navbar>
  
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        
        {/* Sección de Membresía */}
        <div className="mt-6 p-4 border rounded-lg bg-blue-50">
          <h3 className="text-lg font-semibold text-blue-700">Membresía</h3>
          <p className="text-gray-600">Estado: {userData?.membresia?.estado}</p>
          <p className="text-gray-600">Válida hasta: {userData?.membresia?.fechaExpiracion}</p>
        </div>

        {/* Sección de Horarios */}
        <div className="mt-6 p-4 border rounded-lg bg-green-50">
          <h3 className="text-lg font-semibold text-green-700">Horario</h3>
          <p className="text-gray-600">Días: {userData?.horario?.dias}</p>
          <p className="text-gray-600">Hora: {userData?.horario?.hora}</p>
        </div>

        {/* Sección de Progreso */}
        <div className="mt-6 p-4 border rounded-lg bg-yellow-50">
          <h3 className="text-lg font-semibold text-yellow-700">Progreso</h3>
          <p className="text-gray-600">Peso: {userData?.progreso?.peso} kg</p>
          <p className="text-gray-600">IMC: {userData?.progreso?.imc}</p>
        </div>

        {/* Sección de Rutina */}
        <div className="mt-6 p-4 border rounded-lg bg-red-50">
          <h3 className="text-lg font-semibold text-red-700">Rutina</h3>
          <ul className="text-gray-600">
            {userData?.rutina?.map((dia, index) => (
              <li key={index} className="mb-2 border-b border-gray-300">
                <button
                  className="w-full text-left py-2 px-4 bg-red-100 hover:bg-red-200 rounded-md transition flex justify-between items-center"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  {dia.dia}
                  <span>{openIndex === index ? "▲" : "▼"}</span>
                </button>
                {openIndex === index && (
                  <div className="p-2 bg-red-50 rounded-md mt-1">
                    {Object.entries(dia).map(([key, value]) => (
                      key !== "dia" && (
                        <p key={key} className="text-gray-700"><strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</p>
                      )
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
         {/* Sección de Observaciones */}
        <Observaciones userId={userData?.email} />
        
        <button 
          onClick={logout} 
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
