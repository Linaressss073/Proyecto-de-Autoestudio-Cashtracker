import type { Request, Response, NextFunction } from "express";
import { param, body, validationResult } from "express-validator";
import Budget from "../models/Budget";
import { error } from "console";

declare global {
  namespace Express {
    interface Request {
      budget?: Budget;
    }
  }
}

export const validateBudgetId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  //Validaciones para id 
  await param('budgetId')
    .isInt().withMessage('El id debe ser un número entero').
    custom(value => value > 0)
    .withMessage('El id debe ser mayor a 0')
    .run(req)


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();

}

export const validateBudgetExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const { budgetId } = req.params
    const budget = await Budget.findByPk(budgetId)

    if (!budget) {
      const error = new Error('Presupuesto no encontrado')
      res.status(404).json({ error: error.message })
    }

    req.budget = budget

    next()
  } catch (error) {
    res.status(500).json({ message: "Hubo un error" })
  }

}

export const validateBudgetInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  //Validaciones para el body 
  await body('name')
    .notEmpty().withMessage('El nombre es obligatorio').run(req)

  await body('amount')
    .notEmpty().withMessage('El valor del presupuesto es obligatorio')
    .isNumeric().withMessage('La cantidad debe ser un número')
    .custom(value => value > 0).withMessage('La cantidad debe ser mayor a 0').run(req)


  next();

}

export function hasAccess(req: Request , res: Response , next: NextFunction){
  if (req.budget.userId !== req.user.id) {
    return res.status(401).json({error: "Accion no valida"})
  }
  next()
}