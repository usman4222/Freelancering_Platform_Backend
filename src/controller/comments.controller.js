//create comements controller
import express from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import CommentModel from "../models/comment.model.js";
import ErrorHandler from "../middlewares/errorHandler";

export const createComment = catchAsyncErrors(async (req, res, next) => {
  const { comment, job_Id } = req.body;

  if (!comment || !job) {
    return next(new ErrorHandler("Please Create a comment", 400));
  }

  const commentInstance = await CommentModel.create({
    comment,
    job,
    user: req.user?.id,
  });

  res
    .status(201)
    .json(ApiResponse(true, "Comment created successfully", commentInstance));
});
