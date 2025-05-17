// controllers/AuthController.ts
import type { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";

export class AuthController {
  static createAccount = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      res.status(409).json({ error: 'Un usuario con ese email ya está registrado' });
      return;
    }

    try {
      const user = new User(req.body);
      user.password = await hashPassword(req.body.password);
      user.token = generateToken();
      await user.save();

      await AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token
      });

      res.json('Cuenta creada correctamente');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error' });
    }
  };

  static confirmAccount = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.body;

    const user = await User.findOne({ where: { token } });

    if (!user) {
      res.status(401).json({ error: 'Token no válido o ya confirmado' });
      return;
    }

    user.confirmed = true;
    user.token = null;
    await user.save();

    res.json('Cuenta confirmada correctamente');
  };
}
