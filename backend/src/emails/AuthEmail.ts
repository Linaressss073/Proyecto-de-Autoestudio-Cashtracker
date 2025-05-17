// emails/AuthEmail.ts
import { sendTestEmail } from '../config/ethereal';

interface ConfirmationEmailData {
  name: string;
  email: string;
  token: string;
}

export class AuthEmail {
  static async sendConfirmationEmail({ name, email, token }: ConfirmationEmailData) {
    const subject = 'Confirma tu cuenta en Cashtracker';
    const text = `Hola ${name},\n\nPor favor confirma tu cuenta con este token: ${token}\n\nGracias por registrarte.`;

    await sendTestEmail(email, subject, text);
  }
}
