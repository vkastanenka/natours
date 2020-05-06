// Utilities
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Email = require("../utils/email");
const createJWT = require('../utils/jwtGenerator');

// Error Handling
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

// Models
const User = require("./../models/userModel");

//////////////
// Middleware

// Protecting routes for logged in users => Assigns req.user
exports.protect = catchAsync(async (req, res, next) => {
  // 1. Getting token and checking if it's there
  let token;
  if (
    // If there is Bearer Token authorization header, token will be the JWT after splitting Bearer JWT [1]
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // If there is a cookie named JWT
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // If no token was found when trying to access this route, send an error
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access...", 401)
    );
  }

  // 2. Verification step for token => We verify if someone manipulated the data, or if the token has already expired
  // Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will throw the error.
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exists => Encoded JWT with user ID
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user related to this token no longer exists!", 401)
    );
  }

  // 4. Check if user changed password after the token was issued (.iat => issued at)
  if (await currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "User has recently changed their password! Please log in again!",
        401
      )
    );
  }

  // All checks have been confirmed, can now grant access to a protected route
  req.user = currentUser;
  res.locals.user = currentUser;
  // console.log(req.user);
  next();
});

// Restricts controller actions to specified roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

////////////////
// Public Routes

// @route   POST api/v1/users/register TODO: Email
// @desc    Registers new user
// @access  Public
exports.register = catchAsync(async (req, res, next) => {
  // 1. Create new user document
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  // 2. Send welcome email TODO:
  // const url = `${req.protocol}://${req.get("host")}/me`;
  // await new Email(newUser, url).sendWelcome();

  // 3. Respond
  res.status(201).json({ status: 'success', newUser });
});

// @route   POST api/v1/users/login
// @desc    Logs in existing user
// @access  Public
exports.login = catchAsync(async (req, res, next) => {
  // 1. Obtain email and password from the request body
  const { email, password } = req.body;

  // 2. Check if user provided both email and password
  if (!email || !password) {
    return next(
      new AppError("Please provide both an email and password", 400)
    );
  }

  // 3. Find the user document
  const user = await User.findOne({ email }).select("+password");

  // 4. Check if the user exists and the password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 5. Create the JWT
  const token = createJWT(user);

  // 6. Respond
  res.status(200).json({ status: 'success', token});
});

// @route   POST api/v1/users/sendPasswordResetToken
// @desc    Send email with a password reset token
// @access  Public
exports.sendPasswordResetToken = catchAsync(async (req, res, next) => {
  // 1. Find user document based on email
  const user = await User.findOne({ email: req.body.email });

  // 2. Check if the user document exists
  if (!user) {
    return next(
      new AppError("There is no user with that email address...", 404)
    );
  }

  // 3. Generate the random password reset token
  const resetToken = user.createPasswordResetToken();

  // 4. Save the password reset token expiration time in the user's document (10 min)
  await user.save({ validateBeforeSave: false });

  try {
    // 5. Send an email with a link to a form to reset the user's password
    const resetURL = `http://127.0.0.1:3000/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    // 6. Respond
    res.status(200).json({
      status: "success",
      message: "Token sent to email!"
    });
  } catch (err) {
    // 7. In case of an error, reset the fields in the user document
    user.createPasswordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    // 8. Respond with an error
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

// @route   PATCH api/v1/users/resetPassword/:resetToken
// @desc    Resets user password with token from email
// @access  Public
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Decode the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  // 2. Find a user based on the token and if it hasn't yet exited
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2. If the token is not valid or has expired, notify with an error
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  // 3. Set the password fields in the user document
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  // 4. Reset password token fields in the user document
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  // 5. Save the user document
  await user.save();

  // 6. Respond
  res.status(200).json({ status: 'success' })
});

///////////////////
// Protected Routes

// @route   PATCH api/v1/users/updatePassword
// @desc    Update current user's password
// @access  Protected
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Find current user's document
  const user = await User.findById(req.user.id).select("+password");

  // 2. Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3. If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4. Respond
  res.status(200).json({ status: 'success' });
});