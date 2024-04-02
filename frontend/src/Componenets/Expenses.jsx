import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes, FaPencilAlt } from 'react-icons/fa';
import './expenses.css';
import './nav.css';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortCriteria, setSortCriteria] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    fetch('http://localhost:7070/expenses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        return response.json();
      })
      .then(data => {
        setExpenses(data);
        setFilteredExpenses(data);
      })
      .catch(error => console.error('Error fetching expenses:', error.message));
  };

  const filterExpenses = () => {
    let filtered = expenses;
    if (selectedCategory) {
      filtered = filtered.filter(expense => expense.category === selectedCategory);
    }
    if (searchTerm) {
      const searchTermLowerCase = searchTerm.toLowerCase();
      filtered = filtered.filter(expense => expense.description.toLowerCase().includes(searchTermLowerCase));
    }
    return filtered;
  };

  const handleFilterByCategory = category => {
    setSelectedCategory(category);
    setFilteredExpenses(filterExpenses());
  };

  const handleSortExpenses = (sortBy) => {
    const newSortOrder = sortBy === sortCriteria ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortOrder(newSortOrder);
    setSortCriteria(sortBy);
    const sortedExpenses = [...filteredExpenses];
    sortedExpenses.sort((a, b) => {
      if (sortBy === 'amount') {
        return newSortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      } else if (sortBy === 'description') {
        return newSortOrder === 'asc' ? a.description.localeCompare(b.description) : b.description.localeCompare(a.description);
      }
      return 0;
    });
    setFilteredExpenses(sortedExpenses);
  };
  
  

  const handleSearch = () => {
    setFilteredExpenses(filterExpenses());
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
          setExpenses(prevExpenses => prevExpenses.filter(expense => expense.expense_id !== expense_id));
          setFilteredExpenses(prevExpenses => prevExpenses.filter(expense => expense.expense_id !== expense_id));
        } else {
          console.error('Failed to delete expense:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error deleting expense:', error);
      });
  };

  return (
    <div>
      <div className='sort'>
        <select value={selectedCategory} onChange={e => handleFilterByCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Apparel">Apparel</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Childcare & Education">Childcare & Education</option>
          <option value="Food">Food</option>
          <option value="Housing">Housing</option>
          <option value="Travel">Travel</option>
        </select>
        <button onClick={() => handleSortExpenses('amount')}>Sort by Amount</button>
        <button onClick={() => handleSortExpenses('description')}>Sort by Description</button>
        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="expense-list">
        {filteredExpenses.map(expense => (
          <div key={expense.expense_id} className="expense">
          <div className="description">
            <Link to={`/expenses/${expense.expense_id}`}><p>{expense.description}</p></Link>
            </div>  
            <div className="details">
              <p>Amount: {expense.amount}</p>
              <p>Date: {expense.date}</p>
            </div>
            <div className="actions">
              <button onClick={() => handleDeleteExpense(expense.expense_id)}>
                <FaTimes className="delete-icon" />
              </button>
              <button onClick={() => handleEditExpense(expense.expense_id)}>
                <FaPencilAlt className="edit-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Expenses;
