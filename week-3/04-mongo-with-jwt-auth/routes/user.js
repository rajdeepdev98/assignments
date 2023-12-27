const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  try {
    const tempuser = await User.findOne({ username: username });
    console.log(tempuser);
    if (tempuser) {
      res
        .status(400)
        .send({ message: "User already there!Sign In to continue!" });
    }
    console.log(process.env.HASH_KEY);
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.HASH_KEY)
    );
    console.log(hashedPassword);

    const user = await User.create({
      username: username,
      password: hashedPassword,
    });
    res.status(201).json({ msg: "User created succesfully" });
  } catch (e) {
    res.status(500).json({ msg: "Error signing up!" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: "All fields are required!" });
  }
  try {
    const user = await User.findOne({ username: username });

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.HASH_KEY)
    );
    console.log(hashedPassword);
    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
      const token = jwt.sign({ username: username }, process.env.JWT_KEY);
      res.status(200).json({ token: token });
    } else {
      res.status(401).json({ msg: "Invalid credentials!" });
    }
  } catch (e) {
    res.status(500).json({ msg: "Error signing in" });
  }
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await Course.find({});
    res.status(200).json({ courses: courses });
  } catch (e) {
    res.status(500).json({ msg: "Error retrieving courses!" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  try {
    const username = req.headers.username;
    const courseId = req.params.courseId;

    const user = await User.findOne({ username: username });
    if (!user) res.status(404).json({ msg: "User not found!" });
    const course = await Course.findById(courseId);
    if (!course) res.status(404).json({ msg: "Course not found!" });
    if (user.myCourses.includes(courseId)) {
      res.status(400).json({ msg: "You already have this course!" });
    }
    user.myCourses.push(courseId);
    user.save();
    res.status(201).json({ msg: "Course purchased successfully!" });
  } catch (e) {
    res.status(500).json({ msg: "Error purchasing course!" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  try {
    const username = req.headers.username;
    console.log(username);
    const user = await User.findOne({ username: username }).populate(
      "myCourses"
    );
    if (!user) res.status(404).json({ msg: "User not found!" });

    res.status(200).json({ purchasedCourses: user.myCourses });
  } catch (e) {
    res.status(500).json({ msg: "Error retrieving purchased courses!" });
  }
});

module.exports = router;
