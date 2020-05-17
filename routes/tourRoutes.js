const express = require("express");
const tourController = require("./../controllers/tourController");
const authController = require("./../controllers/authController");

const router = express.Router();

/////////////////
// Public Routes

// @route   GET api/v1/tours/test
// @desc    Tests tours route
// @access  Public
router.get("/test", tourController.test);

// @route   GET api/v1/tours
// @desc    Get all tours
// @access  Public
router.get("/", tourController.getAllTours);

// @route   GET api/v1/tours/:id
// @desc    Get tour by id
// @access  Public
router.get("/:id", tourController.getTour);

// @route   GET api/v1/tours/tour/:slug
// @desc    Get tour by slug
// @access  Public
router.get("/tour/:slug", tourController.getTourBySlug);

///////////////////
// Protected Routes

// router.use(authController.protect);

////////////////////
// Restricted Routes

// router.use(authController.restrictTo("admin", "lead-guide"));

// @route   POST api/v1/tours
// @desc    Create new tour
// @access  Restricted
// router.post(
//   "/",
//   tourController.uploadTourImages,
//   tourController.resizeTourImages,
//   tourController.createTour
// );

router.post(
  "/",
  tourController.uploadTourImages,
  tourController.resizeTourImages,
  tourController.createTour
);

// @route   PATCH api/v1/tours/:id
// @desc    Update tour by id
// @access  Restricted
router.patch(
  "/:id",
  tourController.uploadTourImages,
  tourController.resizeTourImages,
  tourController.updateTour
);

// @route   DELETE api/v1/tours/:id
// @desc    Delete tour by id
// @access  Restricted
router.delete("/:id", tourController.deleteTour);

module.exports = router;
