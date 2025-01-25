import { Router } from "express";

import {
  addNewPostController,
  getAllPostController,
  deletePostController,
  likePost,
  rePost,
  singlePost,
} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/add-post")
  .post(verifyJWT, upload.single("postMedia"), addNewPostController);
router.route("/all-post").get(verifyJWT, getAllPostController);
router.route("/delete/:id").delete(verifyJWT, deletePostController);
router.route("/like/:id").put(verifyJWT, likePost);
router.route("/repost/:id").put(verifyJWT, rePost);
router.route("/single-post/:id").get(verifyJWT, singlePost);

export default router;
