const express = require("express");
const app = express();
const cors = require("cors")
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

//// Routes

// Create a movement
app.post("/movements", async (req, res) => {
    try {
        const {
            quantity,
            movementType,
            date
        } = req.body;
        const newMovement = await pool.query(
            "INSERT INTO movements (quantity, movement_type, expense_date) VALUES($1, $2, $3) RETURNING *",
            [quantity, movementType, date]
        )
        console.log(newMovement.command);
        res.json(newMovement.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// Get all movements
app.get("/movements/", async (req, res) => {
    try {
        const allMovements = await pool.query(
            "SELECT * FROM movements",
        )
        console.log(allMovements.rows);
        res.json(allMovements.rows)
    } catch (err) {
        console.error(err.message);
    }
})

// Get a movement
app.get("/movements/:id", async (req, res) => {
    //
    try {
        const { id } = req.params
        const movement = await pool.query(
            'SELECT * FROM movements WHERE expense_id = $1',
            [id]
        )
        res.json(movement.rows[0])
    } catch (err) {
        console.error(err.message);
    }

})

// Update a movement
app.put("/movements/:id", async (req,res) => {
    //
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const updateMovement = await pool.query(
            "UPDATE movements SET quantity = $1 WHERE expense_id = $2",
            [quantity, id]
        );

        res.send("Updated!")
    } catch (err) {
        console.error(err.message);
    }
})

// Delete a movement
app.delete("/movements/:id", async (req, res) => {
    //
    const { id } = req.params;
    const deleted = await pool.query(
        "DELETE FROM movements WHERE expense_id = $1",
        [id]
    );
    res.json("Movement was deleted")
})

app.listen(5000,() => {
    //
    console.log("Server starting on port 5000");
})