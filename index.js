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

app.get("/blogs/:blogId", async (req, res) => {
  const q = "SELECT * FROM blogs where blogId = (?)";
  const id = req.params.blogId;
  await db.query(q, [id], (err, data) => {
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
      data: data ? data[0] : {},
      message: "Blog Fetched Successfully",
    });
  });
});

app.delete("/blogs/:blogId", async (req, res) => {
  const q = "DELETE FROM blogs where blogId = (?)";
  const id = req.params.blogId;
  await db.query(q, [id], (err, data) => {
    if (err) {
      return res.json({
        statusCode: 500,
        statusMessage: "FAILED",
        message: "Data could not be deleted",
        data: err,
      });
    }
    if (data.affectedRows === 0) {
      return res.json({
        statusCode: 200,
        statusMessage: "FAIL",
        message: "Blog cannot be found in the list",
      });
    }
    return res.json({
      statusCode: 200,
      statusMessage: "SUCCESS",
      message: "Blog Deleted Successfully",
    });
  });
});

app.post("/blogs", async (req, res) => {
  const query =
    "INSERT INTO blogs (`blogTitle`, `blogText`, `authorName`, `postDate`, `blogDesc`, `coverImage`) VALUES (?)";
  const values = [
    req.body.blogTitle,
    req.body.blogText,
    req.body.authorName,
    req.body.postDate,
    req.body.blogDesc,
    req.body.coverImage,
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
