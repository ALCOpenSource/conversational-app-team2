const { Schema, model } = require("mongoose");
const Paginator = require("mongoose-paginate-v2");

const CourseSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    courses: {
      type: Array,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true, 
    },
    token: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    instructors: {
      type: Array,
      required: true,
    },
    unit: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    // type: {
    //   type: String,
    //   required: true,
    // },
    // time: {
    //   type: String,
    //   required: true,
    // },
    desc: {
      type: String,
      required: false,
    },
    price: {
      type: String,
      required: false,
    },
    discount: {
      type: String,
      required: false,
    },
    file: {
      type: String,
      required: false,
    },
    page: {
      type: Number,
      required: false,
    },
    search: {
      type: String,
      required: false,
    },
    pages: {
      type: Number,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

CourseSchema.plugin(Paginator);
const Course = model("courses", CourseSchema);

module.exports = Course;
