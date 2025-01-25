import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { POST_FOLDER } from "../constant.js";
import {
  uploadOnCloudinary,
  removeFromCloudinary,
} from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

export const addNewPostController = async (req, res) => {
  console.log("here we go ");

  try {
    const { text } = req.body;

    const post = new Post();

    if (text) {
      post.text = text;
    }

    const localFilePath = req.file?.path;

    if (req.file && localFilePath) {
      const response = await uploadOnCloudinary(localFilePath, POST_FOLDER);

      console.log("RESPONSE", response);

      if (!response) {
        throw new ApiError(400, "Error while uploading post Image !");
      }
      post.media = response.secure_url;
      post.public_id = response.public_id;
    }

    post.admin = req.user._id;
    const newPost = await post.save();

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { threads: newPost._id },
      },
      { new: true }
    );

    return res
      .status(201)
      .json(new ApiResponse(200, {}, "New Post created successfully"));
  } catch (error) {
    console.log("error in add new post controller", error);
    return res
      .status(error.statusCode)
      .send(new ApiError(error.statusCode, error.message));
  }
};

export const getAllPostController = async (req, res) => {
  try {
    const { page } = req.query;
    let pageNumber = page;
    if (!page || page === undefined) {
      pageNumber = 1;
    }
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * 3)
      .limit(3)
      .populate({ path: "admin", select: "-password" })
      .populate({ path: "likes", select: "-password" })
      .populate({
        path: "comments",
        populate: {
          path: "admin",
          model: "user",
        },
      });
    return res
      .status(201)
      .json(new ApiResponse(200, { posts }, "all post successfully fetched !"));
  } catch (error) {
    console.log("error in add all post controller", error);
    return res
      .status(error.statusCode)
      .send(new ApiError(error.statusCode, error.message));
  }
};

export const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "Id is required !");
    }
    const postExists = await Post.findById(id);
    if (!postExists) {
      throw new ApiError(400, "Post not found !");
    }
    const userId = req.user._id.toString();
    const adminId = postExists.admin._id.toString();
    if (userId !== adminId) {
      throw new ApiError(400, "You are not authorized to delete this post !");
    }
    if (postExists.media) {
      await removeFromCloudinary(postExists.public_id);
    }
    await Comment.deleteMany({ _id: { $in: postExists.comments } });
    await User.updateMany(
      {
        $or: [{ threads: id }, { reposts: id }, { replies: id }],
      },
      {
        $pull: {
          threads: id,
          reposts: id,
          replies: id,
        },
      },
      { new: true }
    );
    await Post.findByIdAndDelete(id);

    return res.status(201).json(new ApiResponse(201, {}, "Post deleted !"));
  } catch (error) {
    console.log("error in add all post controller", error);
    return res
      .status(error.statusCode)
      .send(new ApiError(error.statusCode, error.message));
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "Id is required !");
    }
    const post = await Post.findById(id);

    if (!post) {
      throw new ApiError(400, "No such Post !");
    }
    if (post.likes.includes(req.user._id)) {
      await Post.findByIdAndUpdate(
        id,
        { $pull: { likes: req.user._id } },
        { new: true }
      );

      return res.status(201).json(new ApiResponse(201, {}, "Post unlike !"));
    }
    await Post.findByIdAndUpdate(
      id,
      { $push: { likes: req.user._id } },
      { new: true }
    );
    return res.status(201).json(new ApiResponse(201, {}, "Post liked !"));
  } catch (error) {
    console.log("error in add all post controller", error);
    return res
      .status(error.statusCode)
      .send(new ApiError(error.statusCode, error.message));
  }
};

export const rePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "Id is required !");
    }
    const post = await Post.findById(id);

    if (!post) {
      throw new ApiError(400, "No such Post !");
    }

    const newId = new mongoose.Types.ObjectId(id);
    if (req.user.reposts.includes(newId)) {
      throw new ApiError(400, "This post is already reposted !" );
    }

    
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { reposts: post._id },
      },
      { new: true }
    );

    return res.status(201).json(new ApiResponse(201, {}, "reposted"));
  } catch (error) {
    console.log("error in add all post controller", error);
    return res
      .status(error.statusCode)
      .send(new ApiError(error.statusCode, error.message));
  }
}

export const singlePost = async(req,res) =>{
  try {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "Id is required !");
    }

    const post = await Post.findById(id)
      .populate({
        path: "admin",
        select: "-password",
      })
      .populate({ path: "likes",select:'-password' })
      .populate({
        path: "comments",
        populate: {
          path: "admin",
        },
      });

    if (!post) {
      throw new ApiError(400, "No such Post !");
    }

    return res.status(201).json(new ApiResponse(201, {post}, "single post fetched"));
  } catch (error) {
    console.log("error in add all post controller", error);
    return res
      .status(error.statusCode)
      .send(new ApiError(error.statusCode, error.message));
  }
}
