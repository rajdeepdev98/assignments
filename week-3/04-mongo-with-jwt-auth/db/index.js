const mongoose = require("mongoose");
require("dotenv").config();

// console.log("lol");
const lol = process.env.MONGO_URL;
console.log(lol);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  myCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: String,
  description: String,
  price: Number,
  image: String,
  owner: String,
  published: { type: Boolean, default: false },
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
