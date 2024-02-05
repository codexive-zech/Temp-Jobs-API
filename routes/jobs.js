const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  createJob,
  getSingleJob,
  UpdateJob,
  deleteJob,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getSingleJob).patch(UpdateJob).delete(deleteJob);

module.exports = router;
