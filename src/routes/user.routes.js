import express from "express"
import { register, logOutUser, loginUser } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.route("/register").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]), register);
router.route("/login").post(loginUser)
router.route("/logOut").post(jwtVerify, logOutUser)
export default router;
