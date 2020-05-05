const express = require("express");
const reviewController = require("./../controllers/reviewController.js");
const authController = require("./../controllers/authController");

// Merge params allow nested routes => By default, each router only has access to the parameters of their specific routes
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    authController.restrictReviewsToBookings,
    reviewController.createReview
  );

// router
//   .route('/testing')
//   .get(authController.restrictReviewsToBookings);

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo("user", "admin"),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo("user", "admin"),
    reviewController.deleteReview
  );

module.exports = router;
