const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Course = require("../models/User");
const Profile = require("../models/Profile");
const Course = require("../models/Course");
const Dashboard = require("../models/Dashboard");
const uploader = require("../middlewares/uploader");
const slugGenerator = require("../functions/slug-generator");
const validator = require("../middlewares/validation");
const courseValidations = require("../services/repo/course-validator");

//Usercontroller functions

const {
  Usercontroller,
  Logincontroller,
  Authcontroller,
  listUser,
  CheckRole,
} = require("../controllers/user");
const { DOMAIN } = require("../config");

//Users Registration route
router.post("/register", async (req, res) => {
  await Usercontroller(req.body, "user", res);
});

//Users Login route
router.post("/login", async (req, res) => {
  await Logincontroller(req.body, "user", res);
});

//Get Profile route
router.get(
  "/authenticate",
  Authcontroller,
  CheckRole(["user"]),
  async (req, res) => {
    return res.json(listUser(req.user));
  }
);

/**
 * @description To create profile of the authenticated user
 * @api /api/user/create-profile
 * @access Private
 * @type POST <multipart-form> request
 */

router.post(
  "/create-profile",
  Authcontroller,
  uploader.single("avatar"),
  async (req, res) => {
    try {
      let { body, file, user } = req;
      let path = DOMAIN + file.path.split("uploads")[1];
      let profile = new Profile({
        social: body,
        account: user._id,
        avatar: path,
      });
      //console.log('USER_PROFILE', profile)
      await profile.save();
      return res.status(201).json({
        mssg: "Your profile has been created.",
        success: true,
      });
    } catch {
      //console.log(err)
      return res.status(400).json({
        mssg: "We are not able to create your profile.",
        success: false,
      });
    }
  }
);

/**
 * @description To get the authenticated user's profile
 * @api /api/user/my-profile
 * @access Private
 * @type GET request
 */

router.get("/my-profile", Authcontroller, async (req, res) => {
  try {
    let profile = await Profile.findOne({
      account: user._id.req.user,
    }).populate("account", "name email username");
    if (!profile) {
      return res.status(404).json({
        success: false,
        mssg: "Your profile does not exist.",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      mssg: "Unable to get your profile.",
    });
  }
});

/**
 * @description To update the authenticated user's profile
 * @api /api/user/update-profile
 * @access Private
 * @type PUT <multipart-form> request
 */

router.put(
  "/update-profile",
  Authcontroller,
  uploader.single("avatar"),
  async (req, res) => {
    try {
      let { body, file, user } = req;
      let path = DOMAIN + file.path.split("uploads")[1];
      let profile = await Profile.findOneAndUpdate(
        { account: user._id },
        { social: body, avatar: path },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        mssg: "Your profile has been updated.",
        profile,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        mssg: "Unable to get your profile.",
      });
    }
  }
);

/**
 * @description To get the user's profile with the username
 * @api /api/user/profile-user
 * @access Public
 * @type GET request
 */

router.get("/profile-user/:username", async (req, res) => {
  try {
    let { username } = req.params;
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        mssg: "This user does not exist.",
      });
    }
    let profile = await Profile.findOne({
      account: user._id,
    });
    return res.status(200).json({
      profile,
      success: true,
      user: user.getUserInfo(),
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      mssg: "Something went wrong.",
    });
  }
});

/**
 * @description To create a new course by the authenticated user
 * @api /api/user/create-course
 * @access Private
 * @type POST request
 */

router.post(
  "/create-course",
  Authcontroller,
  courseValidations,
  validator,
  async (req, res) => {
    try {
      //create a new course
      let { body } = req;
      let course = new Course({
        usr_id: req.user._id,
        ...body,
        slug: slugGenerator(body.fileName),
      });
      course.save();
      console.log("COURSE_ONE", course);
      return res.status(201).json({
        course,
        success: true,
        mssg: "Your course is published.",
      });
    } catch (err) {
      console.log("Show error details", course);
      return res.status(400).json({
        success: false,
        mssg: "Unable to create your course.",
      });
    }
  }
);

/**
 * @description To create dashboard of the authenticated user
 * @api /api/user/dashboard
 * @access Private
 * @type POST <multipart-form> request
 */

router.post("/dashboard", Authcontroller),
  async (req, res) => {
    try {
      let { body } = req;
      let dashboard = new Dashboard({
        usr_id: user._id,
        ...body,
      });
      console.log(USER_DASHBOARD, dashboard);
      await dashboard.save();
      return res.status(200).json({
        mssg: "Your dashboard has been created.",
        success: true,
      });
    } catch (err) {
      return res.status(400).json({
        mssg: "We are not able to create your dashboard.",
        success: false,
      });
    }
  };

/**
 * @description To create dashboard of the authenticated user
 * @api /api/user/dashboard
 * @access Private
 * @type GET request
 */

router.get("/dashboard", Authcontroller, async (req, res) => {
  try {
    let dashboard = await Dashboard.findOne({
      usr_id: user._id.req.user,
    }).populate("usr_id", "name email username");
    if (!dashboard) {
      return res.status(404).json({
        success: false,
        mssg: "Your dashboard does not exist.",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      mssg: "Unable to get your dashboard.",
    });
  }
});

module.exports = router;
