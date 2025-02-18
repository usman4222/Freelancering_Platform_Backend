import express from "express";
import mongoose from "mongoose";
import { JOB_STATUS } from "../config/enums/enums.js";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tags: {
    type: String,
  },
  likes: {
    type: String,
  },
  is_published: {
    type: Boolean,
    default: true,
  },
  estimated_time: {
    type: String,
  },
  estimated_budget: {
    type: String,
  },
  status: {
    type: String,
    enum: [JOB_STATUS.HIRING, JOB_STATUS.CLOSED, JOB_STATUS.HIRED],
    default: JOB_STATUS.HIRING,
  },
  bids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
    },
  ],
});

export const jobModel = mongoose.model("Job", jobSchema);

export default jobModel;
