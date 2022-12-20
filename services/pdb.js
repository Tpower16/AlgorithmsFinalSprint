const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "bst_db",
    password: "Keyin2022",
    port: 5432,
});
module.exports = pool;
