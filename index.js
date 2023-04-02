const express = require("express");
const mysql = require("mysql");
const blogRoute = require("./routes/blogRoute");
const BlogController = require("./controller/BlogController");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shivamsql",
  database: "mydb",
});

app.get("/blogs", async (req, res) => {
  const q = "SELECT * FROM blogs";
  await db.query(q, (err, data) => {
    if (err) {
      return res.json({
        statusCode: 500,
        statusMessage: "FAILED",
        message: "Data could not be fetched",
        data: err,
      });
    }
    return res.json({
      statusCode: 200,
      statusMessage: "SUCCESS",
      data: data ? data : [],
      message: "Blogs Fetched Successfully",
    });
  });
});

app.post("/blogs", async (req, res) => {
  const query =
    "INSERT INTO blogs (`blogTitle`, `blogText`, `authorName`, `postDate`) VALUES (?)";
  const values = [
    req.body.blogTitle,
    req.body.blogText,
    req.body.authorName,
    req.body.postDate,
  ];
  await db.query(query, [values], (err, data) => {
    if (err) {
      return res.json({
        statusCode: 500,
        statusMessage: "FAILED",
        message: "The Blog could not be added",
        data: err,
      });
    }
    return res.json({
      statusCode: 200,
      statusMessage: "SUCCESS",
      message: `Your Blog: ${req.body.blogTitle} has been Added Successfully!`,
    });
  });
});

// app.get()

app.listen(8080, () => {
  console.log("Connected to server!!!");
  console.log("Listening to port 8080");
});

module.exports = db;
