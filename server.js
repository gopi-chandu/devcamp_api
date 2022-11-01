const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middlewares/logger");
const morgan = require("morgan");
// load api routes
const bootcamps = require("./routes/bootcamp");

// load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// app.use(logger)
// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//using routes
app.use("/api/v1/bootcamps", bootcamps);

app.get("/", (req, res) => {
  // res.json({name: 'Gopi'});
  res.status(200).json({ success: true });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);
