const express = require("express");
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

// we bring bootcamp model to pass it to middleware
const Bootcamp = require("../models/Bootcamp");
// bring middleware
const advancedResults = require("../middlewares/advancedResults");

// include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

// Re-Route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/:id/photo")
  .put(bootcampPhotoUpload);

router
  .route("/")
  .get(advancedResults(Bootcamp,{ path: 'courses', select: 'title description' }),getBootcamps) // adding middleware
  // .get(advancedResults(Bootcamp,'courses'),getBootcamps) // adding middleware
  .post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
