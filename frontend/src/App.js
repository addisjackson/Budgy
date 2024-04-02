// App.js or App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Budgets from './Components/Budgets';
import Expenses from './Components/Expenses';
import AddExpenseForm from './Components/AddExpenseForm';
import EditExpenseForm from './Components/EditExpenseForm';
import Header from './Components/Header';
import ExpenseDetail from './Components/ExpenseDetail';
import BudgetDetail from './Components/BudgetDetail';
import Landing from './Components/Landing';
import EditBudgetForm from './Components/EditBudgetForm';
import './App.css';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/expenses" element={<Expenses />} />
        <Route exact path="/add-expense" element={<AddExpenseForm />} />
        <Route exact path="/expenses/:expense_id/edit" element={<EditExpenseForm />} />
        <Route exact path="/budgets" element={<Budgets />} />
        <Route exact path="/expenses/:expense_id" element={<ExpenseDetail />} />
        <Route exact path="/budgets/:budget_id" element={<BudgetDetail />} />
        <Route exact path="/budgets/:budget_id/edit" element={<EditBudgetForm />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
