CREATE DATABASE finances;

CREATE TABLE movements(
    -- Id
    expense_id SERIAL PRIMARY KEY,
    -- Describing the movement
    description VARCHAR(255) NOT NULL,
    -- Number that represents the amount of this movement, whether it is expense or income
    quantity BIGINT NOT NULL,
    -- FALSE for expense, TRUE for income
    movement_type BOOLEAN NOT NULL,
    -- Date of the movement
    expense_date DATE NOT NULL
);