import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditExpenseForm() {
  const { expense_id } = useParams(); // Get the expense ID from the URL params
  const [expense, setExpense] = useState(null);
  const [updatedExpense, setUpdatedExpense] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch expense details based on the ID from the server
    fetch(`http://localhost:7070/expenses/${expense_id}`)
      .then(response => response.json())
      .then(data => {
        setExpense(data);
        setUpdatedExpense(data); // Set initial state for updatedExpense with fetched data
      })
      .catch(error => console.error('Error fetching expense:', error));
  }, [expense_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedExpense(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Send updated expense data to the server using PUT method
    fetch(`http://localhost:7070/expenses/${expense_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedExpense),
    })
    .then(response => {
      if (response.ok) {
        alert('Expense updated successfully');
        navigate('/budgets'); // Redirect to budgets list after successful update
      } else {
        console.error('Failed to update expense:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error updating expense:', error);
    });
  };

  const handleCancel = () => {
    navigate('/budgets'); // Redirect to budgets list on cancel
  };

  if (!expense) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  return (
    <div className="edit-expense-form">
      <h2>Edit Expense</h2>
      <form onSubmit={handleSave}>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={updatedExpense.description || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Amount"
            value={updatedExpense.amount || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            placeholder="Date"
            value={updatedExpense.date || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={updatedExpense.category || ''}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select a category</option>
            <option value="Apparel">Apparel</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Childcare & Education">Childcare & Education</option>
            <option value="Food">Food</option>
            <option value="Housing">Housing</option>
            <option value="Travel">Travel</option>
          </select>
        </div>
        <button type="submit" className='save-edit'>Save</button>
        <button type="button" className='cancel-edit' onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EditExpenseForm;
