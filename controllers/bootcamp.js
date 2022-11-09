const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps/
// @access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (err) {
    next(err);
  }
};

// @desc Get a bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp is not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
    // next(
    //   new ErrorResponse(
    //     `Bootcamp is not found with id of ${req.params.id}`,
    //     404
    //   )
    // );
    //2) next(error);
    //1) res.status(400).json({ success: false });
  }
};

// @desc create a bootcamp
// @route POST /api/v1/bootcamps/:id
// @access Public
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Public
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp is not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc delete a bootcamp
// @route delete /api/v1/bootcamps/:id
// @access Public
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp is not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};