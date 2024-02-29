// Get an instance of mysql we can use in the app
const mysql = require("mysql2");
require("dotenv").config();



// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'hw122696',
  database: 'post_it_app',
}).promise();


// Export it for use in our application
module.exports.pool = pool;
