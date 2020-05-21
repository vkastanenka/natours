// Utilities
const sharp = require("sharp");
const multer = require("multer");
const factory = require("./handlerFactory");

// Error Handling
const query404 = require("../utils/query404");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Validation
const validateTour = require("../validation/tour/tour");

// Models
const Tour = require("../models/tourModel");

///////////////
// Middleware

const multerStorage = multer.memoryStorage();

// TODO: Proper error handling

// Multer filter for images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

// Multer upload
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Multer upload fields
exports.uploadTourImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

// Multer editing uploaded pictures, saving to file, and creating name for DB
exports.resizeTourImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  // 1) Cover image
  req.body.imageCover = `tour-${req.body.name}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`client/src/assets/images/tours/${req.body.imageCover}`);

  // 2) Images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `tour-${req.body.name}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`client/src/assets/images/tours/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

////////////////
// Public Routes

// @route   GET api/v1/users/test
// @desc    Tests users route
// @access  Public
exports.test = (req, res, next) => res.json({ message: "Tours route secured" });

// @route   GET api/v1/tours
// @desc    Get all tours
// @access  Public
exports.getAllTours = factory.getAll(Tour);

// @route   GET api/v1/tours/:id
// @desc    Get tour by id
// @access  Public
exports.getTour = factory.getOne(Tour, "reviews");

// @route   GET api/v1/tours/tour/:slug
// @desc    Get tour by slug
// @access  Public
exports.getTourBySlug = catchAsync(async (req, res, next) => {
  // 1. Find the tour
  const tour = await Tour.findOne({ slug: req.params.slug }).populate(
    "reviews"
  );

  // 2. Check if the tour exists
  query404(res, tour, "There is no tour with that name");

  // 3. Respond
  res.status(200).json({ status: "success", data: tour });
});

// @route   POST api/v1/tours
// @desc    Create new tour
// @access  Restricted
exports.createTour = catchAsync(async (req, res, next) => {
  req.body.startLocation = JSON.parse(req.body.startLocation);
  req.body.locations = JSON.parse(req.body.locations);
  req.body.startLocation.type = "Point";
  req.body.locations.forEach((location) => (location.type = "Point"));

  // 1. Validate inputs
  const { errors, isValid } = validateTour(req.body);
  if (!isValid) return res.status(400).json(errors);

  // 1. Create a new document
  const doc = await Tour.create(req.body);

  // 2. Respond
  res.status(201).json({
    status: "success",
    data: doc,
  });
});

// @route   PATCH api/v1/tours/:id
// @desc    Update tour by id
// @access  Restricted
exports.updateTour = catchAsync(async (req, res, next) => {
  req.body.startLocation = JSON.parse(req.body.startLocation);
  req.body.locations = JSON.parse(req.body.locations);
  req.body.startLocation.type = "Point";
  req.body.locations.forEach((location) => (location.type = "Point"));

  // 1. Validate inputs
  const { errors, isValid } = validateTour(req.body);
  if (!isValid) return res.status(400).json(errors);

  // 2. Find document by id and update
  const doc = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // 3. If no document, respond with an error// TODO: (query404);

  // 4. Respond
  res.status(200).json({
    status: "success",
    data: doc,
  });
});

// @route   DELETE api/v1/tours/:id
// @desc    Delete tour by id
// @access  Restricted
exports.deleteTour = factory.deleteOne(Tour);
