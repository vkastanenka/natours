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

// @route   GET api/v1/reviews/:id
// @desc    Get review by id
// @access  Protected
router.get("/:id", reviewController.getReview);

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

router.use(authController.restrictTo("user", "admin"));

// @route   PATCH api/v1/reviews/:id
// @desc    Update review by id
// @access  Restricted
router.patch("/:id", reviewController.updateReview);

// @route   DELETE api/v1/reviews/:id
// @desc    Delete review by id
// @access  Restricted
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
