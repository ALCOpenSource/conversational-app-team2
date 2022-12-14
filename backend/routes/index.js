const express = require("express"),
  router = express.Router(),
  User = require("../model/user.js"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

router.use("/", (req, res, next) => {
  try {
    if (req.path == "/login" || req.path == "/register" || req.path == "/") {
      next();
    } else {
      /* decode jwt token if authorized*/
      jwt.verify(
        req.headers.token,
        "ilearn_user_token",
        function (err, decoded) {
          if (decoded && decoded.user) {
            req.user = decoded;
            next();
          } else {
            return res.status(401).json({
              errorMessage: "User unauthorized!",
              status: false,
            });
          }
        }
      );
    }
  } catch (e) {
    console.log("[VERIFY_TOKEN]: " + Object.keys(e));
    return res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

/* Health-check api */
router.get("/", (req, res, err) => {
  if (err) {
    console.log("[HEALTH_CHECK_API] error: " + Object.keys(err));
    return res.status(500).json({
      status: false,
      errorMessage: "Something went wrong!",
    });
  }
  return res.status(200).json({
    status: true,
    title: "You're right🎅, API is working fine!",
  });
});

/* register api */
router.post("/register", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      User.findOne({ username: req.body.username }, (err, data) => {
        console.log("[username]: " + req.body.username);
        if (!data) {
          let hashedPassword = bcrypt.hashSync(req.body.password, 12);
          let user = new User({
            username: req.body.username,
            password: hashedPassword,
          });
          console.log("[user]: " + Object.values(user));
          user.save((err, data) => {
            if (err) {
              console.log("[REGISTER_USER_ERROR] 1: " + Object.values(err)[3]);
              return res.status(400).json({
                errorMessage: err,
                status: false,
              });
            } else {
              return res.status(200).json({
                status: true,
                title: "Registered Successfully.",
              });
            }
          });
        } else {
          console.log("[REGISTER_USER_ERROR] 2: thrown here!");
          return res.status(400).json({
            errorMessage: `Username ${req.body.username} already exist! Try another one.`,
            status: false,
          });
        }
      });
    } else {
      console.log("[REGISTER_USER_ERROR] 3: thrown here!");
      return res.status(400).json({
        errorMessage: "Add all required fields first!",
        status: false,
      });
    }
  } catch (e) {
    console.log("[REGISTER_USER_ERROR] 3: " + Object.keys(e));
    return res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

/* login api */
router.post("/login", (req, res) => {
  try {
    // FIXME: buggy when supplied with wrong username/password
    if (req.body && req.body.username && req.body.password) {
      User.find({ username: req.body.username }, (err, data) => {
        console.log("[username]: " + req.body.username);
        if (data) {
          console.log("[DATA]: " + Object.values(data));
          if (bcrypt.compareSync(req.body.password, data[0].password)) {
            checkUserAndGenerateToken(data[0], req, res);
          } else {
            console.log("[username/password taken] 1");
            return res.status(400).json({
              errorMessage: "Username or password is incorrect!",
              status: false,
            });
          }
        } else {
          console.log("[username/password taken] 2");
          return res.status(400).json({
            errorMessage: "Username or password is incorrect!",
            status: false,
          });
        }
      });
    } else {
      console.log("add proper parameters");
      return res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    console.log("something went wrong. See error: " + Object.keys(e));
    return res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

function checkUserAndGenerateToken(data, req, res) {
  jwt.sign(
    { user: data.username, id: data._id },
    "ilearn_user_token",
    { expiresIn: "1d" },
    (err, token) => {
      if (err) {
        console.log("[LOGIN_ERROR]: " + Object.keys(err));
        return res.status(400).json({
          status: false,
          errorMessage: err,
        });
      } else {
        console.log("login successfully");
        return res.json({
          message: "Login Successfully.",
          token: token,
          status: true,
        });
      }
    }
  );
}
module.exports = router;
