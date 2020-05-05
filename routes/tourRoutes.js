const express = require("express");
const tourController = require("./../controllers/tourController");
const authController = require("./../controllers/authController");
const reviewRouter = require("./../routes/reviewRoutes");
const bookingRouter = require("./../routes/bookingRoutes");

const router = express.Router();

///////////////////////////////
// Routes Based off API Features

// Top 5 rated tours starting with highest rated
router
  .route("/top-5-rated")
  .get(tourController.aliasTopRatedTours, tourController.getAllTours);

// Top 5 cheapest tours starting with the cheapest
router
  .route("/top-5-cheapest")
  .get(tourController.aliasTopCheapestTours, tourController.getAllTours);

//////////////////////////////
// Aggregation Pipeline Tours

// Tour statistics grouped by tour difficulty
router
  .route("/tour-stats")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.getTourStats
  );

// Company schedule ordered by tour start date
router
  .route("/company-schedule")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    tourController.getCompanySchedule
  );

// Monthly plan for each year
router
  .route("/monthly-plan/:year")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    tourController.getMonthlyPlan
  );

//////////////////////////////
// Distance Calculation Routes

router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(tourController.getToursWithin);
// /tours-distance?distance=233,center=40,45,unit=mi
// /tours-distance/233/center/-40,45/unit/mi

router.route("/distance/:latlng/unit/:unit").get(tourController.getDistances);

////////////////
// Nested Routes

// Get reviews based on tourId
router.use("/:tourId/reviews", reviewRouter);

// Get bookings based on tourId
router.use(
  "/:tourId/bookings",
  authController.protect,
  authController.restrictTo("admin", "lead-guide"),
  bookingRouter
);

//////////////
// CRUD Routes

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.createTour
  );

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );

module.exports = router;
