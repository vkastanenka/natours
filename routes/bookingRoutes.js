const express = require("express");
const bookingController = require("./../controllers/bookingController.js");
const authController = require("./../controllers/authController");

// Merge params allow nested routes
const router = express.Router({ mergeParams: true });

/////////////////
// Public Routes

// @route   GET api/v1/bookings/test
// @desc    Tests bookings route
// @access  Public
router.get("/test", bookingController.test);

///////////////////
// Protected Routes

router.use(authController.protect);

// @route   GET api/v1/bookings/checkout-session/:tourId
// @desc    Creates checkout section to book a tour
// @access  Protected
router.get(
  "/checkout-session/:tourId",
  bookingController.getCheckoutSession
);

////////////////////
// Restricted Routes

router.use(authController.restrictTo("admin", "lead-guide"));

// @route   GET api/v1/bookings
// @desc    Get all bookings
// @access  Restricted
router.get('/', bookingController.getAllBookings);

// @route   POST api/v1/bookings
// @desc    Create a booking
// @access  Restricted
router.post('/', bookingController.createBooking);

// @route   GET api/v1/bookings/:id
// @desc    Get booking by id
// @access  Restricted
router.get('/:id', bookingController.getBooking);

// @route   PATCH api/v1/bookings/:id
// @desc    Update booking by id
// @access  Restricted
router.patch('/:id', bookingController.updateBooking);

// @route   DELETE api/v1/bookings/:id
// @desc    Delete booking by id
// @access  Restricted
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;