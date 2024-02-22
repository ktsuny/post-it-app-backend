const db = require("../database/config");
require("dotenv").config(); // ENV vars
const lodash = require("lodash"); // Util to deep-compare two objects

// Returns all rows of posts in Posts
const getPosts = async (req, res) => {
  try {
    // SQL query to select all rows from the "customers" table
    const query = "SELECT * FROM Posts";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.pool.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching ppsts from the database:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};


// Returns status of creation of new post in Posts
const createPost = async (req, res) => {
  try {
    const { authorID, title, body, commentsID } = req.body;
    const query =
      "INSERT INTO Posts (authorID, title, body, commentsID) VALUES (?, ?, ?, ?)";

    const response = await db.query(query, [
      authorID,
      title,
      body,
      commentsID,
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating post:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating post" });
  }
};



// Endpoint to delete a post from the database
const deletePost = async (req, res) => {
  console.log("Deleting post with id:", req.params.id);
  const postID = req.params.id;

  try {
    // Ensure the post exitst
    const [isExisting] = await db.query(
      "SELECT 1 FROM Posts WHERE id = ?",
      [postID]
    );
    // If the post doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Post not found");
    }

    // Delete the post from Posts
    await db.query("DELETE FROM Posts WHERE id = ?", [postID]);

    // Return the appropriate status code
    res.status(204).json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Error deleting post from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getPosts,
  createPost,
  deletePost,
};
