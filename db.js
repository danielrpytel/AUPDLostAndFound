const util = require("util");
const mysql = require("mysql");

const pool = mysql.createPool({
  host: "45.55.136.114",
  user: "MNDs2021",
  password: "baseba11is0K!",
  database: "MNDs2021",
});

pool.getConnection((err, connection) => {
  if (err) console.error("Something went wrong connecting to the database ...");

  if (connection) console.log("Connected to database");
  connection.release();
  return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
