const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const reviewRouter = require("./../routes/reviewRoutes");
const bookingRouter = require("./../routes/bookingRoutes");

const router = express.Router();

router.use("/:userId/reviews", reviewRouter);
router.use("/:userId/bookings", bookingRouter);

// User Authentication

router.post("/signup", authController.signup);
router.post("/login", authController.login);
// Get a cookie that overrides previous cookie
router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:resetToken", authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch("/updatePassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete("/deleteMe", userController.deleteMe);

// Basic CRUD Operations

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
