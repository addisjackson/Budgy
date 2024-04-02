import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RiPencilLine } from 'react-icons/ri'; // Import the pencil icon
import { BsArrowReturnLeft } from 'react-icons/bs'; // Import the return arrow icon
import './expensedetail.css';

function ExpenseDetail() {
  const { expense_id } = useParams(); // Get the expense ID from the URL params
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    // Fetch expense details based on the ID from the server
    fetch(`http://localhost:7070/expenses/${expense_id}`)
      .then(response => response.json())
      .then(data => setExpense(data))
      .catch(error => console.error('Error fetching expense:', error));
  }, [expense_id]);

  if (!expense) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  return (
    <div className="expense-detail">
      <h2 className='expense-header'>Expense Detail</h2>
      <p className='expense-description'>Description: {expense.description}</p>
      <p className='expense-amount'>Amount: {expense.amount}</p>
      <p className='expense-date'>Date: {expense.date}</p>
      <p className='expense-category'>Category: {expense.category}</p>
      <div className='expense-detail'>
        <Link to={`/expenses/${expense_id}/edit`}>
          <button className="edit-button">
            <RiPencilLine /> Edit
          </button>
        </Link>
        <Link to="/budgets">
          <button className="return-button">
            <BsArrowReturnLeft /> Return to Budgets
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ExpenseDetail;
