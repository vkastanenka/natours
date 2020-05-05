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

// const signToken = id => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN
//   });
// };

// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user._id);
//   const cookieOptions = {
//     // 90 day expiration date
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),
      
//     httpOnly: true
//   };

//   // If node environment is production,
//   if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

//   // Attaching the token to a cookie
//   // res.cookie(name, value, [, options]) => Sets cookie name to value
//   res.cookie("jwt", token, cookieOptions);

//   // Remove encrypted password from output
//   user.password = undefined;

//   res.status(statusCode).json({
//     status: "success",
//     token,
//     data: { user }
//   });
// };