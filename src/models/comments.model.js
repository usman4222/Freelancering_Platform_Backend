import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
});

export const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;
