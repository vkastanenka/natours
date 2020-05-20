// Utilities
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Email = require("../utils/email");
const createJWT = require("../utils/jwtGenerator");

// Error Handling
const catchAsync = require("./../utils/catchAsync");

// Validation
const validateLogin = require("../validation/auth/login");
const validateRegistration = require("../validation/auth/registration");
const validatePasswordReset = require("../validation/auth/passwordReset");
const validatePasswordUpdate = require("../validation/auth/passwordUpdate");

// Models
const User = require("./../models/userModel");

//////////////
// Middleware

// Protecting routes for logged in users => Assigns req.user
exports.protect = catchAsync(async (req, res, next) => {
  const errors = {};

  // 1. Getting token and checking if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (localStorage.jwtToken) {
    token = localStorage.jwtToken;
  }

  // 2. Check if the token exists
  if (!token) {
    errors.noToken = "You are not logged in! Please log in to gain access.";
    return res.status(401).json(errors);
  }

  // 3. Verify the token against its secret
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 4. Find the user with the ID encoded in the JWT
  const currentUser = await User.findById(decoded.id);

  // 5. Check if user still exists
  if (!currentUser) {
    errors.noUser = "The user related to this token no longer exists";
    return res.status(401).json(errors);
  }

  // 6. Check if user changed password after the token was issued
  if (await currentUser.changedPasswordAfter(decoded.iat)) {
    errors.changedPassword =
      "User has recently changed their password! Please log in again!";
    return res.status(401).json(errors);
  }

  // 7. Assign currentUser to req.user to be used in protected route functions
  req.user = currentUser;
  next();
});

// Restricts controller actions to specified roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    const errors = {};

    // 1. If the user's role is not included in the argument, deny access
    if (!roles.includes(req.user.role)) {
      errors.unauthorized = "You do not have permission to perform this action";
      return res.status(403).json(errors);
    }

    next();
  };
};

////////////////
// Public Routes

// @route   POST api/v1/users/register
// @desc    Registers new user
// @access  Public
exports.register = catchAsync(async (req, res, next) => {
  // 1. Validate inputs
  const { errors, isValid } = validateRegistration(req.body);

  // 2. Check if email is already taken
  const userCheck = await User.findOne({ email: req.body.email });
  if (userCheck) errors.registerEmail = "Email already taken";
  if (userCheck || !isValid) return res.status(400).json(errors);

  // 3. Create new user
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // 4. Respond
  res.status(201).json({ status: "success", newUser });

  // 5. Send out a welcome email
  const url = `http://localhost:3000/account/settings`;
  await new Email(newUser, url).sendWelcome();
});

// @route   POST api/v1/users/login
// @desc    Logs in existing user
// @access  Public
exports.login = catchAsync(async (req, res, next) => {
  // 1. Validate inputs
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) return res.status(400).json(errors);

  // 2. Find user
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  // 3. Check is either email or password are incorrect
  if (!user || !(await user.correctPassword(password, user.password))) {
    errors.login = "Email and/or password are incorrect";
    return res.status(400).json(errors);
  }

  // 4. Create the JWT
  const token = createJWT(user);

  // 5. Respond
  res.status(200).json({
    success: "Successfully logged in!",
    token,
    user,
  });
});

// @route   POST api/v1/users/sendPasswordResetToken
// @desc    Send email with a password reset token
// @access  Public
exports.sendPasswordResetToken = catchAsync(async (req, res, next) => {
  const errors = {};

  // 1. Check if user associated to req.body.email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    errors.passwordReset =
      "There is no user associated with that email address";
    return res.status(400).json(errors);
  }

  // 2. Generate the random password reset token
  const resetToken = user.createPasswordResetToken();

  // 3. Save the password reset token expiration time in the user's document (10 min)
  await user.save({ validateBeforeSave: false });

  try {
    // 4. Send an email with a link to a form to reset the user's password
    const resetURL = `http://127.0.0.1:3000/authenticate/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    // 5. Respond
    res.status(200).json({
      success: "Token sent to email!",
    });
  } catch (err) {
    // 6. In case of an error, reset the fields in the user document
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    // 7. Respond
    errors.server =
      "There was a problem sending the email, please try again later.";
    res.status(500).json(errors);
  }
});

// @route   PATCH api/v1/users/resetPassword/:resetToken
// @desc    Resets user password with token from email
// @access  Public
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Validate inputs
  const { errors, isValid } = validatePasswordReset(req.body);

  // 2. Hash the reset token in the URL params in order to compare to passwordResetToken field assigned in the above forgotPassword function
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  // 3. Find the user based on the above hashed token and whether or not that token's expiration has expired yet or not
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 4. Check if either the token is invalid or has expired
  if (!user) errors.invalidToken = "Token is invalid or has expired";
  if (!isValid || !user) return res.status(400).json(errors);

  // 5. If token is valid and has not expired, set the new password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  // 6. Save the user document
  await user.save();

  // 7. Respond
  res.status(200).json({ success: "Password successfully updated!" });
});

///////////////////
// Protected Routes

// @route   PATCH api/v1/users/updatePassword
// @desc    Update current user's password
// @access  Protected
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Validate inputs
  const { errors, isValid } = validatePasswordUpdate(req.body);

  // 1. Find current user's document
  const user = await User.findById(req.user.id).select("+password");

  // 2. Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password)))
    errors.currentPassword = "Current password is incorrect";
  if (
    !(await user.correctPassword(req.body.currentPassword, user.password)) ||
    !isValid
  )
    return res.status(400).json(errors);

  // 3. If so, update user document's password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  await user.save();

  // 4. Respond
  res.status(200).json({ success: "Password successfully updated!" });
});
