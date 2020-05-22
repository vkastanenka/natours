// Utilities
const factory = require("./handlerFactory");

// Error Handling
const query404 = require("../utils/query404");
const catchAsync = require("../utils/catchAsync");

// Validation
const validateReview = require("../validation/review/review");

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
exports.getReview = factory.getOne(Review, {
  path: "tour",
  select: "name",
});

// @route   GET api/v1/reviews/currentUser
// @desc    Get reviews of current user
// @access  Protected
exports.getUserReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user.id }).populate({
    path: "tour",
  });

  query404(res, reviews, "User has not yet reviews any tours");

  res.status(200).json({ status: "success", data: reviews });
});

////////////////////
// Restricted Routes

// @route   POST api/v1/reviews
// @desc    Allows user to create a review
// @access  Restricted
exports.createReview = catchAsync(async (req, res, next) => {
  // 1. Add user to req.body
  req.body.user = req.user.id;

  // 2. Validate inputs
  const { errors, isValid } = validateReview(req.body);
  if (!isValid) return res.status(400).json(errors);

  // 3. Check if user has already written a review for the tour
  const reviewCheck = await Review.findOne({
    tour: req.body.tour,
    user: req.body.user,
  });

  if (reviewCheck) {
    errors.alreadyReviewed = "User has already reviewed this tour";
    return res.status(400).json(errors);
  }

  // 4. Create a new review document
  await Review.create(req.body);

  // 5. Find the tour with the updated review
  const updatedTour = await Tour.findOne({ _id: req.body.tour }).populate(
    "reviews"
  );

  // 6. Respond
  res.status(201).json({
    status: "success",
    data: updatedTour,
  });
});

// @route   PATCH api/v1/reviews/review/currentUser/:id
// @desc    Update current user review by id
// @access  Restricted
exports.updateCurrentUserReview = catchAsync(async (req, res, next) => {
  // 1. Add user to req.body
  req.body.user = req.user.id;

  // 2. Validate inputs
  const { errors, isValid } = validateReview(req.body);
  if (!isValid) return res.status(400).json(errors);

  // 3. Find document by id
  const review = await Review.findById(req.params.id);

  // 4. If no document, respond with an error
  query404(res, review, "No document found with that ID");

  // 5. If review doesn't belong to user, respond with an error
  if (req.user.id.toString() !== review.user._id.toString()) {
    errors.unauthorized = "User can only update reviews they have written";
    return res.status(401).json(errors);
  }

  // 6. Update the review
  review
    .update(req.body, { new: true })
    .populate({ path: "tour", select: "name" });

  // 7. Respond
  res.status(200).json({ status: "success", data: review });
});

// @route   DELETE api/v1/reviews/review/currentUser/:id
// @desc    Delete current user review by id
// @access  Restricted
exports.deleteCurrentUserReview = catchAsync(async (req, res, next) => {
  const errors = {};

  // 1. Find document by id
  const review = await Review.findById(req.params.id);

  // 2. If no document, respond with an error
  query404(res, review, "No document found with that ID");

  // 3. If review doesn't belong to user, respond with an error
  if (req.user.id.toString() !== review.user._id.toString()) {
    errors.unauthorized = "User can only delete reviews they have written";
    return res.status(401).json(errors);
  }

  // 4. Delete review
  review.deleteOne();

  // 3. Respond
  res.status(204).json({ status: "success" });
});

// @route   DELETE api/v1/reviews/review/:id
// @desc    Delete review by id
// @access  Restricted
exports.deleteReview = factory.deleteOne(Review);
