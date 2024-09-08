import express from "express"
import pool from '../db'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        message: "Hello world"
    })
})

router.post<{},{},{user: string}>('/authenticate', async (req, res) => {
    const {user} = req.body

    const authenticate = await pool.query(
        'SELECT * FROM USERS where nombre=$1;',
        [user]
    )
    const response = authenticate.rowCount

    if (response) {
        res.json({
            state: "authenticated succesfully"
        })
    } else {
        res.status(404).json({
            error: "Not found"
        })
    }
} )

export default router