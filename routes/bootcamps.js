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

const { protect, authorize } = require("../middlewares/auth");

// Re-Route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

router
  .route("/")
  .get(
    advancedResults(Bootcamp, { path: "courses", select: "title description" }),
    getBootcamps
  ) // adding middleware
  // .get(advancedResults(Bootcamp,'courses'),getBootcamps) // adding middleware
  .post(protect, authorize("publisher", "admin"), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

module.exports = router;
