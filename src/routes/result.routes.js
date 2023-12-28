import { Router } from "express"
import { createResult, getResult } from "../controllers/result.controller.js";
const router = Router();
router.route("/createResult").post(createResult);
router.route("/getResult").get(getResult);
export default router;
