const mongoose = require("mongoose");

// Add a date to the booking schema

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
    required: [true, "Booking must belong to a Tour!"]
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a User!"]
  },
  price: {
    type: Number,
    required: [true, "Booking must have a price."]
  },
  date: {
    type: Date,
    required: [true, 'Booking must have a date.']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  }
});

// Populate tour and user whenever we make a query => Query middleware
bookingSchema.pre(/^find/, function(next) {
  this.populate("user").populate({
    path: "tour",
    select: "name"
  });
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
