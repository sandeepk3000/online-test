
import { QuestionPaper } from "../models/question.paper.model.js"
import { Test } from "../models/test.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const createQuestionPaper = asyncHandler(async (req, res) => {
  const {
    subject,
    questionLength,
    marks
  } = req.body;
  console.log(subject, questionLength, marks);
  if (!(subject && questionLength && marks)) {
    throw new ApiError(400, "all fields are required")
  }
  const { teacherId } = req.query
  const questionPaper = await QuestionPaper.create({
    subject,
    questionLength,
    composeBy: teacherId,
  })
  await Test.findOneAndUpdate({ conductBy: teacherId }, {
    $set: {
      questionPaper: questionPaper._id
    }
  })
  if (!questionPaper) {
    throw new ApiError(500, "Something went wrong while sinup the student")
  }
  return res.status(201).json(new ApiResponse(200, questionPaper, "QuestionPaper is create successfully"))
});
const getQuestionPaper = asyncHandler(async (req, res) => {
  const { paperId, teacherId } = req.query;
  const exitQuestionPaper = await QuestionPaper.findOne({
    $or: [{ _id: paperId }, { composeBy: teacherId }]
  });
  if (!exitQuestionPaper) {
    throw new ApiError(400, "QuestionPaper is not exit")
  }
  return res.status(201).json(new ApiResponse(200, exitQuestionPaper, "QuestionPaper is successfully get"));
});
const updateQuestionPaper = asyncHandler(async (req, res) => {
  const {
    questionname,
    options,
    correctOption,
    marks,
  } = req.body
  console.log(req.body);
  const { paperId } = req.query
  if (!(questionname && options && correctOption && marks)) {
    throw new ApiError(400, "all fields are required")
  }
  const updatedPaper = await QuestionPaper.updateOne({ _id: paperId }, {
    $push: {
      questions: {
        question: questionname,
        options: options,
        correctOption: correctOption,
        marks: marks
      }
    }
  })
  if (!updatedPaper) {
    throw new ApiError(500, "Something went wrong while updating paper")
  }
  res.status(201).json(
    new ApiResponse(200, updatedPaper, "Question paper successfully update")
  )
});
export {
  createQuestionPaper,
  getQuestionPaper,
  updateQuestionPaper
};
