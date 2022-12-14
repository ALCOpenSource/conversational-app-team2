const { Schema, model } = require("mongoose");
const Paginator = require("mongoose-paginate-v2");

const DashboardSchema = new Schema(
  {
    usr_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    token: {
      type: String,
      required: false,
    },
    name: {
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
    courses: {
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

DashboardSchema.plugin(Paginator);
const Dashboard = model("dashboards", DashboardSchema);

module.exports = Dashboard;
