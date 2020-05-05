const express = require("express");
const authController = require("./../controllers/authController");
// const userController = require("./../controllers/userController");
// const reviewRouter = require("./../routes/reviewRoutes");
// const bookingRouter = require("./../routes/bookingRoutes");

const router = express.Router();

/////////////////
// Public Routes

// @route   GET api/v1/users
// @desc    Tests users route
// @access  Public
// router.get("/test", userController.test);

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
// router.get(
//   "/currentUser",
//   userController.getCurrentUser,
//   userController.getUser
// );

// @route   PATCH api/v1/users/updateCurrentUser
// @desc    Update current user's name, email, and pfp
// @access  Protected
// router.patch(
//   "/updateCurrentUser",
//   userController.uploadUserPhoto,
//   userController.resizeUserPhoto,
//   authController.updateCurrentUser
// );

// @route   PATCH api/v1/users/updatePassword
// @desc    Update current user's password
// @access  Protected
router.patch("/updatePassword", authController.updatePassword);

// @route   DELETE api/v1/users/deleteCurrentUser
// @desc    Deactivate current user's account
// @access  Protected
// router.delete("/deleteCurrentUser", userController.deleteCurrentUser);

// @route   GET api/v1/users
// @desc    Get all users
// @access  Protected
// router.get('/', userController.getAllUsers);

// @route   POST api/v1/users
// @desc    Dummy route
// @access  Protected
// router.post('/', userController.createUser);

// @route   GET api/v1/users/:id
// @desc    Get user by id
// @access  Protected
// router.get('/:id', userController.getUser);

// @route   PATCH api/v1/users/:id
// @desc    Update user by id
// @access  Protected
// router.patch('/:id', userController.updateUser);

// @route   DELETE api/v1/users/:id
// @desc    Delete user by id
// @access  Protected
// router.delete('/:id', userController.deleteUser);

// router.use("/:userId/reviews", reviewRouter);
// router.use("/:userId/bookings", bookingRouter);
// User Authentication
// router.post("/signup", authController.signup);
// router.post("/login", authController.login);
// Get a cookie that overrides previous cookie
// router.get("/logout", authController.logout);
// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:resetToken", authController.resetPassword);

// router.get("/me", userController.getMe, userController.getUser);
// router.patch(
//   "/updateMe",
//   userController.uploadUserPhoto,
//   userController.resizeUserPhoto,
//   userController.updateMe
// );
// router.delete("/deleteMe", userController.deleteMe);

// Basic CRUD Operations

// router
//   .route("/")
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// router
//   .route("/:id")
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
