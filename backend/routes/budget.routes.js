const express = require('express');
const router = express.Router();
const budgetControllers = require('../controllers/budget.controllers');

// Get all budgets
router.get('/', budgetControllers.getAllBudgets);

// Get budget by ID
router.get('/:id', budgetControllers.getBudgetById);

// Get budgets by month and year
router.get('/month-year', budgetControllers.getBudgetsByMonthAndYear);

// Get budgets by category
router.get('/category', budgetControllers.getBudgetsByCategory);

// Get budgets by month, year, and category
router.get('/month-year-category', budgetControllers.getBudgetsByMonthYearAndCategory);

// Update budget
router.put('/:id', budgetControllers.updateBudget);

// Delete expense
router.delete('/:budget_id/expenses/:expense_id', budgetControllers.deleteExpense);

module.exports = router;
