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

// Get last 10 movements movements
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

// Search a movement
router.post("/search", async (req, res) => {
    try {
        const {
            description,
            expense_date
        } = req.body
        if (description && expense_date === undefined) {
            const result = await pool.query(
                "SELECT * FROM movements WHERE description LIKE '%' || $1 || '%';",
                [description]
            )
            res.json(result.rows)
        }
        if (expense_date && description === undefined) {
            const result = await pool.query(
                "SELECT * FROM movements WHERE DATE(expense_date) = DATE($1);",
                [expense_date]
            )
            res.json(result.rows)
        }
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
            throw new Error("Error, m\nth value is not between 1 - 12")
        }
        const allMovements = await pool.query(
            `SELECT * FROM MOVEMENTS WHERE EXTRACT(MONTH FROM expense_date) = ${month} AND EXTRACT(YEAR FROM expense_date) = 2025`,
        )
        console.log(`SELECT * FROM MOVEMENTS WHERE EXTRACT(MONTH FROM expense_date) = ${month} AND EXTRACT(YEAR FROM expense_date) = 2025`);
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
    console.log("about to delete");
    
    const deleted = await pool.query(
        "DELETE FROM movements WHERE id = $1",
        [id]
    );
    console.log(deleted);
    
    res.json("Movement was deleted")
})

export default router