// Get an instance of mysql we can use in the app
const mysql = require("mysql2");
require("dotenv").config();



// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}).promise();


// Export it for use in our application
module.exports.pool = pool;
