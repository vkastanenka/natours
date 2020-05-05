const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"]
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail]
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "Passwords must match"
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

// Password encryption will happen between the moment where it's actually persisted to the database
userSchema.pre("save", async function(next) {
  // Do not want to re-encrpt password if not being updated
  // .isModified() is a method we have on all documents which we can use is a certain field has been modified
  // If password has NOT been modified, return from this function
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  // Do not persist passwordConfirm to the database (only needed for above validation)
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function(next) {
  // If the document is new or password hsan't been modified, simply return
  if (!this.isModified("password") || this.isNew) return next();

  // Sometimes, saving to the database is a bit slower than issuing the JSON web token => Makes it so that the changed password timestamp is sometimes set a bit after the JWT has been created => User won't be able to log in using the new token (fix by subtracting 1 second)
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  // this points to the current query => Will only show users whose active state is set to true
  this.find({ active: { $ne: false } });
  next();
});

// Instance method => Will be available on all documents of a certain collection
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    // Make both timestamps equivalent formats
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp; // 100 < 200: true
  }

  // False means password hasn't been changed
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  // Password reset token should be a random string => Does not need to be as cryptographically strong as the password hash
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Will expire in 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
