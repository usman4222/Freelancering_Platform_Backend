import express from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import jobModel from "../../models/job.model.js";
import { JOB_STATUS } from "../../config/enums/enums.js";

export const createJob = catchAsyncErrors(async (req, res, next) => {
  const { title, content, estimated_time, estimated_budget } = req.body;

  const job = await jobModel.create({
    title,
    content,
    estimated_time,
    estimated_budget,
    author: req.user?.id,
  });

  res.status(201).json(ApiResponse(true, "Job created successfully", job));
});

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await jobModel.find().populate();

  res.status(200).json(ApiResponse(true, "AllJobs fetched successfully", jobs));
});

export const getJobById = catchAsyncErrors(async (req, res, next) => {
  const job = await jobModel.findById(req.params.id).populate("bids");

  res.status(200).json(ApiResponse(true, "Job fetched successfully", job));
});

export const updateJob = catchAsyncErrors(async (req, res, next) => {
  const job = await jobModel.findById(req.params.id);

  job.title = req.body.title;
  job.content = req.body.description;
  job.estimated_time = req.body.estimated_time;
  job.estimated_budget = req.body.estimated_budget;

  const updatedJob = await job.save();

  res
    .status(200)
    .json(ApiResponse(true, "Job updated successfully", updatedJob));
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const job = req.params.id;

  await jobModel.findByIdAndDelete(job);

  res.status(200).json(ApiResponse(true, "Job deleted successfully"));
});

export const updateStatus = catchAsyncErrors(async (req, res, next) => {
  const job = await jobModel.findById(req.params.id);

  job.status = req.body.status;

  const updatedJob = await job.save();

  res
    .status(200)
    .json(ApiResponse(true, "Job updated successfully", updatedJob));
});
