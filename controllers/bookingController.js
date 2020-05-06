// Utilities
const factory = require("./handlerFactory");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Error Handling
const catchAsync = require("./../utils/catchAsync");

// Models
const Tour = require("./../models/tourModel");
const Booking = require("./../models/bookingModel");

////////////////
// Public Routes

// @route   GET api/v1/users/test
// @desc    Tests users route
// @access  Public
exports.test = (req, res, next) => res.json({ message: "Bookings route secured" });

///////////////////
// Protected Routes

// @route   GET api/v1/bookings/checkout-session/:tourId
// @desc    Creates checkout section to book a tour
// @access  Protected
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
      req.params.tourId
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ]
  });

  // 3) Respond
  res.status(200).json({
    status: 'success',
    session
  });
});

////////////////////
// Restricted Routes

// @route   GET api/v1/bookings
// @desc    Get all bookings
// @access  Restricted
exports.getAllBookings = factory.getAll(Booking);

// @route   POST api/v1/bookings
// @desc    Create a booking
// @access  Restricted
exports.createBooking = factory.createOne(Booking);

// @route   GET api/v1/bookings/:id
// @desc    Get booking by id
// @access  Restricted
exports.getBooking = factory.getOne(Booking);

// @route   PATCH api/v1/bookings/:id
// @desc    Update booking by id
// @access  Restricted
exports.updateBooking = factory.updateOne(Booking);

// @route   DELETE api/v1/bookings/:id
// @desc    Delete booking by id
// @access  Restricted
exports.deleteBooking = factory.deleteOne(Booking);