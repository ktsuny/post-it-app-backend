// Get an instance of mysql we can use in the app
const mysql = require("mysql2");
require("dotenv").config();



// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
  }).promise()


// Export it for use in our application
module.exports.pool = pool;
