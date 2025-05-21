import { Router } from 'express'

//Handlers
import { BudgetController } from '../controllers/BudgetController';
import { ExpensesController } from '../controllers/ExpenseController';

import { handleInputErrors } from '../middleware/validation';
import { hasAccess, validateBudgetExist, validateBudgetId, validateBudgetInput } from '../middleware/budget';
import { validateExpenseId, validateExpenseInput } from '../middleware/expense';
import { authenticate } from '../middleware/auth';

const router = Router()

router.use(authenticate)

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExist)
router.param('budgetId',hasAccess)

router.param('expenseId', validateExpenseId)
router.param('expenseId', validateBudgetExist)


router.get('/', BudgetController.getAll)

router.post('/',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.create);


router.get('/:budgetId',
    BudgetController.getBudgetById
)


router.put('/:budgetId',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.updateEditById
)


router.delete('/:budgetId',
    //Validaciones para id positivos y validos
    BudgetController.deleteBudgetById
)

/** Routes for expenses */
router.post('/:budgetId/expenses',
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.create
)

router.get('/:budgetId/expenses/:expenseId',
    ExpensesController.getById
)

router.put('/:budgetId/expenses/:expenseId',
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.updateById
)

router.delete('/:budgetId/expenses/:expenseId',
    ExpensesController.deleteById
)


export default router;