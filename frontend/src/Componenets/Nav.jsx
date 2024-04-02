import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';



function Nav() {
  return (
    <nav>
      <ul className='nav-links'>
        <li>
          <Link to="/budgets">Show Budgets</Link>
        </li>
        <li>
          <Link to="/expenses">Show Expenses</Link>
        </li>
        <li>
          <Link to="/add-expense">Add Expense</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;