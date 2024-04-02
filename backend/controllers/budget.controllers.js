const monthlyBudgets = require('../models/monthlyBudgets');

// Get all budgets
exports.getAllBudgets = (req, res) => {
    res.json(monthlyBudgets);
};


// Get budget by ID
exports.getBudgetById = (req, res) => {
    const budgetId = req.params.id;
    // Iterate over the monthlyBudgets object to find the budget with the specified budget_id
    for (const yearMonth in monthlyBudgets) {
        const budgets = monthlyBudgets[yearMonth].budgets;
        const budget = budgets.find(b => b.budget_id === budgetId);
        if (budget) {
            return res.json(budget);
        }
    }
    // If the budget with the specified budget_id is not found, return 404
    res.status(404).json({ message: 'Budget not found' });
};


// Get budgets by month and year
exports.getBudgetsByMonthAndYear = (req, res) => {
    const { month, year } = req.query;
    const key = `${year}-${month}`;
    if (monthlyBudgets[key]) {
        res.json(monthlyBudgets[key]);
    } else {
        res.status(404).json({ message: 'Budget not found for the specified month and year' });
    }
};

// Get budgets by category
exports.getBudgetsByCategory = (req, res) => {
    const { category } = req.query;
    const filteredBudgets = {};
    Object.keys(monthlyBudgets).forEach(key => {
        if (monthlyBudgets[key][category]) {
            filteredBudgets[key] = monthlyBudgets[key];
        }
    });
    if (Object.keys(filteredBudgets).length > 0) {
        res.json(filteredBudgets);
    } else {
        res.status(404).json({ message: 'Budget not found for the specified category' });
    }
};

// Get budgets by month, year, and category
exports.getBudgetsByMonthYearAndCategory = (req, res) => {
    const { month, year, category } = req.query;
    const key = `${year}-${month}`;
    if (monthlyBudgets[key] && monthlyBudgets[key][category]) {
        res.json(monthlyBudgets[key][category]);
    } else {
        res.status(404).json({ message: 'Budget not found for the specified month, year, and category' });
    }
};


// Update budget
exports.updateBudget = (req, res) => {
    const { id } = req.params;
    const updatedBudgetData = req.body;
    if (monthlyBudgets[id]) {
        monthlyBudgets[id] = updatedBudgetData;
        res.json({ message: 'Budget updated successfully', budget: monthlyBudgets[id] });
    } else {
        res.status(404).json({ message: 'Budget not found' });
    }
};

// Delete expense
exports.deleteExpense = (req, res) => {
    const { budget_id, expense_id } = req.params;
    if (monthlyBudgets[budget_id]) {
        const budget = monthlyBudgets[budget_id];
        Object.keys(budget).forEach(category => {
            if (category !== 'maxSpending') {
                const index = budget[category].expenses.findIndex(expense => expense.id === expense_id);
                if (index !== -1) {
                    budget[category].expenses.splice(index, 1);
                    if (budget[category].expenses.length === 0) {
                        // If the category has no more expenses, delete the entire budget
                        delete monthlyBudgets[budget_id];
                    }
                    res.json({ message: 'Expense deleted successfully' });
                    return;
                }
            }
        });
        res.status(404).json({ message: 'Expense not found in the specified budget' });
    } else {
        res.status(404).json({ message: 'Budget not found' });
    }
};
