// @desc Get all bootcamps
// @route GET /api/v1/bootcamps/
// @access Public
exports.getBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `list of all the bootcamp records` });
};

// @desc Get a bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get record ${req.params.id}` });
};

// @desc create a bootcamp
// @route POST /api/v1/bootcamps/:id
// @access Public
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `create a bootcamp` });
};

// @desc update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Public
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `put record ${req.params.id}` });
};

// @desc delete a bootcamp
// @route delete /api/v1/bootcamps/:id
// @access Public
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `delete record ${req.params.id}` });
};
