// const express = require("express");
// const bookingController = require("./../controllers/bookingController.js");
// const authController = require("./../controllers/authController");

// // Merge params allow nested routes => By default, each router only has access to the parameters of their specific routes
// const router = express.Router({ mergeParams: true });

// /////////////////
// // Public Routes

// // @route   GET api/v1/bookings/test
// // @desc    Tests bookings route
// // @access  Public
// router.get("/test", bookingController.test);

// ///////////////////
// // Protected Routes

// router.use(authController.protect);

// // TODO:
// router.get(
//   "/checkout-session/:tourId",
//   authController.protect,
//   bookingController.getCheckoutSession
// );

// ////////////////////
// // Restricted Routes

// router.use(authController.restrictTo("admin", "lead-guide"));

// // @route   GET api/v1/bookings
// // @desc    Get all bookings
// // @access  Restricted
// router.get('/', bookingController.getallBookings);

// // @route   POST api/v1/bookings
// // @desc    Post a booking
// // @access  Restricted
// router.post('/', bookingController.createBooking);

// // @route   GET api/v1/bookings/:id
// // @desc    Get booking by id
// // @access  Restricted
// router.get('/:id', bookingController.getBooking);

// // @route   PATCH api/v1/bookings/:id
// // @desc    Update booking by id
// // @access  Restricted
// router.patch('/:id', bookingController.updateBooking);

// // @route   DELETE api/v1/bookings/:id
// // @desc    Delete booking by id
// // @access  Restricted
// router.delete('/:id', bookingController.deleteBooking);

// module.exports = router;