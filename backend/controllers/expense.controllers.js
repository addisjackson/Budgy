const expenses = require('../models/expenses.model');

const getAllExpenses = (req, res) => {
    res.json(expenses);
};

const getExpenseById = (req, res) => {
    const expenseId = parseInt(req.params.id);
    const expense = expenses.find(expense => expense.expense_id === expenseId);
    if (expense) {
        res.json(expense);
    } else {
        res.status(404).json({ message: 'Expense not found' });
    }
};

const createExpense = (req, res) => {
    const newExpense = req.body;
    expenses.push(newExpense);
    res.status(201).json(newExpense);
};

const updateExpense = (req, res) => {
    const expenseId = parseInt(req.params.id);
    const updatedExpense = req.body;
    const index = expenses.findIndex(expense => expense.expense_id === expenseId);
    if (index !== -1) {
        expenses[index] = { ...expenses[index], ...updatedExpense };
        res.json({ message: 'Expense updated successfully', expense: expenses[index] });
    } else {
        res.status(404).json({ message: 'Expense not found' });
    }
};



const deleteExpense = (req, res) => {
    const expenseId = parseInt(req.params.id);
    const index = expenses.findIndex(expense => expense.expense_id === expenseId);
    if (index !== -1) {
        expenses.splice(index, 1);
        res.json({ message: 'Expense deleted successfully' });
    } else {
        res.status(404).json({ message: 'Expense not found' });
    }
};  


const getExpensesByMonthAndCategory = (req, res) => {
    const { month, category } = req.query;
    const filteredExpenses = expenses.filter(expense => expense.category === category && expense.date.startsWith(month));
    res.json(filteredExpenses);
};

module.exports = {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense,
    getExpensesByMonthAndCategory
};
