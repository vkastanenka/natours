// Utilities
const sharp = require("sharp");
const multer = require("multer");
const factory = require("./handlerFactory");

// Error Handling
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

// Models
const User = require("./../models/userModel");

///////////////
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

// Creates a filtered object that has filtered key value pairs from the passed in object
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  // For each key in the passed in object, if array of allowedFields includes the element, create a key value pair
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

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
exports.test = (req, res, next) => res.json({ msg: "Users Works" });

///////////////////
// Protected Routes

// @route   PATCH api/v1/users/updateCurrentUser
// @desc    Update current user's name, email, and pfp
// @access  Protected
exports.updateCurrentUser = catchAsync(async (req, res, next) => {
  // 1. Respond with an error if the user tries to update their password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updatePassword",
        400
      )
    );
  }

  // 2. Filter the user's request for only name and email fields
  const filteredBody = filterObj(req.body, "name", "email");

  // 3. If photo, add uploaded photo to filteredBody
  if (req.file) filteredBody.photo = req.file.filename;

  // 4. Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // 5. Respond
  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});

// @route   DELETE api/v1/users/deleteCurrentUser
// @desc    Deactivate current user's account
// @access  Protected
exports.deleteCurrentUser = catchAsync(async (req, res, next) => {
  // 1. Find the current user's document and set it's active field to false
  await User.findByIdAndUpdate(req.user.id, { active: false });

  // 2. Respond
  res.status(204).json({ status: "success" });
});

// @route   GET api/v1/users
// @desc    Get all users
// @access  Protected
exports.getAllUsers = factory.getAll(User);

// @route   POST api/v1/users
// @desc    Dummy route => Users are created through /register
// @access  Protected
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /register instead",
  });
};

// @route   GET api/v1/users/:id
// @desc    Get user by id
// @access  Protected
exports.getUser = factory.getOne(User);

// TODO:
exports.deleteUser = factory.deleteOne(User);
