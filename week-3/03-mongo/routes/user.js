const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, User } = require("../db/index");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  let username = req.headers.username;
  let password = req.headers.password;
  const user = await User.findOne({ username: username, password: password });
  if (!user) {
    const newUser = await User.create({
      username: username,
      password: password,
      courses: [],
    });
    // if(!newAdmin){
    //     res.s
    // }
    res.status(201).json(newUser);
  } else {
    res.status(400).json({ msg: "Username already there!" });
  }
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  const userId = req.headers.user_id;
  console.log(`userId is ${userId}`);
  try {
    const courses = Course.find({});
    res.status(200).json({ courses: courses });
  } catch (e) {
    res.status(500).json({ msg: "Error retrieving courses" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const userId = req.headers.user_id;
  const courseId = req.params.courseId;
  try {
    const user = await User.findById(userId);
    user.courses.push(courseId);

    user.save();
    res.status(201).json({ msg: "Course purchased successfully" });
  } catch (e) {
    res.status(500).json({ msg: "error!" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const userId = req.headers.user_id;
  try {
    const user = await User.findById(userId);

    const courses = await Course.find({ _id: { $in: user.courses } });

    res.status(200).json({ purchasedCourses: courses });
  } catch (e) {
    res.status(500).json({ msg: "error!" });
  }
});

module.exports = router;
