// Utilities
const factory = require("./handlerFactory");

// Models
const Review = require("./../models/reviewModel.js");

////////////////
// Public Routes

// @route   GET api/v1/reviews/test
// @desc    Tests reviews route
// @access  Public
exports.test = (req, res, next) => res.json({ message: "Reviews route secured" });

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
exports.createReview = factory.createOne(Review);

// @route   PATCH api/v1/reviews/:id
// @desc    Update review by id
// @access  Restricted
exports.updateReview = factory.updateOne(Review);

// @route   DELETE api/v1/reviews/:id
// @desc    Delete review by id
// @access  Restricted
exports.deleteReview = factory.deleteOne(Review);
