const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");
// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  let username = req.headers.username;
  let password = req.headers.password;
  const admin = await Admin.findOne({ username: username, password: password });
  if (!admin) {
    const newAdmin = await Admin.create({
      username: username,
      password: password,
    });
    // if(!newAdmin){
    //     res.s
    // }
    res.status(201).json({ msg: "Admin created successfully!" });
  } else {
    res.status(400).json({ msg: "Username already there!" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  // console.log("l2");

  let newCourse = req.body;
  newCourse.admin_id = req.headers.admin_id;
  try {
    const course = await Course.create(newCourse);
    res.status(201).json({ courseId: course["_id"].toString() });
  } catch (e) {
    res.status(500).json({ msg: "Course couldnt be created" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic

  const adminId = req.headers.admin_id;
  console.log(adminId);
  try {
    const courses = await Course.find({ admin_id: adminId });

    res.status(200).json({ courses: courses });
  } catch (e) {
    res.status(500).json({ msg: "Courses couldnt be found" });
  }
});

module.exports = router;
