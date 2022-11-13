const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const errorHandler = require("./middlewares/error");
const connectDB = require("./config/db");

// load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

// load api routes
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

const app = express();

//body parser
app.use(express.json());

// app.use(logger)
// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

//Set public folder as our static folder, to tell node that it is our static folder
app.use(express.static(path.join(__dirname,'public')));

//using routes
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

// the order of middleware is also important , that is the error handler is used after the routes from the above raise error
app.use(errorHandler);

app.get("/", (req, res) => {
  // res.json({name: 'Gopi'});
  res.status(200).json({ success: true });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
);

// Global Handler
// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close server and exit process
  server.close(() => process.exit(1));
});
