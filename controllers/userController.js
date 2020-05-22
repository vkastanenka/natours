// Utilities
const sharp = require("sharp");
const multer = require("multer");
const Email = require("../utils/email");
const factory = require("./handlerFactory");
const filterObj = require("../utils/filterObj");
const createJWT = require("../utils/jwtGenerator");

// Error Handling
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

// Validation
const validateUserUpdate = require("../validation/auth/userUpdate");
const validateContactForm = require("../validation/contact/contact");

// Models
const User = require("../models/userModel");
const Review = require("../models/reviewModel");
const Booking = require("../models/bookingModel");

/////////////
// Middleware

// Store the file in memory as a Buffer object
const multerStorage = multer.memoryStorage();

// Test if the file is an image
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images...", 400), false);
  }
};

// Configuring multer upload
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Accept a single file with the name 'photo' => File stored in req.file
exports.uploadUserPhoto = upload.single("photo");

// Image processing (resizing, formatting, quality, and file location)
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // Need to define filename property to save to database
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  // Processing the uploaded image
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`client/src/assets/images/users/${req.file.filename}`);

  next();
});

// @route   GET api/v1/users/currentUser
// @desc    Get current user
// @access  Protected
exports.getCurrentUser = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

////////////////
// Public Routes

// @route   GET api/v1/users/test
// @desc    Tests users route
// @access  Public
exports.test = (req, res, next) => res.json({ message: "Users route secured" });

// @route   POST api/v1/users/sendContactEmail
// @desc    Sends admin email from contact form on home page
// @access  Public
exports.sendContactEmail = catchAsync(async (req, res, next) => {
  // 1. Validate inputs
  const { errors, isValid } = validateContactForm(req.body);
  if (!isValid) return res.status(400).json(errors);

  // 2. Send email
  await new Email().sendContact(req.body);

  // 3. Respond
  res.status(200).json({ status: "success" });
});

///////////////////
// Protected Routes

// @route   PATCH api/v1/users/updateCurrentUser
// @desc    Update current user's name, email, and pfp
// @access  Protected
exports.updateCurrentUser = catchAsync(async (req, res, next) => {
  // 1. Validate inputs
  const { errors, isValid } = validateUserUpdate(req.body);
  if (!isValid) return res.status(400).json(errors);

  // 2. Respond with an error if the user tries to update their password
  if (req.body.password || req.body.passwordConfirm) {
    errors.noPassword =
      'This route is not for password updates. Please use /updatePassword"';
    return res.status(400).json(errors);
  }

  // 3. Filter the user's request for only name and email fields
  const filteredBody = filterObj(req.body, "name", "email");

  // 4. If photo, add uploaded photo to filteredBody
  if (req.file) filteredBody.photo = req.file.filename;

  // 5. Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // 6. Create the JWT
  const token = createJWT(updatedUser);

  // 7. Respond
  res.status(200).json({
    status: "success",
    user: updatedUser,
    token,
  });
});

////////////////////
// Restricted Routes

// @route   GET api/v1/users
// @desc    Get all users
// @access  Restricted
exports.getAllUsers = factory.getAll(User);

// @route   POST api/v1/users
// @desc    Dummy route => Users are created through /register
// @access  Restricted
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /register instead",
  });
};

// @route   GET api/v1/users/:id
// @desc    Get user by id
// @access  Restricted
exports.getUser = factory.getOne(User);

// @route   DELETE api/v1/users/:id
// @desc    Delete user, their reviews, and their bookings by id
// @access  Restricted
exports.deleteUser = catchAsync(async (req, res, next) => {
  // 1. Find document by id
  const user = await User.findById(req.params.id);
  const reviews = await Review.find({ user: req.params.id });
  const bookings = await Booking.find({ user: req.params.id });

  // 2. If no document, respond with an error
  query404(res, user, "No user found with that ID");

  // 3. Delete documents
  // user.deleteOne();
  if (reviews) await Review.deleteMany({ user: req.params.id });
  if (bookings) await Booking.deleteMany({ user: req.params.id });

  // 4. Respond
  res.status(204).json({ status: "success" });
});

// @route   GET api/v1/users/guides
// @desc    Get all guides and lead guides
// @access  Restricted
exports.getGuides = catchAsync(async (req, res, next) => {
  const guides = await User.find({ role: { $in: ["guide", "lead-guide"] } });
  res.status(200).json({ status: "succes", data: guides });
});
