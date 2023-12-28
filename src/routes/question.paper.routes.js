import { Router } from "express";
import { createQuestionPaper, updateQuestionPaper, getQuestionPaper } from "../controllers/question.paper.controller.js";
const router = Router();
router.route("/createQuestionPaper").post(createQuestionPaper);
router.route("/getQuestionPaper").get(getQuestionPaper);
router.route("/updateQuestionPaper").patch(updateQuestionPaper)
export default router;
