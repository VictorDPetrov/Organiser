const mysql = require('mysql');

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'organiser',
  debug: false
});

console.log("Database is Online!");
module.exports = { database };