// 6794b27d5fa6bdd1fcb99957

import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addCommentToPost,deleteComment } from "../controllers/comments.controller.js";

const router = Router();

router.route("/add-new-comment/:id").post(verifyJWT, addCommentToPost);
router.route("/delete-comment/:postId/:id").delete(verifyJWT, deleteComment);

export default router;
