import { Router } from "express";
import { signInUserController,logInUserController } from "../controllers/user.controller.js";


const router = Router()

router.route("/signin").post(signInUserController);
router.route("/login").post(logInUserController);

export default router