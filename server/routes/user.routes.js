import { Router } from "express";
import {
    loginUser,
    registerUser,
    logoutUser,
    changePassword,
    getCurrentUser
} from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/signin").post(loginUser);
router.route("/logout").delete(verifyJWT, logoutUser);
router.route("/changePassword").post(verifyJWT, changePassword)
router.route("/getUser").get(verifyJWT, getCurrentUser)

export default router;