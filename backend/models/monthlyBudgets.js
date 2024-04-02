const { v4: uuidv4 } = require('uuid');

const expenses = require('./expenses.model');

// Function to sort expenses by month, year, and category
const sortExpenses = (expenses) => {
    expenses.sort((a, b) => {
        // Extract month and year from date
        const [aYear, aMonth] = a.date.split('-');
        const [bYear, bMonth] = b.date.split('-');
        
        // Sort by year
        if (aYear < bYear) return -1;
        if (aYear > bYear) return 1;
        
        // If years are equal, sort by month
        if (aMonth < bMonth) return -1;
        if (aMonth > bMonth) return 1;
        
        // If months are equal, sort by category
        if (aMonth === bMonth) {
            if (a.category < b.category) return -1;
            if (a.category > b.category) return 1;
        }
        
        return 0;
    });
};

// Function to create budgets from sorted expenses
const createBudgets = (expenses) => {
    const budgets = {};
    expenses.forEach(expense => {
        const { date, category } = expense;
        const [year, month] = date.split('-');
        const key = `${year}-${month}`;
        
        if (!budgets[key]) {
            budgets[key] = {};
        }

        if (!budgets[key][category]) {
            budgets[key][category] = {
                maxSpending: 0,
                expenses: [],
                amount_remaining: 0
            };
        }

        budgets[key][category].expenses.push(expense);
    });
    return budgets;
};

sortExpenses(expenses);
const budgets = createBudgets(expenses);

// Function to calculate the maximum spending amount based on income and expense type
const calculateMaxExpenseAmount = (income) => {
    return {
        Apparel: income * 0.08,
        Entertainment: income * 0.12,
        "Childcare & Education": income * 0.30,
        Food: income * 0.15,
        Housing: income * 0.25,
        Travel: income * 0.10
    };
};

// Function to create budgets for each month
const createMonthlyBudgets = (budgets, income) => {
    const monthlyBudgets = {};
    Object.keys(budgets).forEach(key => {
        const [year, month] = key.split('-');
        const maxSpending = calculateMaxExpenseAmount(income);
        
        // Initialize monthly budget object
        const monthlyBudget = {
            year,
            month,
            budgets: []
        };

        // Iterate over each category in the budget
        Object.keys(budgets[key]).forEach(category => {
            const budget_id = uuidv4(); // Generate unique budget ID
            
            // Calculate total expenses for the category
            const totalExpenses = budgets[key][category].expenses.reduce((total, expense) => total + expense.amount, 0);
            
            // Calculate amount remaining for the category
            const amount_remaining = maxSpending[category] - totalExpenses;

            // Add category budget to the monthly budget
            monthlyBudget.budgets.push({
                category,
                maxSpending: maxSpending[category],
                expenses: budgets[key][category].expenses,
                amount_remaining,
                budget_id
            });
        });

        // Add monthly budget to the list of monthly budgets
        monthlyBudgets[key] = monthlyBudget;
    });
    return monthlyBudgets;
};

// Assuming income is 25000
const income = 25000;
const monthlyBudgets = createMonthlyBudgets(budgets, income);

console.log(monthlyBudgets);

module.exports = monthlyBudgets;
