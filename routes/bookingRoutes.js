const express = require("express");
const bookingController = require("./../controllers/bookingController.js");
const authController = require("./../controllers/authController");

const router = express.Router();

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
router.get("/checkout-session/:tourId", bookingController.getCheckoutSession);

// TODO: TEMPORARY
router.post("/", bookingController.createBookingCheckout);

// @route   GET api/v1/bookings/:userId
// @desc    Get bookings for individual user
// @access  Protected
router.get("/bookings/:userId", bookingController.getCurrentUserBookings);

// @route   DELETE api/v1/bookings/:id
// @desc    Delete current user booking by id
// @access  Protected
router.delete("/booking/:id", bookingController.deleteBooking);

module.exports = router;
