// app.js

const express = require('express');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expense.routes');
const budgetRoutes = require('./routes/budget.routes');
const cors = require('cors')
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors())

// Routes
app.use('/expenses', expenseRoutes);
app.use('/budgets', budgetRoutes)


// 404 Route - Page Not Found
app.use((req, res, next) => {
    res.status(404).send('Page not found');
  });
  

module.exports = app;
