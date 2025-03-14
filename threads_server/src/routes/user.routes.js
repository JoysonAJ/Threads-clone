import { Router } from "express";
import {
  signInUserController,
  logInUserController,
  followTheUser,
  getProfileUserDetails,
  updateUserProfile,
  searchUser,
  logoutUser,
  myInfo
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { formidableAuth } from "../middlewares/formidable.middleware.js";

const router = Router();

router.route("/signin").post(signInUserController);
router.route("/login").post(logInUserController);
router.route("/update-profile").post(verifyJWT,formidableAuth,updateUserProfile)
router.route("/search/:query").post(verifyJWT,searchUser)
router.route("/me").get(verifyJWT,myInfo)
router.route("/logout").post(verifyJWT,logoutUser)

export default router;
