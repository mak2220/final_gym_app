Sí, ese error está claro: Microsoft deshabilitó la autenticación básica (AUTH LOGIN) para cuentas Outlook/Hotmail a menos que estés usando OAuth2. Es decir:

Ya no podés usar user + contraseña (ni siquiera con contraseña de aplicación) para enviar correos con SMTP de Outlook, a menos que implementes OAuth2.

💡 Solución práctica: usar SendGrid o algún otro servicio SMTP externo.
Como Outlook bloquea la autenticación básica, la opción más simple y confiable para tu app es lo que veníamos haciendo:

🔁 Volvamos a la idea de SendGrid con Nodemailer
Acá te lo dejo todo armado y listo para copiar/pegar:

✅ Instalar:
bash
Copiar
Editar
npm install nodemailer nodemailer-sendgrid-transport
✅ lib/nodemailer.ts
ts
Copiar
Editar
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const sendRecoveryEmail = async (userEmail: string, recoveryLink: string) => {
  try {
    const transporter = nodemailer.createTransport(
      sgTransport({
        auth: {
          api_key: process.env.SENDGRID_API_KEY!,
        },
      })
    );

    const mailOptions = {
      from: "Tu Nombre <email-verificado@tudominio.com>",
      to: userEmail,
      subject: "Recuperación de Contraseña",
      html: `
        <p>Hola,</p>
        <p>Haz clic en el siguiente enlace para recuperar tu contraseña:</p>
        <a href="${recoveryLink}">${recoveryLink}</a>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Correo de recuperación enviado");
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
  }
};
✅ .env.local
env
Copiar
Editar
SENDGRID_API_KEY=SG.XXXXXXXXXXXXXXXXXXXXXXXXXXX
✅ Verificar el remitente en SendGrid
Antes de que funcione, verificá:

Entrá en https://app.sendgrid.com/settings/sender_auth

Hacé clic en "Create Single Sender"

Ingresá nombre y correo (ej: info@tudominio.com)

Confirmá el email (te llegará un correo)

Con eso ya estarías mandando correos sin problemas y sin líos con Outlook.

¿Querés que te ayude a verificar tu email en SendGrid ahora?








