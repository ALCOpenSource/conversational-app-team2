const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SECRET } = require("../config");
const passport = require("passport");
const repo = require("../services/repo/validate");

/**
 * @DESC To Register the user(USER)
 
 */
const authorController = async (userPayload, role, res) => {
  try {
    //Validate the username
    let usernameTaken = await repo.username(User, userPayload.username);
    console.log("[AUTHOR_REGISTER_CONTROLLER] 1: " + Object.keys(userPayload));
    console.log("[AUTHOR_REGISTER_CONTROLLER] 2: " + userPayload.username);
    if (usernameTaken) {
      return res.status(400).json({
        success: false,
        mssg: "Username is already taken",
      });
    }

    //Email validation
    let emailRegistered = await repo.email(User, userPayload.email);
    console.log("[AUTHOR_REGISTER_CONTROLLER] 3: " + userPayload.email);

    if (emailRegistered) {
      return res.status(400).json({
        success: false,
        mssg: "Email is already registered.",
      });
    }

    //Get the hashed password
    const password = await bcrypt.hash(userPayload.password, 12);
    //Create a user
    const newUser = new User({
      ...userPayload,
      password: password,
      role: role,
    });
    await newUser.save();
    return res.status(201).json({
      mssg: "You've been successfully registered. Please Login.",
      success: true,
    });
  } catch (error) {
    console.log("AUTHOR_REGISTER_CONTROLLER] 3: " + error.message);
    return res.status(500).json({
      mssg: "Unable to create your account. Please try again.",
      success: false,
    });
  }
};

/**
 * @DESC To Login the user(USER) 

 */

const Logincontroller = async (userPayload, role, res) => {
  try {
    //Check if username is stored in the database

    const user = await repo.username(User, userPayload.username);
    console.log("[AUTHOR_LOGIN_CONTROLLER] 1: " + Object.keys(userPayload));
    console.log("[AUTHOR_LOGIN_CONTROLLER] 2: " + userPayload.username);
    if (!user) {
      return res.status(404).json({
        mssg: "Username is not found. Invalid login credentials.",
        success: false,
      });
    }
    //Check for the role
    if (user.role != role) {
      return res.status(403).json({
        mssg: "Please make sure you are logging in from the correct portal.",
        success: false,
      });
    }
    //The above logic means user is existing. And user is trying to signin from the correct portal
    //Now check for the password
    let isMatch = await bcrypt.compare(userPayload.password, user.password);
    if (isMatch) {
      //Sign in the token and issue it to the user
      let token = jwt.sign(
        {
          user_id: user._id,
          role: user.role,
          username: user.username,
          email: user.email,
        },
        SECRET,
        { expiresIn: "28 days" }
      );
      let result = {
        username: user.username,
        role: user.role,
        email: user.email,
        token: `Bearer ${token}`,
        expiresIn: 280,
      };
      return res.status(200).json({
        ...result,
        mssg: "Congratulations! You are now logged in.",
        success: true,
      });
    } else {
      return res.status(403).json({
        mssg: "Incorrect password",
        success: false,
      });
    }
  } catch (error) {
    console.log("[AUTHOR_LOGIN_CONTROLLER] 3: " + error.message);
    return res.status(500).json({
      mssg: "Unable to login to your account. Please try again",
      success: false,
    });
  }
};

/**
 * @DESC Passport middleware
 */
const Authcontroller = passport.authenticate("jwt", { session: false });

/**
 * @DESC Check Role Middleware
 */

const CheckRole = (roles) => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();

const listUser = (user) => {
  return {
    _id: user._id,
    username: user.username,
    name: user.name,
    email: user.email,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

module.exports = {
  Authcontroller,
  authorController,
  Logincontroller,
  listUser,
  CheckRole,
};
