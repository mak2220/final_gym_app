//reset-password.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '@/utils/sendEmail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { email, token } = req.body;

  if (!email || !token) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

  const htmlContent = `
    <h2>Recuperar contraseña</h2>
    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    <a href="${resetLink}" target="_blank">Restablecer contraseña</a>
    <p>Si no solicitaste este cambio, simplemente ignora este mensaje.</p>
  `;

  const response = await sendEmail({
    to: email,
    subject: 'Recuperar contraseña - Gym App',
    html: htmlContent,
  });

  if (response.success) {
    return res.status(200).json({ message: 'Correo de recuperación enviado' });
  } else {
    return res.status(500).json({ message: 'Error al enviar el correo', error: response.error });
  }
}
