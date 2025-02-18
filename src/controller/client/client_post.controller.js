import express from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import { ApiResponse } from "../../utils/ApiResponse";
import jobModel from "../../models/job.model";

const clientCreateJob = catchAsyncErrors(async (req, res, next) => {
  const { title, description, category, sub_category, image } = req.body;
  const user = req.user;

  if (!title || !description || !category || !sub_category || !image) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const job = await jobModel.create({
    title,
    description,
    category,
    sub_category,
    image,
    user,
  });

  res.status(201).json(ApiResponse(true, "Job created successfully", job));
});
