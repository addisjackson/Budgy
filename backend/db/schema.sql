CREATE DATABASE budget_app;

-- expensesSchema.sql

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    description TEXT,
    amount NUMERIC,
    category VARCHAR(50) CHECK (category IN ('Apparel', 'Entertainment', 'Childcare & Education', 'Food', 'Housing', 'Travel')),
    date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (amount >= 0)
);



CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    category TEXT UNIQUE,
    max_amount NUMERIC,
    amount_spent NUMERIC DEFAULT 0
);
