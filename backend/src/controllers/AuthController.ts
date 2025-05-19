// controllers/AuthController.ts
import type { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
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

  static confirmAccount = async (req: Request, res: Response) => {
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

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (!userExists) {
      res.status(409).json({ error: 'No existe o Usuario no encontrado' });
      return;
    }

    if (!userExists.confirmed) {
      res.status(403).json({ error: 'La cuenta no ha sido confirmada' });
      return;
    }

    const isPasswordCorrect = await checkPassword(password, userExists.password);

    if (!isPasswordCorrect) {
      res.status(401).json({ error: 'Password incorrecto' });
      return;
    }

    const token = generateJWT(userExists.id);
    res.json(token);
  };

  static forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (!userExists) {
      res.status(409).json({ error: 'No existe o Usuario no encontrado' });
      return;
    }

    userExists.token = generateToken();
    await userExists.save();

    await AuthEmail.sendPasswordResetToken({
      name: userExists.name,
      email: userExists.email,
      token: userExists.token
    });

    res.json('Revisa tu email');
  };

  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body;

    const tokenExists = await User.findOne({ where: { token } });
    if (!tokenExists) {
      res.status(404).json({ error: 'Token no valido' });
      return;
    }
    res.json('Token valido...');
  };

  static resetPasswordWithToken = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ where: { token } });
    if (!user) {
      res.status(404).json({ error: 'Token no valido' });
      return;
    }

    user.password = await hashPassword(password);
    user.token = null;
    await user.save();

    res.json('El password se modifico correctamente');
  };

  static user = async (req: Request, res: Response) => {
    res.json(req.user);
  };

  static updateCurrentUserPassword = async (req: Request, res: Response) => {
    const { current_password, password } = req.body;
    const { id } = req.user;

    const user = await User.findByPk(id);

    const isPasswordCorrect = await checkPassword(current_password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ error: 'El password actual es incorrecto' });
      return;
    }

    user.password = await hashPassword(password);
    await user.save()

    res.json('El password se modifico correctamente');
  };
}
