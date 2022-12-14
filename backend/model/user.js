const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
});

const passportLocalMongoose = require("passport-local-mongoose");
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("user", userSchema);
module.exports = User;
