import express from "express"
import pool from '../db'
import bcrypt from "bcryptjs"

const router = express.Router()

/**
 * Register new users
 * - Validates required fields.
 * - Checks if the email already exists.
 * - Hashes the password before storing.
 */
router.post('/register', async (req, res) => {
    const { name, email, passphrase } = req.body

    if (!email || !passphrase || !name) {
        return res.status(400).json({
            message: "Bad request"
        })
    }

    // Check if email already exists
    const emails = await pool.query(
        'SELECT * FROM USERS WHERE email=$1',
        [email]
    )

    if (emails.rowCount !== 0) {
        return res.status(500).json({
            message: "This user already exists"
        })
    }

    // Hash the password before saving
    const hashed = await bcrypt.hash(passphrase, 10)

    // Insert new user into the database
    const result = await pool.query(
        "INSERT INTO USERS (nombre, email, password) VALUES($1, $2, $3);",
        [
            name,
            email,
            hashed
        ]
    )

    if (result.rowCount === 1) {
        return res.status(200).json({
            message: "User registered successfully"
        })
    }
})

/**
 * Authenticate users
 * - Checks if the user exists.
 * - Compares provided password against stored hash.
 */
router.post<{},{},{user: string, passphrase: string}>('/authenticate', async (req, res) => {
    const { user, passphrase } = req.body

    if (!user || !passphrase) {
        return res.status(400).json({
            message: "Bad request"
        })
    }

    // Find user by email
    const foundEmails = await pool.query(
        'SELECT * FROM USERS WHERE email=$1;',
        [user]
    )

    if (foundEmails.rowCount === 0) {
        return res.status(404).json({
            error: "Not found"
        })
    }

    const foundUser = foundEmails.rows[0]

    // Compare provided password with stored hash
    const isPasswordValid = await bcrypt.compare(passphrase, foundUser.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid user"
        })
    }

    return res.json({
        message: "Authenticated successfully"
    })
})

export default router
