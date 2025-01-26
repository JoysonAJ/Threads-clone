import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comments.model.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

export const addCommentToPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "Id is required !");
    }

    const { text } = req.body;

    if (!text) {
      throw new ApiError(400, "No comment is added !");
    }

    const postExists = await Post.findById(id);

    if (!postExists) {
      return res.status(400).json({ msg: "No such post !" });
    }

    const comment = new Comment({
      text,
      admin: req.user._id,
      post: postExists._id,
    });

    const newComment = await comment.save();

    await Post.findByIdAndUpdate(
      id,
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { replies: newComment._id },
      },
      { new: true }
    );

    return res.status(201).json(new ApiResponse(201, {}, "Commented"));
  } catch (error) {
    console.log("error in add add comment controller", error);
    return res
      .status(error.statusCode)
      .send(new ApiError(error.statusCode, error.message));
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { postId, id } = req.params;

    console.log(req.params);
    

    if (!postId || !id) {
      throw new ApiError(400, "Error in deleteComment !");
    }

    const postExists = await Post.findById(postId);

    if (!postExists) {
      throw new ApiError(400, "No such post !");
    }

    const commentExists = await Comment.findById(id);

    if (!commentExists) {
      throw new ApiError(400, "No such comment !");
    }

    const newId = new mongoose.Types.ObjectId(id);

    if (postExists.comments.includes(newId)) {
      const id1 = commentExists.admin._id.toString();
      const id2 = req.user._id.toString();

      if (id1 !== id2) {
        throw new ApiError(
          400,
          "You are not authorized to delete the comment !"
        );
      }
      await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { comments: id },
        },
        { new: true }
      );

      await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { replies: id },
        },
        { new: true }
      );

      await Comment.findByIdAndDelete(id);

      return res
        .status(201)
        .json(new ApiResponse(201, {}, "Comment successfully deleted"));
    }
    return res
    .status(201)
    .json(new ApiResponse(201, {}, "This post does not have this comment "));

  } catch (error) {
    console.log("error in add add comment controller", error);
    return res
      .status(error.statusCode)
      .send(new ApiError(error.statusCode, error.message));
  }
};
