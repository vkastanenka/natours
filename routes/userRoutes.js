const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

/////////////////
// Public Routes

// @route   GET api/v1/users
// @desc    Tests users route
// @access  Public
router.get("/test", userController.test);

// @route   POST api/v1/users/sendContactEmail
// @desc    Sends admin email from contact form on home page
// @access  Public
router.post("/sendContactEmail", userController.sendContactEmail);

// @route   POST api/v1/users/register
// @desc    Registers new user
// @access  Public
router.post("/register", authController.register);

// @route   POST api/v1/users/login
// @desc    Logs in existing user
// @access  Public
router.post("/login", authController.login);

// @route   POST api/v1/users/sendPasswordResetToken
// @desc    Send email with a password reset token
// @access  Public
router.post("/sendPasswordResetToken", authController.sendPasswordResetToken);

// @route   PATCH api/v1/users/resetPassword/:resetToken
// @desc    Resets user password with token from email
// @access  Public
router.patch("/resetPassword/:resetToken", authController.resetPassword);

///////////////////
// Protected Routes

router.use(authController.protect);

// @route   GET api/v1/users/currentUser
// @desc    Get current user
// @access  Protected
router.get(
  "/currentUser",
  userController.getCurrentUser,
  userController.getUser
);

// @route   PATCH api/v1/users/updateCurrentUser
// @desc    Update current user's name, email, and pfp
// @access  Protected
router.patch(
  "/updateCurrentUser",
  // userController.uploadUserPhoto,
  // userController.resizeUserPhoto,
  userController.updateCurrentUser
);

// @route   PATCH api/v1/users/updatePassword
// @desc    Update current user's password
// @access  Protected
router.patch("/updatePassword", authController.updatePassword);

////////////////////
// Restricted Routes

router.use(authController.restrictTo("admin", "lead-guide"));

// @route   GET api/v1/users
// @desc    Get all users
// @access  Restricted
router.get("/", userController.getAllUsers);

// @route   GET api/v1/users/:id
// @desc    Get user by id
// @access  Restricted
router.get("/:id", userController.getUser);

// @route   POST api/v1/users
// @desc    Dummy route => Users are created through /register
// @access  Restricted
router.post("/", userController.createUser);

// @route   DELETE api/v1/users/:id
// @desc    Delete user, their reviews, and their bookings by id
// @access  Restricted
router.delete("/:id", userController.deleteUser);

// @route   GET api/v1/users/guides
// @desc    Get all guides and lead guides
// @access  Restricted
router.get("/users/guides", userController.getGuides);

module.exports = router;
