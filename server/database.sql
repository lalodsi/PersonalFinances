CREATE DATABASE finances;

CREATE TABLE movements(
    -- Id
    expense_id SERIAL PRIMARY KEY,
    -- Describing the movement
    description VARCHAR(255),
    -- Number that represents the amount of this movement, whether it is expense or income
    quantity FLOAT(24),
    -- FALSE for expense, TRUE for income
    movement_type BOOLEAN,
    -- Date of the movement
    expense_date DATE
);