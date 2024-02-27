**Using the application**
  1.enter your database credencials in .env and config.js
  2. run the ddl.sql file in database folder
  3. run 'npm install'
  4. run 'npm start' on port 5302

Post Controller Microservice: handles interaction between frontend and backend, shows APIs used to perform CRUD on posts

**Requesting data**
Data is requested from micrservice using HTTP requests, such as fetch API. 

For example, the request to get all posts:
axios
      .get('http://localhost:8502/api/posts')
      .then((response) => {
		console.log(response.data)
        setPosts(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

The GET method makes a request to the API endpoint, 'http://localhost:8502/api/posts'. 

DELETE
The app first looks for post with specified postID, then deletes it from the database using sql operation. 
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


**Receiving data**
Data is fetched using HTTP requests

For get posts, the route handler fetches data from the database and sends it back in JSON format. Moreover, it receives the status code for sucess or error in fetching the posts.
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
The rows of data will be displayed in JSON and converted to a table, with a status code 200, and status code 500 means an error fetching the posts.

DELETE
204 means success, 500 means error.
