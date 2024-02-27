// Get an instance of mysql we can use in the app
const mysql = require("mysql2");
require("dotenv").config();



// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
  connectionLimit: 10,
  waitForConnections: true,
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs340_sunyus',
  password: '8409',
  database: 'cs340_sunyus',
  port: 3306,
}).promise();

// Export it for use in our application
module.exports.pool = pool;
