const jwt = require("jsonwebtoken");

// Sign and create the JWT token
module.exports = createJWT = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};