// Middleware for handling auth
const { Admin } = require("../db/index");
const { Constants } = require("../utility/Constants");
const jwtPassword = process.env.JWT_KEY;
const jwt = require("jsonwebtoken");

async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ msg: "Unauthorized!" });
  } else {
    try {
      const decoded = jwt.verify(token, jwtPassword);
      req.headers.username = decoded.username;
      next();
    } catch (e) {
      res.status(401).json({ msg: "Unauthorized!" });
    }
  }
}

module.exports = adminMiddleware;
