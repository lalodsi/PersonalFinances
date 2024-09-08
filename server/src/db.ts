import pg from 'pg'
const Pool = pg.Pool

const pool = new Pool({
    user: "postgres",
    password: "magamia",
    host: "localhost",
    port: 5432,
    database: "finances"
})

export default pool