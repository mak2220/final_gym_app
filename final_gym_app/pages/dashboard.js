"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Home, Users, BarChart3, Calendar, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  { name: "Clientes", value: 120 },
  { name: "Clases activas", value: 8 },
  { name: "Ingresos (USD)", value: 5400 }
];

const data = [
  { name: "Enero", clientes: 100 },
  { name: "Febrero", clientes: 120 },
  { name: "Marzo", clientes: 140 }
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-6">
        <h2 className="text-xl font-bold text-center">Gym Dashboard</h2>
        <nav className="space-y-4">
          <Button variant="ghost" className="w-full flex items-center space-x-2">
            <Home size={20} /> <span>Inicio</span>
          </Button>
          <Button variant="ghost" className="w-full flex items-center space-x-2">
            <Users size={20} /> <span>Clientes</span>
          </Button>
          <Button variant="ghost" className="w-full flex items-center space-x-2">
            <BarChart3 size={20} /> <span>Estadísticas</span>
          </Button>
          <Button variant="ghost" className="w-full flex items-center space-x-2">
            <Calendar size={20} /> <span>Clases</span>
          </Button>
          <Button onClick={logout} variant="ghost" className="w-full flex items-center space-x-2 text-red-400">
            <LogOut size={20} /> <span>Salir</span>
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold">Bienvenido, {user.name}</h1>
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.name} className="p-4 bg-white shadow-md rounded-lg">
              <CardContent>
                <h3 className="text-lg font-semibold">{stat.name}</h3>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Crecimiento de Clientes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clientes" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

