const express = require("express");
const router = express.Router();
//const User = require("../models/User");
const Profile = require("../models/Profile");
const uploader = require("../middlewares/uploader");
const validator  = require("../middlewares/validation");
const courseValidations = require("../services/repo/course-validator");


//Usercontroller functions

const {
  authorController,
  Logincontroller,
  Authcontroller,
  listUser,
  CheckRole,
} = require("../controllers/author");
const { DOMAIN } = require("../config");
const Course = require("../models/Course");

//Authors Registration route
router.post("/register", async (req, res) => {
  await authorController(req.body, "author", res);
});

//Authors Login route
router.post("/login", async (req, res) => {
  await Logincontroller(req.body, "author", res);
});

//Get Profile route
router.get(
  "/authenticate",
  Authcontroller,
  CheckRole(["author"]),
  async (req, res) => {
    return res.json(listUser(req.user));
  }
);

/**
 * @description To create profile of the authenticated author
 * @api /api/author/create-profile
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
      //console.log('AUTHOR_PROFILE', profile)
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
 * @description To create a new course by the authenticated user
 * @api /api/user/create-course
 * @access Private
 * @type POST request
 */

 router.post("/create-course", Authcontroller, courseValidations, validator, async (req, res) => {
  try {
    //create a new course
    let { body } = req;
    let course = new Course({
      author: req.user._id,
      ...body, 
    })
    console.log("NEW_COURSE", course);
  } catch (err) {
    return res.status(400).json({
      success: false, 
      mssg: "Unable to create the course", 
    })

  }
});




module.exports = router;
