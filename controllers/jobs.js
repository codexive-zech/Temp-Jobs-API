const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, cont: jobs.length });
};

const createJob = async (req, res) => {
  const reqBody = req.body;
  req.body.createdBy = req.user.userId;
  const job = await Job.create(reqBody);
  res.status(StatusCodes.CREATED).json({ job });
};

const getSingleJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new BadRequestError(`No Job Wit ID ${jobId}`);
  }
  res.status(StatusCodes.OK).send({ job });
};

const UpdateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError(
      "Please Provide Company or Position Field, Must not be Empty"
    );
  }
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new BadRequestError(`No Job Wit ID ${jobId}`);
  }
  res.status(StatusCodes.OK).send({ job });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;
  const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new BadRequestError(`No Job Wit ID ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ success: true, mgs: "Job Deleted " });
};

module.exports = { getAllJobs, createJob, getSingleJob, UpdateJob, deleteJob };
