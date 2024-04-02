// AddExpenseForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddExpenseForm({ expenses, onCancel }) {
  const [expense, setExpense] = useState({
    description: '',
    amount: '',
    date: '',
    category: ''
  });

  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:7070/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...expense,
          expense_id: expenses.length + 1
        })
      });
      if (response.ok) {
        alert('Expense was added successfully!');
        navigate('/budgets');
      } else {
        throw new Error('Failed to add expense');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense(prevExpense => ({
      ...prevExpense,
      [name]: value
    }));
  };

  const handleCancel = () => {
    navigate('/budgets');
  };

  return (
    <form>
      <input type="text" name="description" placeholder="Description" value={expense.description} onChange={handleChange} />
      <input type="number" name="amount" placeholder="Amount" value={expense.amount} onChange={handleChange} />
      <input type="date" name="date" value={expense.date} onChange={handleChange} />
      <select name="category" value={expense.category} onChange={handleChange}>
        <option value="" disabled>Select a category</option>
        <option value="Apparel">Apparel</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Childcare & Education">Childcare & Education</option>
        <option value="Food">Food</option>
        <option value="Housing">Housing</option>
        <option value="Travel">Travel</option>
      </select>
      <button type="button" onClick={handleSave}>Save</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
}

export default AddExpenseForm;
