CREATE DATABASE finances;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE movements(
    -- Ids
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    -- Describing the movement
    description VARCHAR(255) NOT NULL,
    -- Number that represents the amount of this movement, whether it is expense or income
    quantity BIGINT NOT NULL,
    -- FALSE for expense, TRUE for income
    movement_type BOOLEAN NOT NULL,
    -- Date of the movement
    expense_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    quantity BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE monthlypayments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    movement_id INT NOT NULL,
    total_quantity BIGINT NOT NULL,
    monthly_quantity BIGINT NOT NULL,
    meses INT NOT NULL,
    start_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (movement_id) REFERENCES movements(id)
);

CREATE TABLE limits (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    quantity BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
