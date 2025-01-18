import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("comment", commentSchema);
