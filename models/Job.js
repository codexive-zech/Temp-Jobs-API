const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please Provide Company Name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please Provide Position"],
      maxlength: 25,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please Provide User"],
    },
  },
  { timestamps: true }
);

const jobModel = mongoose.model("Job", jobSchema);

module.exports = jobModel;
