const express = require("express"),
  router = express.Router(),
  Course = require("../model/course.js"),
  User = require("../model/user.js");

router.get("/", (req, res) => {
  const usr_id = req.user.user;
  let personalCourseData = [];

  User.findOne({ username: usr_id })
    .populate("courses")
    .exec((err, post) => {
      if (err) {
        console.log("[DASHBOARD_FIND_USER]: " + Object.keys(err));
        res.status(400).json({
          errorMessage: "No User Found!",
          status: false,
          title: "No User Found!",
        });
      } else {
        personalCourseData = post.courses;
        if (personalCourseData.length === 0) {
          console.log("[DASHBOARD] 1: Empty! Add some courses!");
          res.status(400).json({
            errorMessage: "Empty! Add some courses!",
            status: false,
            title: "Empty! Add some courses!",
          });
        } else {
          res.status(200).send({ courses: personalCourseData });
        }
      }
    });
});

router.post("/add", async (req, res) => {
  const usr_id = req.user.user;
  const courseData = req.body.course;
  const doc = await Course.findOneAndUpdate(
    courseData,
    courseData,
    { new: true, upsert: true },
    (err, data) => {
      if (err) {
        console.log("[DASHBOARD_ADD_COURSE]: " + Object.keys(err));
        res.status(400).json({
          errorMessage: err,
          status: false,
          title: "Mistakes in Course Storing.",
        });
      }
    }
  );
  await User.findOneAndUpdate(
    { username: usr_id },
    { $addToSet: { courses: doc._id } },
    (err, data) => {
      if (err) {
        console.log("[DASHBOARD] 2: " + Object.keys(err));
        res.status(400).json({
          errorMessage: err,
          status: false,
          title: "Mistakes in User Storing.",
        });
      } else {
        res.status(200).json({
          status: true,
          title: "Course Added Successfully.",
        });
      }
    }
  );
});

router.post("/delete", async (req, res) => {
  const usr_id = req.user.user;
  console.log(req.body.course.registrationNumber);
  const doc = await Course.findOne({
    registrationNumber: req.body.course.registrationNumber,
  });
  console.log(doc._id);
  await User.update(
    { username: usr_id },
    { $pull: { courses: { _id: doc._id } } },
    { new: true, upsert: true },
    (err, data) => {
      if (err) {
        console.log("[DASHBOARD_DELETE_COURSE]: " + Object.keys(err));
        res.status(400).json({
          errorMessage: "Delete Failed.",
          status: false,
          title: "Delete Failed.",
        });
        // console.log(err);
      } else {
        res.status(200).json({
          status: true,
          title: "Course Deleted Successfully",
        });
      }
    }
  );
});

module.exports = router;
