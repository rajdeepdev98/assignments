const { User } = require("../db/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();
async function userMiddleware(req, res, next) {
  // Implement user auth logic
  //   console.log(req.body);
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const token = req?.headers?.authorization?.split(" ")[1];
  console.log(req.headers);
  console.log(token);
  console.log(req.headers.authorization);

  if (!token) {
    res.status(401).json({ msg: "Unauthorized!" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.headers.username = decoded.username;
      next();
    } catch (e) {
      res.status(401).json({ msg: "Unauthorized!" });
    }
  }
}

module.exports = userMiddleware;
