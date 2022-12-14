const { Schema, model } = require("mongoose");
const Paginator = require("mongoose-paginate-v2");

const SchoolSchema = new Schema(
  {
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
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    page: {
      type: Number,
      required: false,
    },
    search: {
      type: String,
      required: false,
    },
    schools: {
      type: Array,
      required: true,
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

SchoolSchema.plugin(Paginator);
const School = model("schools", SchoolSchema);

module.exports = School;
