const { User } = require("../db/index");
async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  let username = req.headers.username;

  let password = req.headers.password;
  console.log("hello");
  const user = await User.findOne({ username: username, password: password });
  if (user == null) {
    res.status(403).json({ msg: "Invalid username and password" });
  } else {
    console.log("User authentication successful");
    req.headers.user_id = user["_id"].toString();
    console.log(req.headers);
    console.log(user["_id"].toString());
    next();
  }
}

module.exports = userMiddleware;
