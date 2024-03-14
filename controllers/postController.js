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
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching posts from the database:", error);
    return res.status(500).json({ error: "Error fetching posts" });
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
    return res.json(post);
  } catch (error) {
    console.error("Error fetching post from the database:", error);
    return res.status(500).json({ error: "Error fetching post" });
  }
};

// Returns status of creation of new post in Posts
const createPost = async (req, res) => {
  // console.log("create Posts working")
  try {
    const { userID, title, text} = req.body;
    const query =
      "INSERT INTO Posts (userID, title, text, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())";

    const response = await db.pool.query(query, [
      userID,
      title,
      text
    ]);
    return res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating post:", error);
    // Inform the client of the error
    return res.status(500).json({ error: "Error creating post" });
  }
};

const updatePost = async (req, res) => {
	try {

		const {id} = req.params

		if (!req.body.title || !req.body.text ){
			return res.status(400).send({
        message: 'All fields required',
      })
		}

		const { title, text } = req.body
		
		const query1 = `SELECT * FROM Posts WHERE postID = ?`
		const [post] = await db.pool.query(query1, [id])

		// if post exists, perform update
		if(post.length > 0){
      console.log(post)
			const query2 = `
			UPDATE Posts
				SET title = ?, text = ?, updatedAt = NOW()
				WHERE postID = ?
			`
			await db.pool.query(query2, [title, text, id])
			return res.status(200).json({message: 'Post successfully updated'})
		} else {
			return res.status(200).json({message: 'Post does not exist'})
		}
		
		
	} catch (error) {
		res.status(500).send({message: error.message})
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
    return res.status(204).json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Error deleting post from the database:", error);
    return res.status(500).json({ error: error.message });
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
