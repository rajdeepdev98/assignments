// Middleware for handling auth
const { Admin } = require("../db/index");
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  let username = req.headers.username;
  let password = req.headers.password;

  const admin = await Admin.findOne({ username: username, password: password });
  console.log(admin);
  console.log(admin == null);
  if (admin == null) {
    res.status(403).json({ msg: "Invalid username and password" });
  } else {
    console.log("Admin authenticated successfully");
    console.log(admin["_id"]);
    req.headers.admin_id = admin._id.toString();
    next();
  }
}

module.exports = adminMiddleware;
