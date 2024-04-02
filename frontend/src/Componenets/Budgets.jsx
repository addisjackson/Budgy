import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line, RiPencilLine } from 'react-icons/ri';
import PieChart from './PieChart';
import AmountRemaining from './AmountRemaining';
import SearchExpense from './SearchExpense';
import './budgets.css';

function Budgets() {
  const [budgetsData, setBudgetsData] = useState([]);
  const [filteredBudgets, setFilteredBudgets] = useState(null);
  

  useEffect(() => {
    // Fetch budgets data from the server
    fetch('http://localhost:7070/budgets')
      .then(response => response.json())
      .then(data => {
        setBudgetsData(data);
        setFilteredBudgets(data); // Set initial filtered budgets
      })
      .catch(error => console.error('Error fetching budgets:', error));
  }, []);

  const handleDeleteExpense = (expenseId) => {
    // Send DELETE request to the server to delete the expense
    fetch(`http://localhost:7070/expenses/${expenseId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // If deletion is successful, update the budgets data and remove the deleted expense
          const updatedBudgetsData = { ...budgetsData };
          for (const key in updatedBudgetsData) {
            updatedBudgetsData[key].budgets = updatedBudgetsData[key].budgets.map(budget => ({
              ...budget,
              expenses: budget.expenses.filter(expense => expense.expense_id !== expenseId)
            }));
          }
          setBudgetsData(updatedBudgetsData);
        } else {
          console.error('Failed to delete expense:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error deleting expense:', error);
      });
  };

  
  
  
  return (
    <div className="budgets">
      <div className='search'>
        <SearchExpense  />
      </div>

      {filteredBudgets && Object.entries(filteredBudgets).map(([yearMonth, monthData]) => (
        <div key={yearMonth} className="month">
          <h2 className='month'>{monthData.month}/{monthData.year}</h2>
          {monthData.budgets.map(budget => (
            <div key={budget.budget_id} className='budget-detail'>
            <div className='category'>
                  <h3>Category: <Link to={`/budgets/${budget.budget_id}`}>{budget.category}</Link></h3>
                </div>
              <div className='budget-detail-heading'>
                <div className='max-spending'>
                  <h3>Max Spending: {budget.maxSpending}</h3>
                </div>
                <div className='amount-remaining'>
                  <AmountRemaining amountRemaining={budget.amount_remaining} maxSpending={budget.maxSpending} />
                </div>
                <div className='edit-budget'>
                  <Link to={`/budgets/${budget.budget_id}/edit`}>Edit Budget</Link>
                </div>
              </div>
              <div className='main-content'>
                <div className='expense-container'>
                  <div className='expense-heading'>
                    <h3>Expenses</h3>
                  </div>
                  <table>
                    <thead>
                      <tr className='expense-row-heading'>
                        <th className='delete'>Delete</th>
                        <th>Expense</th>
                        <th>Amount</th>
                        <th className='edit'>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {budget.expenses.map(expense => (
                        <tr key={expense.expense_id} className="expense-row">
                          <td><RiDeleteBin6Line onClick={() => handleDeleteExpense(expense.expense_id)} style={{ cursor: 'pointer', color: 'red' }} /></td>
                          <td><Link to={`/expenses/${expense.expense_id}`}>{expense.description}</Link></td>
                          <td>${expense.amount}</td>
                          <td>
                            <Link to={`/expenses/${expense.expense_id}/edit`}><RiPencilLine style={{ marginLeft: '0.5rem', cursor: 'pointer', color: 'yellow' }} /></Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="progress-bar-container">
                  {/* Progress bar showing amount remaining */}
                  <div className="progress" style={{ width: `${(budget.maxSpending - budget.amount_remaining) / budget.maxSpending * 100}%` }}></div>
                </div>
                <div className="pie-chart-container">
                  <div className='pie-chart-heading'>
                    <h3>Pie Chart</h3>
                  </div>
                  <div className='pie-chart'>
                    {/* Render PieChart component with expenses data */}
                    {budget.expenses.length > 0 && <PieChart key={budget.budget_id} data={budget.expenses} />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Budgets;
