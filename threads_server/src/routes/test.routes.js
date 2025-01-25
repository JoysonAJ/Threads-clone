import { Router } from "express";

import { testController } from "../controllers/test.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/auth").post(verifyJWT, testController);

export default router;
