const express = require("express");
const passport = require("passport");
const app = express();
const cors = require("cors");
// const bodyParser = require("body-parser");
// const path = require("path");
require("./auth");
const dotenv = require("dotenv");
dotenv.config();
const { success, error } = require("consola");
const { connect } = require("mongoose");
const DB = process.env.DB_URI;
const PORT = process.env.PORT;

// Connect to DB then start server
const runServer = async () => {
  try {
    await connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: "iLearn_dev",
    });

    success({
      title: "Successfully connected to the Database✅",
      badge: true,
    });

    //Listening for the server on port
    app.listen(PORT, () =>
      success({
        title: `Listening on port, ${PORT}`,
        badge: true,
      })
    );
  } catch (err) {
    error({
      title: `Database connection failed❌. Check error: \n ${err}`,
      badge: true,
    });
    runServer();
  }
};

runServer();

// enable sessions
const session = require("express-session");
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
};
app.use(session(sessionOptions));

app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

const index = require("./routes/index");
const school = require("./routes/school");
const dashboard = require("./routes/dashboard");
app.use(cors());
app.use(express.static("uploads"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/", index);
app.use("/enroll", school);
app.use("/dashboard", dashboard);
