const Pool = require("pg").Pool;
const pool = new Pool({
  user: "albert",
  password: "albert",
  host: "localhost",
  port: 5432,
  database: "employees",
});

module.exports = pool;
