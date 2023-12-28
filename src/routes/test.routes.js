import { Router } from "express";
import { createTest, getTest, updateTest } from "../controllers/test.controller.js";
const router = Router();
router.route("/createTest").post(createTest);
router.route("/getTest").get(getTest);
router.route("/updateTest").patch(updateTest)
export default router;
