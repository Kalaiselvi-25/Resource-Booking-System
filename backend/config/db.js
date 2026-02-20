const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",          // your MySQL username
  password: "kalai",  // add your MySQL password
  database: "resource_booking"
});

module.exports = db;
