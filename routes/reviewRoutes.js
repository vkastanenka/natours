const express = require("express");
const reviewController = require("./../controllers/reviewController.js");
const authController = require("./../controllers/authController");

const router = express.Router();

/////////////////
// Public Routes

// @route   GET api/v1/reviews/test
// @desc    Tests reviews route
// @access  Public
router.get("/test", reviewController.test);

///////////////////
// Protected Routes

router.use(authController.protect);

// @route   GET api/v1/reviews
// @desc    Get all reviews
// @access  Protected
router.get("/", reviewController.getAllReviews);

// @route   GET api/v1/reviews/review/:id
// @desc    Get review by id
// @access  Protected
router.get("/review/:id", reviewController.getReview);

// @route   GET api/v1/reviews/currentUser
// @desc    Get reviews of current user
// @access  Protected
router.get("/currentUser", reviewController.getUserReviews);

////////////////////
// Restricted Routes

// @route   POST api/v1/reviews
// @desc    Allows user to create a review
// @access  Restricted
router.post(
  "/",
  authController.restrictTo("user"),
  reviewController.createReview
);

// @route   PATCH api/v1/reviews/review/currentUser/:id
// @desc    Update current user review by id
// @access  Restricted
router.patch(
  "/review/currentUser/:id",
  authController.restrictTo("user"),
  reviewController.updateCurrentUserReview
);

// @route   DELETE api/v1/reviews/review/currentUser/:id
// @desc    Delete current user review by id
// @access  Restricted
router.delete(
  "/review/currentUser/:id",
  authController.restrictTo("user"),
  reviewController.deleteCurrentUserReview
);

// @route   DELETE api/v1/reviews/review/:id
// @desc    Delete review by id
// @access  Restricted
router.delete(
  "/review/:id",
  authController.restrictTo("admin"),
  reviewController.deleteReview
);

module.exports = router;
