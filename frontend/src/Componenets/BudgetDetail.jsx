import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line, RiPencilLine } from 'react-icons/ri';
import { SlActionUndo } from 'react-icons/sl';
import PieChart from './PieChart'; // Assuming you have a PieChart component
import './budgetdetail.css';

function BudgetDetails() {
  const { budget_id } = useParams();
  const [budget, setBudget] = useState(null);
  const [budgetsData, setBudgetsData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch budgets data from the server
    fetch('http://localhost:7070/budgets')
      .then(response => response.json())
      .then(data => {
        setBudgetsData(data);
      })
      .catch(error => console.error('Error fetching budgets:', error));
  }, []);

  useEffect(() => {
    // Fetch details of the budget using budget_id
    fetch(`http://localhost:7070/budgets/${budget_id}`)
      .then(response => response.json())
      .then(data => setBudget(data))
      .catch(error => console.error('Error fetching budget details:', error));
  }, [budget_id]);

  const handleDeleteExpense = (expenseId) => {
    // Send DELETE request to the server to delete the expense
    fetch(`http://localhost:7070/expenses/${expenseId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // If deletion is successful, remove the deleted expense from the budget
          const updatedBudget = { ...budget };
          updatedBudget.expenses = updatedBudget.expenses.filter(expense => expense.expense_id !== expenseId);
          setBudget(updatedBudget);
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


   return (
    <div className="budget-details-container">
    <div className="budget-detail-header">
      <p>Month/Year: {budgetsData.month}/{budgetsData.year}</p>
      <p>Category: {budget.category}</p>
      <p>Max Spending: {budget.maxSpending}</p>
      <p>Amount Remaining: {budget.amount_remaining}</p>
    </div>
    <div className="main-content">
        <div className='expenses-container'>
        <h3 className='expense-header'>Expenses</h3>
        <table>
          <thead>
            <tr>
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
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td>
                  <RiPencilLine style={{ marginLeft: '0.5rem', cursor: 'pointer', color: 'yellow' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='pie-chart-container'>
        <h3 className='pie-chart-header'>Pie Chart</h3>
        {/* Render PieChart component with expenses data */}
        <PieChart data={budget.expenses} />
      </div>
      </div>
      <div>
      <SlActionUndo onClick={() => navigate('/budgets')} style={{ cursor: 'pointer', color: 'red' }} />
    </div>
    </div>
  );
}

export default BudgetDetails;
