import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  bid: {
    type: Number,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  field: {
    type: String,
  },
  estimated_time: {
    type: String,
  },
  content: {
    type: String,
  },
  // estimated_budget: {
  //   type: String,
  // },
});

export const BidModel = mongoose.model("Bid", bidSchema);

export default BidModel;
