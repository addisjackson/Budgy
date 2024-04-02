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


// Add Expense
async function addExpense(description, amount, category, date) {
    try {
        // Check if a budget exists for the given category
        const budget = await getBudgetByCategory(category);
        if (!budget) {
            // Create a new budget if it doesn't exist
            await createBudget(category, calculateMaxAmount(category));
        }

        // Insert the expense into the expenses table
        await insertExpense(description, amount, category, date);

        // Update the amount_spent field of the budget
        await updateBudgetAmountSpent(category, amount);
        
        return { success: true, message: "Expense added successfully." };
    } catch (error) {
        console.error('Error adding expense:', error);
        return { success: false, message: "An error occurred while adding the expense." };
    }
}

// Update Expense
async function updateExpense(id, description, amount, category, date) {
    try {
        // Retrieve the old expense to get the category
        const oldExpense = await getExpenseById(id);
        const oldCategory = oldExpense.category;

        // Update the expense in the expenses table
        await updateExpenseById(id, description, amount, category, date);

        // Update the amount_spent fields of the budgets
        await updateBudgetAmountSpent(oldCategory, -oldExpense.amount); // Subtract old amount
        await updateBudgetAmountSpent(category, amount); // Add new amount

        return { success: true, message: "Expense updated successfully." };
    } catch (error) {
        console.error('Error updating expense:', error);
        return { success: false, message: "An error occurred while updating the expense." };
    }
}

// Delete Expense
async function deleteExpense(id) {
    try {
        // Retrieve the expense to get the category and amount
        const expense = await getExpenseById(id);

        // Delete the expense from the expenses table
        await deleteExpenseById(id);

        // Update the amount_spent field of the budget
        await updateBudgetAmountSpent(expense.category, -expense.amount); // Subtract amount

        return { success: true, message: "Expense deleted successfully." };
    } catch (error) {
        console.error('Error deleting expense:', error);
        return { success: false, message: "An error occurred while deleting the expense." };
    }
}
