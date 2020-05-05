const express = require("express");
const bookingController = require("./../controllers/bookingController.js");
const authController = require("./../controllers/authController");

// Merge params allow nested routes => By default, each router only has access to the parameters of their specific routes
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get(
  "/checkout-session/:tourId",
  authController.protect,
  bookingController.getCheckoutSession
);

router.use(authController.restrictTo("admin", "lead-guide"));

router
  .route("/")
  .get(bookingController.getallBookings)
  .post(bookingController.createBooking);

router
  .route("/:id")
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
