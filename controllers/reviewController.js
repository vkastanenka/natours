// Utilities
const factory = require("./handlerFactory");

// Error Handling
const catchAsync = require("../utils/catchAsync");

// Models
const Tour = require("../models/tourModel");
const Review = require("../models/reviewModel");

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
exports.getAllReviews = factory.getAll(Review, {
  path: "tour",
  select: "name",
});

// @route   GET api/v1/reviews/:id
// @desc    Get review by id
// @access  Protected
exports.getReview = factory.getOne(Review);

// @route   GET api/v1/reviews/userReviews
// @desc    Get reviews of user by id
// @access  Protected
exports.getUserReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.params.userId }).populate({
    path: "tour",
  });
  res.status(200).json({ status: "success", data: reviews });
});

////////////////////
// Restricted Routes

// @route   POST api/v1/reviews
// @desc    Allows user to create a review
// @access  Restricted
exports.createReview = catchAsync(async (req, res, next) => {
  const errors = {};

  // 1. Check if user has already written a review for the tour
  const reviewCheck = await Review.findOne({
    tour: req.body.tour,
    user: req.body.user,
  });

  if (reviewCheck) {
    errors.alreadyReviewed = "User has already reviewed this tour";
    return res.status(400).json(errors);
  }

  // 2. Create a new review document
  await Review.create(req.body);

  // 3. Find the tour with the updated review
  const updatedTour = await Tour.findOne({ _id: req.body.tour }).populate(
    "reviews"
  );

  // 4. Respond
  res.status(201).json({
    status: "success",
    data: updatedTour,
  });
});

// @route   PATCH api/v1/reviews/:id
// @desc    Update review by id
// @access  Restricted
exports.updateReview = catchAsync(async (req, res, next) => {
  const errors = {};

  // 1. Find document by id and update
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate({ path: "tour", select: "name" });

  // 2. Error handling for no document found
  if (!review) {
    errors.notFound = "No review found with that id";
    res.status(404).json(errors);
  }

  // 3. Respond
  res.status(200).json({ status: "success", data: review });
});

// @route   DELETE api/v1/reviews/review/:id
// @desc    Delete review by id
// @access  Restricted
exports.deleteReview = factory.deleteOne(Review);
