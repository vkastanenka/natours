// Utilities
const factory = require("./handlerFactory");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Error Handling
const catchAsync = require("./../utils/catchAsync");

// Models
const User = require("../models/userModel");
const Tour = require("./../models/tourModel");
const Booking = require("./../models/bookingModel");

////////////////
// Public Routes

// @route   GET api/v1/users/test
// @desc    Tests users route
// @access  Public
exports.test = (req, res, next) =>
  res.json({ message: "Bookings route secured" });

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
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/account/bookings`,
    cancel_url: `${req.protocol}://${req.get("host")}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [
          `${req.protocol}://${req.get("host")}/static/media/${tour.imageCover}`,
        ],
        amount: tour.price * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
  });

  // 3) Respond
  res.status(200).json({
    status: "success",
    session,
  });
});

const createBookingCheckout = async (sessionData) => {
  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.display_items[0].amount / 100;
  await Booking.create({ tour, user, price });
};

// @route   POST webhook-checkout
// @desc    Checks out a tour
// @access  Protected
exports.webhookCheckout = (req, res, next) => {
  // Obtain stripe signature from headers
  const signature = req.headers["stripe-signature"];
  let event;

  // Create stripe event
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    createBookingCheckout(event.data.object);
  }

  res.status(200).json({ received: true });
};

exports.getCurrentUserBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.params.userId });
  return res.status(200).json({ status: "success", data: bookings });
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
