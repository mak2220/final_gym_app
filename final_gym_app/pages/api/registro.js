import { connectToDatabase } from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const db = await connectToDatabase();

    const existingUser = await db.collection('usuarios').findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection('usuarios').insertOne({
      nombre,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    return res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
}
