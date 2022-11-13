const express = require("express");
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamps");

// include other resource routers
const courseRouter=require('./courses')

const router = express.Router();

// Re-Route into other resource routers
router.use("/:bootcampId/courses",courseRouter)

router.route("/").get(getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
