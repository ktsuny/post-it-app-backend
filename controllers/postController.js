const db = require("../database/config");
require("dotenv").config(); // ENV vars
const lodash = require("lodash"); // Util to deep-compare two objects

// Returns all rows of posts in Posts
const getPosts = async (req, res) => {
  console.log("get Posts working")
  try {
    // SQL query to select all rows from the "customers" table
    const query = "SELECT * FROM Posts";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.pool.query(query);
    console.log(rows)
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching posts from the database:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};

// Returns a single post by their unique ID 
const getPostByID = async (req, res) => {
  try {
    const postID = req.params.id;
    const query = "SELECT * FROM Posts WHERE postID = ?";
    const [result] = await db.pool.query(query, [postID]);
    // Check if post was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    const post = result[0];
    res.json(post);
  } catch (error) {
    console.error("Error fetching post from the database:", error);
    res.status(500).json({ error: "Error fetching post" });
  }
};

// Returns status of creation of new post in Posts
const createPost = async (req, res) => {
  console.log("create Posts working")
  try {
    const { user, title, text} = req.body;
    const query =
      "INSERT INTO Posts (user, title, text) VALUES (?, ?, ?)";

    const response = await db.pool.query(query, [
      user,
      title,
      text
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating post:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating post" });
  }
};

const updatePost = async (req, res) => {
  // Get the post ID
  const postID = req.params.id;
  // Get the post object
  const newPost = req.body;

  try {
    const [data] = await db.pool.query("SELECT * FROM Posts WHERE postID = ?", [
      postID,
    ]);

    const oldPost = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newPost, oldPost)) {
      const query =
        "UPDATE Posts SET title, body, updatedAt";
      const values = [
        newPost.title,
        newPost.text,
      ];
      // Perform the update
      await db.pool.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Post updated successfully." });
    }

    res.json({ message: "Post details are the same, no update" });
  } catch (error) {
    console.log("Error updating post", error);
    res
      .status(500)
      .json({ error: `Error updating the post with id ${postID}` });
  }
};


// Endpoint to delete a post from the database
const deletePost = async (req, res) => {
  console.log("Deleting post with postID:", req.params.id);
  const postID = req.params.id;

  try {
    // Ensure the post exitst
    const [isExisting] = await db.pool.query(
      "SELECT 1 FROM Posts WHERE postID = ?",
      [postID]
    );
    // If the post doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Post not found");
    }

    // Delete the post from Posts
    await db.pool.query("DELETE FROM Posts WHERE postID = ?", [postID]);

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
  getPostByID,
  createPost,
  updatePost,
  deletePost,
};
