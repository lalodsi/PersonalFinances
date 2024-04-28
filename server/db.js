const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "magamia",
    host: "localhost",
    port: 5432,
    database: "finances"
})

module.exports = pool