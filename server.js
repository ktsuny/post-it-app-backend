const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3002 

// Middleware:

// If on FLIP, use cors() middleware to allow cross-origin requests from the frontend with your port number:
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(cors())
app.use(express.json())

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  )
  next()
})

app.get('/', (req, res) => {
  res.send('Post it server')
})
// Routes:
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/comments", require("./routes/commentRoutes"))


app.listen(PORT, () => {
  // Change to whatever FLIP server you're on, copy and paste URL into browser to test:
  console.log(`Server running on port: ${PORT}...`)
});
