import { Router } from "express";
import pool from "../db"

const router = Router()

// Create a movement
router.post("/", async (req, res) => {
    try {
        const {
            quantity,
            description,
            movementType,
            date
        } = req.body;
        console.log(req.body);
        const newMovement = await pool.query(
            "INSERT INTO movements (user_id, category_id, quantity, description, movement_type, expense_date) VALUES(1, 1, $1, $2, $3, $4)",
            [quantity, description, movementType, date]
        )
        console.log(newMovement.command);
        res.send(newMovement.rows[0]);
    } catch (err) {
        console.error(err);
    }
})

// Get all movements
router.get("/", async (req, res) => {
    try {
        const allMovements = await pool.query(
            "SELECT * FROM movements ORDER BY expense_date desc LIMIT 10",
        )
        res.json(allMovements.rows)
    } catch (err) {
        console.error(err);
    }
})

// Get all movements by month
router.get("/month/:month", async (req, res) => {
    try {
        console.log("Getting data by month");
        const { month } = req.params
        const monthNumber = parseInt(month)
        if (monthNumber < 1 || monthNumber > 12) {
            throw new Error("Error, month value is not between 1 - 12")
        }
        const allMovements = await pool.query(
            `SELECT * FROM MOVEMENTS WHERE EXTRACT(MONTH FROM expense_date) = ${month} AND EXTRACT(YEAR FROM expense_date) = 2024`,
        )
        console.log(`SELECT * FROM MOVEMENTS WHERE EXTRACT(MONTH FROM expense_date) = ${month} AND EXTRACT(YEAR FROM expense_date) = 2024`);
        // console.log(allMovements.rows);
        res.json(allMovements.rows)
    } catch (err) {
        console.log(typeof err);
    }
})

// Get a movement
router.get("/:id", async (req, res) => {
    //
    try {
        const { id } = req.params
        const movement = await pool.query(
            'SELECT * FROM movements WHERE id = $1',
            [id]
        )
        res.json(movement.rows[0])
    } catch (err) {
        console.error(err);
    }

})

// Update a movement
router.put("/:id", async (req,res) => {
    //
    try {
        const { id } = req.params;
        const { quantity, description } = req.body;

        const updateMovement = await pool.query(
            "UPDATE movements SET quantity = $1, description = $2 WHERE expense_id = $3",
            [quantity, description, id]
        );

        res.send("Updated!")
    } catch (err) {
        console.error(err);
    }
})

// Delete a movement
router.delete("/:id", async (req, res) => {
    //
    const { id } = req.params;
    const deleted = await pool.query(
        "DELETE FROM movements WHERE id = $1",
        [id]
    );
    res.json("Movement was deleted")
})

export default router