const { Schema, model } = require("mongoose");
//const { hash } = require("bcryptjs");
const { pick } = require("lodash");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../config/index")


const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "author", "admin"],
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: false,
    }

  },
  { timestamps: true }
);

//Define functions which are relative to the userSchema
// UserSchema.pre("save", async function (next) {
//   let user = this;
//   if (!user.isModified("password")) return next();
//   user.password = await hash(user.password, 12);
//   next();
// });


UserSchema.methods.getUserInfo = function() {
  return pick(this, [ "_id", "username", "email", "name", ])
}

UserSchema.methods.generateJWT = async function() {
  let payload = {
    username: this.username,
    email: this.email,
    name: this.name,
    id: this._id,
  };
  return await sign(payload, SECRET, {expiresIn: "1 day"}); 
}

const User = model("users", UserSchema);

module.exports = User;
