// Utilities
const factory = require("./handlerFactory");

// Error Handling
const catchAsync = require("../utils/catchAsync");

// Models
const Review = require("./../models/reviewModel.js");

// Validation
const validateReview = require('../validation/review/review');

////////////////
// Public Routes

// @route   GET api/v1/reviews/test
// @desc    Tests reviews route
// @access  Public
exports.test = (req, res, next) =>
  res.json({ message: "Reviews route secured" });

///////////////////
// Protected Routes

// @route   GET api/v1/reviews
// @desc    Get all reviews
// @access  Protected
exports.getAllReviews = factory.getAll(Review);

// @route   GET api/v1/reviews/:id
// @desc    Get review by id
// @access  Protected
exports.getReview = factory.getOne(Review);

////////////////////
// Restricted Routes

// @route   POST api/v1/reviews
// @desc    Allows user to create a review
// @access  Restricted
exports.createReview = catchAsync(async (req, res, next) => {
  // 1. Validate inputs
  const { errors, isValid } = validateReview(req.body);
  if (!isValid) return res.status(400).json(errors);

  // 1. Create a new document
  const review = await Review.create(req.body);

  console.log(review);

  // 2. Find the tour with the updated review
  const updatedTour = await updatedTour.findOne({ _id: req.body.tour }).populate('reviews');

  // 2. Respond
  res.status(201).json({
    status: "success",
    data: updatedTour,
  });
});

// @route   PATCH api/v1/reviews/:id
// @desc    Update review by id
// @access  Restricted
exports.updateReview = factory.updateOne(Review);

// @route   DELETE api/v1/reviews/:id
// @desc    Delete review by id
// @access  Restricted
exports.deleteReview = factory.deleteOne(Review);
