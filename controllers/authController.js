const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const Booking = require("./../models/bookingModel");
const catchAsync = require("./../utils/catchAsync");
const Email = require("./../utils/email");
const AppError = require("./../utils/appError");

// JSON Web Token is an internet standard for creating JSON-based access tokens that assert some number of claims.
// Creating JWT based off of user id (userDocument._id) => Returns JWT as a string
const signToken = id => {
  // jwt.sign(payload, secretOrPrivateKey, [options, callback]) => Returns the JsonWebToken as a string
  // First arg: Payload => user._id from User document in this case
  // Second arg: Secret key
  // Options: expiresIn => How long it takes for the key to expire
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Creating cookie: An HTTP cookie is a small piece of data sent from a website and stored on the user's computer by the user's web browser while the user is browsing.
const createSendToken = (user, statusCode, res) => {
  // Creating JWT token based of the userDocument._id
  const token = signToken(user._id);
  const cookieOptions = {
    // Expiry date of the cookie in GMT
    expires: new Date(
      // 90 days in my specification
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // Cookie will now only be sent on an encrypted connection (HTTPS) (marks the cookie to be used with HTTPS only: Cannot tamper with it through the browser: Only used in production mode because we cannot test otherwise)
    // secure: true,
    // Cookie cannot be accessed or modified in any way by the browser (Cross site scripting attacks) (http only) => Flags the cookie
    httpOnly: true
  };

  // If node environment is production,
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // Attaching the token to a cookie
  // res.cookie(name, value, [, options]) => Sets cookie name to value
  res.cookie("jwt", token, cookieOptions);

  // Remove encrypted password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user }
  });
};

// Signing up new users (can't obtain admin, lead-guide, or guide roles here)
exports.signup = catchAsync(async (req, res, next) => {
  // Prevents users from assigning an admin role to themselves
  // Creates a new user document based on the req body fields specified below
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  // Sending out email
  const url = `${req.protocol}://${req.get("host")}/me`;
  await new Email(newUser, url).sendWelcome();

  // Creates cookie with JWT based off new userDocument._id
  createSendToken(newUser, 201, res);
});

// Logging a user in => Sign a JSON web token and send it back to the client
exports.login = catchAsync(async (req, res, next) => {
  // Requires email and password to log in
  const { email, password } = req.body;

  // 1. Check is email and password exist => If not, new error is generated
  if (!email || !password) {
    return next(
      new AppError("Please provide both an email and password!", 400) // 400: Bad request
    );
  }

  // 2. Check if user exists && password is correct
  // Output will not contain the password but DO need the password in order to check if it is correct => Explicitly select it
  const user = await User.findOne({ email }).select("+password");

  // If user does not exist, will not even run the code to check the password
  // correctPassword is middleware that checks the inputted password against the encrypted password in the DB
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  // 3. If everything is ok, send the cookie with the JWT to the client
  createSendToken(user, 200, res);
});

// Logging out a user
exports.logout = (req, res) => {
  // Sends a new cookie that overwrites the original with the JWT
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 5 * 1000), // 5 seconds from now
    httpOnly: true
  });
  res.status(200).json({ status: "success" });
};

// Protecting routes ONLY for logged in users
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

// Only for rendered pages, no errors! PUG RENDERING : TODO
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1. Verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2. Check if user still exists => Encoded JWT with user ID
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 4. Check if user changed password after the token was issued (.iat => issued at)
      if (await currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // All checks have been confirmed, there is a logged in user => Will now be accessible to our templates
      // Pug templates will have access to any variables in res.locals
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      // No logged in user, go to next middleware
      return next();
    }
  }
  next();
};

// Restricting certain routes based on roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide'] => If the user does not have a defined role in the array, return an error 403 (Forbidden)
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

// Send email with a password reset link TODO
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on POSTed email => Find userDocument
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new AppError("There is no user with that email address...", 404)
    );
  }

  // 2. Generate the random reset token
  const resetToken = user.createPasswordResetToken();

  // We modified the document, but now need to save it => Option will deactivate all the validators that we specified in our schema
  await user.save({ validateBeforeSave: false });

  // const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`;

  try {
    // 3. Send it to the user's email
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;
    // await sendEmail({
    //   email: user.email,
    //   subject: "Your password reset token (valid for 10 minutes)",
    //   message
    // });
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!"
    });
  } catch (err) {
    // In case of an error, make sure to delete these fields
    user.createPasswordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

// Link from forgotPassword TODO
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2. If token has not expired, and there is a user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired.", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  // Don't have to turn off validators since we want to validate
  await user.save();

  // 3. Update changedPasswordAt property for the user

  // 4. Log the user in, send JWT
  createSendToken(user, 200, res);
});

// Updating the password normally TODO
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2. Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3. If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4. Log user in, send JWT
  createSendToken(user, 200, res);
});

// User can only write a review for a tour they have booked
exports.restrictReviewsToBookings = catchAsync(async (req, res, next) => {
  // Find all the bookings that a user has (user property is in bookings)
  const bookings = await Booking.find({ user: req.user.id });

  // If the user has no bookings, throw an error
  if (!bookings) {
    return next(new AppError("Please book the tour to write a review!", 401));
  }

  // The tour ID for which they are writing a review for
  const tourToReviewID = req.body.tour;
  
  // Checking if the ID they are reviewing for is in their bookings => If ID not found in their bookings, throw an error
  let filteredBookings = bookings.filter(tour => tour.tour._id == tourToReviewID);

  if (filteredBookings.length < 1) {
    return next(new AppError("Please book the tour to write a review!", 401));
  }

  next();
});
