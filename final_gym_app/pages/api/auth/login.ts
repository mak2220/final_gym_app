import { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { email, password } = req.body;

  try {
    await client.connect(); // Asegurar conexión a la DB
    const db = client.db("tuBaseDeDatos"); // ⚠️ Reemplaza con el nombre de tu base de datos
    const user = await db.collection("users").findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
}
