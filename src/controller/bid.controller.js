import express from "express";
import ErrorHandler from "../middlewares/errorHandler.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import BidModel from "../models/bid.model.js";
import jobModel from "../models/job.model.js";

export const createBid = catchAsyncErrors(async (req, res, next) => {
  const { bid, job_id, estimated_time, content } = req.body;

  const job = await jobModel.findById(job_id).populate("bids").select("bids");

  const userHasBids =
    job?.bids
      ?.map((bid) => bid?.user_id?.toString())
      ?.filter((bidUser) => bidUser === req.user.id)?.length || 0;

  if (userHasBids >= 2)
    return next(new ErrorHandler("You can't create more than 2 bids", 400));

  const bidInstance = await BidModel.create({
    bid,
    job_id: job_id,
    user_id: req.user?.id,
    content,
  });

  job.bids.push(bidInstance._id);
  await job.save();

  res
    .status(201)
    .json(ApiResponse(true, "Bid created successfully", bidInstance));
});

export const getAllBids = catchAsyncErrors(async (req, res, next) => {
  const bids = await BidModel.find().populate();

  res.status(200).json(ApiResponse(true, "Bids fetched successfully", bids));
});

export const getBidById = catchAsyncErrors(async (req, res, next) => {
  const bid = await BidModel.findById(req.params.id);

  res.status(200).json(ApiResponse(true, "Bid fetched successfully", bid));
});

export const deleteBid = catchAsyncErrors(async (req, res, next) => {
  const bid = await BidModel.findByIdAndDelete(req.params.id);

  res.status(200).json(ApiResponse(true, "Bid deleted successfully", bid));
});

export const updateBid = catchAsyncErrors(async (req, res, next) => {
  const bid = await BidModel.findById(req.params.id);

  if (!bid) {
    return next(new ErrorHandler("Bid not found", 404));
  }

  const updatedBid = await BidModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res
    .status(200)
    .json(ApiResponse(true, "Bid updated successfully", updatedBid));
});
