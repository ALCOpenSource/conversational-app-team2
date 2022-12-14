require("dotenv").config();
const cors = require("cors");
const express = require("express");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const authorRouter = require("./routes/author");
const passport = require("passport");
const { join } = require("path");
const { connect } = require("mongoose");
const { success, error } = require("consola");


//app constants
const { DB, PORT } = require("./config");

//initialize app
const app = express();

//Middlewares
app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(join(__dirname, "/uploads")));

require("./middlewares/passport")(passport);

//routes
app.use("/api/user", userRouter);
app.use("/api/author", authorRouter);
app.use("/api/admin", adminRouter);

// Health check endpoint
app.get("/api", (_req, res) => {
  return res.status(200).json({ success: true, mssg: "API working fine!" });
});

//db
const runApp = async () => {
  try {
    await connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: "CAD_DATA",
    });

    success({
      mssg: `Successfully connected to the Database,\n ${DB}`,
      badge: true,
    });
    //Listening for the server on port
    app.listen(PORT, () =>
      success({
        mssg: `Listening on port, ${PORT}`,
        badge: true,
      })
    );
  } catch (err) {
    error({
      mssg: `Database connection failed\n ${err}`,
      badge: true,
    });
    runApp();
  }
};

runApp();
