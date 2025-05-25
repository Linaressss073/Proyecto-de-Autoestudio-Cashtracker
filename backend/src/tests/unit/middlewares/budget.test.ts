import { createRequest , createResponse } from "node-mocks-http"
import { validateBudgetExist } from "../../../middleware/budget"
import Budget from "../../../models/Budget"
import { budgets } from "../../mocks/budgets";

jest.mock('../../../models/Budget', () => ({
    findByPk: jest.fn()
}));

describe('budget - validateBudgetExist' , () =>{
    it('should handle non-existent budget' , async () =>{
        (Budget.findByPk as jest.Mock).mockResolvedValue(null)

        const req = createRequest({
            params: {
                budgetId: 1
            }
        })
        const res = createResponse()
        const next = jest.fn()

        await validateBudgetExist(req,res,next)
        const data = res._getJSONData()
        expect(res.statusCode).toBe(404)
        expect(data).toEqual({error: 'Presupuesto no encontrado'})
        expect(next).not.toHaveBeenCalled()
    })

    //TODO COMPLETAR TEST SECTION 36 : 228 
    it('should proceed to next middleware if budget exist' , async() =>{
        (Budget.findByPk as jest.Mock).mockResolvedValue(budgets[0])

        const req = createRequest({
            params: {
                budgetId: 1
            }
        })
        const res = createResponse()
        const next = jest.fn()

    })
})