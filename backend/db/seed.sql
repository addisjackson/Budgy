-- Seed data for the expenses table

INSERT INTO expenses (description, amount, category, date) VALUES
    ('Shirt', 20.50, 'Apparel', '2024-03-01'),
    ('Movie tickets', 30.00, 'Entertainment', '2024-03-02'),
    ('Childcare service', 150.00, 'Childcare & Education', '2024-03-03'),
    ('Groceries', 80.00, 'Food', '2024-03-04'),
    ('Rent', 500.00, 'Housing', '2024-03-05'),
    ('Flight tickets', 200.00, 'Travel', '2024-03-06'),
    ('Sweater', 35.00, 'Apparel', '2024-03-07'),
    ('Concert tickets', 50.00, 'Entertainment', '2024-03-08'),
    ('Textbooks', 100.00, 'Childcare & Education', '2024-03-09'),
    ('Dining out', 60.00, 'Food', '2024-03-10'),
    ('Utilities', 100.00, 'Housing', '2024-03-11'),
    ('Hotel stay', 150.00, 'Travel', '2024-03-12'),
    ('Jeans', 45.00, 'Apparel', '2024-03-13'),
    ('Movie rental', 5.00, 'Entertainment', '2024-03-14'),
    ('Tuition fees', 200.00, 'Childcare & Education', '2024-03-15'),
    ('Groceries', 70.00, 'Food', '2024-03-16'),
    ('Mortgage', 800.00, 'Housing', '2024-03-17'),
    ('Train tickets', 80.00, 'Travel', '2024-03-18'),
    ('T-shirt', 15.00, 'Apparel', '2024-03-19'),
    ('Video game', 40.00, 'Entertainment', '2024-03-20'),
    ('Socks', 8.00, 'Apparel', '2024-03-21'),
    ('Movie streaming subscription', 15.00, 'Entertainment', '2024-03-22'),
    ('School supplies', 50.00, 'Childcare & Education', '2024-03-23'),
    ('Takeout dinner', 25.00, 'Food', '2024-03-24'),
    ('Electricity bill', 70.00, 'Housing', '2024-03-25'),
    ('Gasoline', 40.00, 'Travel', '2024-03-26'),
    ('Dress', 60.00, 'Apparel', '2024-03-27'),
    ('Concert tickets', 75.00, 'Entertainment', '2024-03-28'),
    ('Tutoring session', 80.00, 'Childcare & Education', '2024-03-29'),
    ('Fast food', 12.00, 'Food', '2024-03-30'),
    ('Internet bill', 50.00, 'Housing', '2024-03-31'),
    ('Hotel stay', 120.00, 'Travel', '2024-04-01'),
    ('Sweatshirt', 25.00, 'Apparel', '2024-04-02'),
    ('Movie rental', 3.00, 'Entertainment', '2024-04-03'),
    ('Textbooks', 90.00, 'Childcare & Education', '2024-04-04'),
    ('Groceries', 60.00, 'Food', '2024-04-05'),
    ('Water bill', 30.00, 'Housing', '2024-04-06'),
    ('Train tickets', 90.00, 'Travel', '2024-04-07'),
    ('Jeans', 50.00, 'Apparel', '2024-04-08'),
    ('Movie tickets', 40.00, 'Entertainment', '2024-04-09');



INSERT INTO budgets (category, max_amount)
SELECT category,
       CASE 
           WHEN category = 'Apparel' THEN monthly_income * 0.08
           WHEN category = 'Entertainment' THEN monthly_income * 0.12
           WHEN category = 'Childcare & Education' THEN monthly_income * 0.30
           WHEN category = 'Food' THEN monthly_income * 0.15
           WHEN category = 'Housing' THEN monthly_income * 0.25
           WHEN category = 'Travel' THEN monthly_income * 0.10
       END AS max_amount
FROM monthly_income;
