const path = require('path');
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const app = express();

// Set PUG as template engine
app.set('view engine', 'pug');
// Don't always know whether a path that we receive from somewhere already has a slash or not => Prevents bug
app.set('views', path.join(__dirname, './views'));

// Middleware

// Serving static files // TODO: CHANGE
app.use(express.static(path.join(__dirname, 'public')));

// Sets security headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Implementing rate limiting: 100 requests every hour
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!"
});

// Will now have X-RateLimit-Limit and X-RateLimit-Remaining headers
app.use("/api", limiter);

// Body parser, reading data from body into req.body => Body larger than 10kb will not be accepted
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL injection => Removes mongo operators
app.use(mongoSanitize());

// Data sanitization against XSS => Clean user input from malicious HTML input
app.use(xss());

// Preventing HTTP parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price"
    ]
  })
);

// Compression of text sent to clients.
app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Serving static assets
app.use(express.static('client/build'));

// Routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

// Handling Unhandled Routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;