const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middlewares/async");

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps/
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // copy the request query
  let reqQuery = { ...req.query };

  // list the statements to be removed
  const removeFields = ["select", "sort", "page", "limit"];

  // remove the select word from the reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // convert req query to string
  let queryStr = JSON.stringify(reqQuery);

  // regular expression to replace  gt with $gt
  queryStr = queryStr.replace(
    /\b(gt|lt|gte|lte|in)\b/g,
    (match) => `$${match}`
  );

  //finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // Select fields
  if (req.query.select) {
    // split using ,
    // we get an array with values
    // join the array back into string using join operation with space
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    console.log(sortBy);
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  // here parseInt 2nd argument is radix that is 10 in decimal ,default page is 1
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // execution
  const bootcamps = await query;

  // pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination: pagination,
    data: bootcamps,
  });
});

// @desc Get a bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
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
});

// @desc create a bootcamp
// @route POST /api/v1/bootcamps/:id
// @access Public
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

// @desc update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Public
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
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
});

// @desc delete a bootcamp
// @route delete /api/v1/bootcamps/:id
// @access Public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
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
});
