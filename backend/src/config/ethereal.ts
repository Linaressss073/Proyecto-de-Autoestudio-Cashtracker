// ethereal.ts
import nodemailer from 'nodemailer';

let transporterPromise = (async () => {
  const testAccount = await nodemailer.createTestAccount();

  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true para puerto 465, false para otros
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
})();

export async function sendTestEmail(to: string, subject: string, text: string) {
  const transporter = await transporterPromise;

  const info = await transporter.sendMail({
    from: '"Cashtracker 👻" <no-reply@cashtracker.com>', // remitente
    to,
    subject,
    text,
  });

  console.log('Mensaje enviado: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
