const { Router } = require("express");
const { Admin, Course } = require("../db/index");
const adminMiddleware = require("../middleware/admin");
const jwt = require("jsonwebtoken");
const router = Router();
const jwtPassword = process.env.JWT_KEY;

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  let username = req.headers.username;
  let password = req.headers.password;
  const admin = await Admin.findOne({ username: username, password: password });
  console.log(jwtPassword);
  console.log(process.env.MONGO_URL);
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

router.post("/signin", async (req, res) => {
  // Implement admin signup logic

  let username = req.headers.username;
  let password = req.headers.password;
  console.log(process.env.JWT_KEY);
  console.log(process.env.MONGO_URL);
  try {
    const admin = await Admin.findOne({
      username: username,
      password: password,
    });
    if (!admin) {
      res.status(403).json({ msg: "Invalid username and password!" });
    } else {
      // const adminId=admin._id;
      const token = jwt.sign({ username: username }, jwtPassword);
      res.status(200).json({ token: token });
    }
  } catch (e) {
    res.status(500).json({ msg: "Could not sign you in!" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const username = req.headers.username;
  const { title, description, price, imageLink } = req.body;
  if (!title || !description || !price || !imageLink) {
    return res.status(400).send({ message: "All fields are required!" });
  }
  try {
    const admin = await Admin.findOne({ username: username });

    const course = await Course.create({
      title: title,
      description: description,
      price: price,
      imageLink: imageLink,
      published: true,
      owner: admin.username,
    });
    admin.courses.push(course._id);
    await admin.save();
    res
      .status(201)
      .json({ msg: "Course created successfully!", courseId: course._id });
  } catch (e) {
    res.status(500).json({ msg: "Error creating course!" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const username = req.headers.username;
  try {
    const admin = await Admin.findOne({ username: username }).populate(
      "courses"
    );
    // await admin.populate("courses");
    res.status(200).json({ courses: admin.courses });
  } catch (e) {
    res.json(500).json({ msg: "Error retrieving the courses!" });
  }
});

module.exports = router;
