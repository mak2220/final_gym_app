// pages/api/recuperar.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método no permitido' });

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Correo es requerido' });

  const client = new MongoClient(process.env.MONGODB_URI as string);

  try {
    await client.connect();
    const db = client.db('app_gym');
    const collection = db.collection('usuarios');

    const user = await collection.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Generar token y expiración (1 hora)
    const token = Math.random().toString(36).substring(2);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

    // Guardar token en la base de datos
    await collection.updateOne(
      { email },
      {
        $set: {
          resetToken: token,
          resetTokenExpires: expiresAt,
        },
      }
    );

    // Determinar base URL según entorno
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://tusitio.com';

    // Construir el enlace de restablecimiento
    const link = `${baseUrl}/restablecer?token=${token}`;

    // Enviar el correo usando Resend (modo desarrollo con dominio @resend.dev)
    const emailResponse = await resend.emails.send({
      from: 'gym_app@outlook.com',
      to: email,
      subject: 'Recuperación de contraseña',
      html: `
        <p>Hola,</p>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a>
        <p>Este enlace expirará en 1 hora.</p>
      `,
    });

    if (emailResponse.error) {
      console.error('Error enviando el correo con Resend:', emailResponse.error);
      return res.status(500).json({ message: 'No se pudo enviar el correo' });
    }

    res.status(200).json({ message: 'Correo de recuperación enviado correctamente' });
  } catch (error) {
    console.error('Error general:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  } finally {
    await client.close();
  }
}
