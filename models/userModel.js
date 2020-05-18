const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const AppError = require('../utils/appError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords must match",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    // select: false,
  },
});

//////////////////////
// Document Middleware

// Pre-Save Password Encrpytion
userSchema.pre("save", async function (next) {
  // 1. If password isn't modified, continue
  if (!this.isModified("password")) return next();

  // 2. If password IS modified, encrypt it
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Pre-Save Recording of Password Change Time
userSchema.pre("save", function (next) {
  // 1. If the document is new or password hasn't been modified, return
  if (!this.isModified("password") || this.isNew) return next();

  // 2. Record the time the password was changed at
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Custom error handling for unique emails
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new AppError('Email already registered'));
  } else {
    next(error);
  }
});

///////////////////
// Query Middleware

// Pre-find filter for user's who have their active state set to false
// userSchema.pre(/^find/, function (next) {
//   // Find users who don't have their active state set to false
//   this.find({ active: { $ne: false } });
//   next();
// });

////////////////////
// Instance Methods

// bcrypt Password Comparison => Returns true or false based on candidate and user passwords
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// JWT Timestamp Validation Against passwordChangedAt Field
userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    // 1. Make sure the JWT is not expired
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  // 2. False means password hasn't been changed
  return false;
};

// Creating Password Reset Token
userSchema.methods.createPasswordResetToken = function () {
  // 1. Create token and assign it to the user document
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // 2. 10 minute expiration
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
