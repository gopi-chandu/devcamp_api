const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

// @desc Get courses
// @route GET /api/v1/courses
// @route GET /api/v1/bootcamps/:bootcampId/courses
// @access Public

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    // populate the fields
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @desc Get single course
// @route GET /api/v1/courses/:id
// @access Public

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc Add course
// @route POST /api/v1/bootcamps/:bootcampId/courses
// @access Private

exports.addCourse = asyncHandler(async (req, res, next) => {
  // for courses model we need to add the bootcampId as it is not present in the body of post request
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  // also we need to check if the user owns the bootcamp
  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with id of ${req.params.bootcampId}`, 404)
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});
// @desc Update course
// @route PUT /api/v1/courses/:id
// @access Private

exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`No course with id of ${req.params.id}`, 404)
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // this new : true returns the new object after updating
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});


// @desc DELETE course
// @route DELETE /api/v1/courses/:id
// @access Private

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`No course with id of ${req.params.id}`, 404)
    );
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
