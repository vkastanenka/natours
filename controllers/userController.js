const User = require("./../models/userModel");
const sharp = require("sharp");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");
const multer = require("multer");

// Storage: Complete definition of how we want to store our files
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // First argument is error if there is one, second is the destination
//     cb(null, 'public/img/users')
//   },
//   filename: (req, file, cb) => {
//     // Giving our files some unique filenames
//     // user-userID-timestamp: user-12345654356-124565356.jpeg

//     // Extension
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
//   }
// });

// MULTER: TODO

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
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single("photo"); // Creates req.file

// Image processing
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // Need to define filename property to save to database
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  // When doing image processing after saving the file, better to save to memory than to disk => Image will be stored as a buffer, available at req.file.buffer
  // Below will return a promise: Should await to prevent blocking the event loop: Don't want to call next without waiting for this operation to finish
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

// Creates a filtered object that has filtered key value pairs from the passed in object: Only keys in the allowedFields array will be returned in the new object
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  // For each key in the passed in object, if array of allowedFields includes the element, create a key value pair
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Middleware for getUser: Sets the id parameter so factory.getOne can find the document through Model.findById(req.params.id)
exports.getMe = (req, res, next) => {
  // req.user comes from the protect middleware in the authController
  req.params.id = req.user.id;
  next();
};

// Allows user to update their personal information (name and email)
exports.updateMe = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  // console.log(req.body);

  // 1. Create error if user POSTs password data in req.body
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updatePassword",
        400
      )
    );
  }

  // 2. Filter the user's request for only allowed fields
  const filteredBody = filterObj(req.body, "name", "email");

  // Adding uploaded photo to filteredBody ***** upload.single create req.file from multer
  if (req.file) filteredBody.photo = req.file.filename;

  // 3. Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: "success",
    data: { user: updatedUser }
  });
});

// Sets a users active state to false
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  // 20: No content
  res.status(204).json({
    status: "success",
    data: null
  });
});

// Undefined route to create a user: Better for signup (redirect to signup)
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead"
  });
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);