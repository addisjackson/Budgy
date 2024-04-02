import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line, RiPencilLine } from 'react-icons/ri'; // Import icons for delete and edit
import { Link } from 'react-router-dom';

function EditBudgetForm() {
  const { budget_id } = useParams();
  const [budget, setBudget] = useState(null);
  const [formData, setFormData] = useState({}); // State to manage form data
  const navigate = useNavigate();
  const income = 25000;

  useEffect(() => {
    // Fetch budget details based on the ID from the server
    fetch(`http://localhost:7070/budgets/${budget_id}`)
      .then(response => response.json())
      .then(data => {
        setBudget(data);
        setFormData({ // Initialize form data with fetched budget details
          category: data.category,
          maxSpending: data.maxSpending,
          expenses: data.expenses,
        });
      })
      .catch(error => console.error('Error fetching budget:', error));
  }, [budget_id]);

  const calculateMaxSpending = (category) => {
    const income = 25000;
    let result;

    if (category === "Apparel") {
      result = income * 0.08;
    } else if (category === "Entertainment") {
        result = income * 0.12 ;
    } else if (category === "Childcare & Education") {
        result = income * 0.30;
    } else if (category === "Food") {
        result = income * 0.15 ;
    } else if (category === "Housing") {
        result = income * 0.25 ;
    } else if (category === "Travel") {
        result = income * 0.10 ;
    }

    const maxSpending = result;
    return maxSpending;
};

  

const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Update the form data state
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  
    // Recalculate max spending and amount remaining when category changes
    if (name === "category") {
      const newMaxSpending = calculateMaxSpending(value);
      const newAmountRemaining = calculateAmountRemaining(newMaxSpending, formData.expenses);
  
      // Update max spending and amount remaining in the form data state
      setFormData(prevData => ({
        ...prevData,
        maxSpending: newMaxSpending,
        amount_remaining: newAmountRemaining
      }));
    }
  };
  
  const handleSave = (e) => {
    e.preventDefault(); // Prevent default form submission
    const income = 25000;
    const requestBody = {
      category: formData.category,
      maxSpending: calculateMaxSpending(income, formData.category),
      expenses: formData.expenses,
      amount_remaining: calculateAmountRemaining(formData.maxSpending, formData.expenses),
      budget_id: budget.budget_id,
      month: budget.month,
      year: budget.year
    };

    // Send PUT request to update the budget details
    fetch(`http://localhost:7070/budgets/${budget_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (response.ok) {
          // If update is successful, navigate back to the budget details page
          navigate(`/budgets/${budget_id}`);
        } else {
          console.error('Failed to update budget:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error updating budget:', error);
      });
  };

  const handleCancel = () => {
    // Navigate back to the budget details page
    navigate(`/budgets/${budget_id}`);
  };

  const handleEditExpense = expense_id => {
    navigate(`/expenses/${expense_id}`);
  };

  const handleDeleteExpense = expense_id => {
    fetch(`http://localhost:7070/expenses/${expense_id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setBudget(prevBudget => ({
            ...prevBudget,
            expenses: prevBudget.expenses.filter(expense => expense.expense_id !== expense_id)
          }));
        } else {
          console.error('Failed to delete expense:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error deleting expense:', error);
      });
  };

  if (!budget) {
    return <div>Loading...</div>;
  }

  const calculateAmountRemaining = (maxSpending, expenses) => {
    const totalExpenseAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    return maxSpending - totalExpenseAmount;
  };

  return (
    <div className="edit-budget-form">
      <h2 className='edit-budget-heading'>Edit Budget</h2>
      <form onSubmit={handleSave}>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Apparel">Apparel</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Childcare & Education">Childcare & Education</option>
          <option value="Food">Food</option>
          <option value="Housing">Housing</option>
          <option value="Travel">Travel</option>
        </select>
        <label htmlFor="maxSpending">Max Spending:</label>
        <input
          type="number"
          id="maxSpending"
          name="maxSpending"
          value={calculateMaxSpending(formData.category)}
          onChange={handleChange}
        />
         <label htmlFor="amount-remaining">Amount Remaining:</label>
        <input
          type="number"
          id="amountRemaining"
          name="amountRemaining"
          value={calculateAmountRemaining(formData.maxSpending, formData.expenses)}
          onChange={handleChange}
          />
      </form>
      <div className='expenses-container'>
        <div className='expense-heading'>
        <h3>Expenses</h3>
        </div>
        <table>
          <thead>
            <tr className='expense-row-heading'>
              <th>Delete</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {budget.expenses.map(expense => (
              <tr key={expense.expense_id} className='expense-row'>
                <td><RiDeleteBin6Line onClick={() => handleDeleteExpense(expense.expense_id)} style={{ cursor: 'pointer', color: 'red' }} /></td>
                <td>
            <Link to={`/expenses/${expense.expense_id}`}>{expense.description}</Link>
             </td>
                <td>{expense.amount}</td>
                <td>
                  <RiPencilLine onClick={() => handleEditExpense(expense.expense_id)} style={{ cursor: 'pointer', color: 'blue', marginLeft: '0.5rem' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="submit" className='expense-save'>Save</button>
      <button type="button" className='expense-cancel' onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default EditBudgetForm;
