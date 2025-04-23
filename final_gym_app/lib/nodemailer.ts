// lib/nodemailer.ts
import nodemailer from 'nodemailer';

export const sendRecoveryEmail = async (userEmail: string, recoveryLink: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // debe ser false para STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3', // ayuda con compatibilidad sin desactivar seguridad
      },
    });

    const mailOptions = {
      from: `"Soporte" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Recuperación de Contraseña',
      html: `
        <p>Haz clic en el siguiente enlace para recuperar tu contraseña:</p>
        <a href="${recoveryLink}" target="_blank" style="color: #1a73e8;">Recuperar Contraseña</a>
        <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Correo de recuperación enviado a:', userEmail);
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error);
    throw error; // para que la API lo capture y devuelva 500 si falla
  }
};
