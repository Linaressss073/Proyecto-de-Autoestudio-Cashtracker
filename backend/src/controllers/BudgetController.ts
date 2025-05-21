import type { Request, Response } from "express";
import Budget from "../models/Budget";
import Expense from "../models/Expense";

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {
        try {
            const budgets = await Budget.findAll({
                order: [
                    ['amount', 'DESC']
                ],
                
                // Filtrar por el usuario autenticado
                where:{
                    userId: req.user.id
                }
            })

            res.json(budgets)
        } catch (error) {
            res.status(500).json({ message: "Hubo un error" })
        }
    }

    static create = async (req: Request, res: Response) => {
        try {
            const budget = new Budget(req.body)
            budget.userId = req.user.id
            await budget.save()
            res.status(201).json("Presupuesto creado correctamente")
        } catch (error) {
            // console.log(req.body)
            res.status(500).json({ message: "Hubo un error" })
        }
    }

    static getBudgetById = async (req: Request, res: Response) => {
        const budget = await Budget.findByPk(req.budget.id, {
            include: [Expense]
        })

        res.json({ 
            budget: req.budget,
            user: req.user
        })

        res.json(budget)
    }

    static updateEditById = async (req: Request, res: Response) => {
        //Escribir cambios del body
        await req.budget.update(req.body)
        res.json('Presupuesto actualizado correctamente')
    }

    static deleteBudgetById = async (req: Request, res: Response) => {
        //Eliminar cambios del body
        await req.budget.destroy()
        res.json('Presupuesto eliminado correctamente')
    }
}
