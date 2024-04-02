const express = require('express');
const router = express.Router();
const expenseControllers = require('../controllers/expense.controllers');

// Constants for expense types and their maximum spending percentages
const expenseTypes = {
    Apparel: 0.08,
    Entertainment: 0.12,
    "Childcare & Education": 0.30,
    Food: 0.15,
    Housing: 0.25,
    Travel: 0.10
};

// Function to calculate the maximum spending amount based on income and expense type
function calculateMaxExpenseAmount(income, expenseType) {
    return income * expenseTypes[expenseType];
}

// Define API endpoints for expenses
router.get('/', expenseControllers.getAllExpenses);
router.get('/:id', expenseControllers.getExpenseById);
router.post('/', expenseControllers.createExpense);
router.put('/:id', expenseControllers.updateExpense);
router.delete('/:id', expenseControllers.deleteExpense);
router.get('/', expenseControllers.getExpensesByMonthAndCategory);

module.exports = router;

