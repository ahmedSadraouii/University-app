const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const classesRouter = require("./routes/classes");
const studentRouter = require("./routes/students");
const documentsRouter = require("./routes/documents");
const subjectRouter = require("./routes/subjects");
const teacherRouter = require("./routes/teachers");
const loginRouter = require("./routes/auth");
require("dotenv").config();

const app = express();
// Enable CORS for all requests
app.use(cors());

app.use(express.json());
app.use(
  "/api",
  classesRouter,
  studentRouter,
  documentsRouter,
  subjectRouter,
  teacherRouter,
  loginRouter
);

const PORT = process.env.PORT;
const MONGODB_URI = process.env.DATABASE_URL;
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
