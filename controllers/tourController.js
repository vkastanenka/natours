// Utilities
const sharp = require("sharp");
const multer = require("multer");
const factory = require("./handlerFactory");

// Error Handling
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Models
const Tour = require("../models/tourModel");

///////////////
// Middleware

// Store the file in memory as a Buffer object
const multerStorage = multer.memoryStorage();

// Test if the file is an image
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images...", 400), false);
  }
};

// Configuring multer upload
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

// Upload the tour images
exports.uploadTourImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 }
]);

// Image processing (resizing, formatting, quality, and file location)
exports.resizeTourImages = catchAsync(async (req, res, next) => {
  if (!req.files || !req.files.name.imageCover || !req.files.name.images) return next();

  // 1. Cover image processing
  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/tours/${req.body.imageCover}`);

  // 2. Image gallery processing
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${filename}`);

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
exports.test = (req, res, next) => res.json({ message: "Tour route secured" });

// @route   GET api/v1/tours
// @desc    Get all tours
// @access  Public
exports.getAllTours = factory.getAll(Tour);

// @route   GET api/v1/tours/:id
// @desc    Get tour by id
// @access  Public
// exports.getTour = factory.getOne(Tour, "reviews");
exports.getTour = factory.getOne(Tour);

// @route   POST api/v1/tours
// @desc    Create new tour
// @access  Restricted
exports.createTour = factory.createOne(Tour);

// @route   PATCH api/v1/tours/:id
// @desc    Update tour by id
// @access  Restricted
exports.updateTour = factory.updateOne(Tour);

// @route   DELETE api/v1/tours/:id
// @desc    Delete tour by id
// @access  Restricted
exports.deleteTour = factory.deleteOne(Tour);

