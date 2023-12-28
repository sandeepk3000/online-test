
import { Result } from "../models/result.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const createResult = asyncHandler(async (req, res) => {
  const { obtainedMark, maxMark } = req.body
  const { studentId, testId } = req.query
  if (!(obtainedMark && maxMark && studentId && testId)) {
    throw new ApiError(400, "all fields are required")
  }
  const exitResult = await Result.findOne({
    $or: [{ resultOf: testId }, { student: studentId }]
  });
  if (exitResult) {
    throw new ApiError(400, "Result is already exit")
  }
  const noInPercentage = (obtainedMark / maxMark) * 100
  let grade = undefined;
  if (noInPercentage >= 75 && noInPercentage <= 100) {
    grade = "A"
  }
  else if (noInPercentage >= 65 && noInPercentage < 75) {
    grade = "B"
  }
  else if (noInPercentage >= 55 && noInPercentage < 65) {
    grade = "C"
  }
  else if (noInPercentage >= 45 && noInPercentage < 55) {
    grade = "D"
  }
  else {
    grade = "E"
  }
  const createdResult = await Result.create({
    resultOf: testId,
    student: studentId,
    obtainedMark: obtainedMark,
    maxMark: maxMark,
    grade: grade,
    noInPercentage: noInPercentage,
    status: grade === "E" ? "FAILED" : "PASSED"
  });
  if (!createdResult) {
    throw new ApiError(500, "Something esle error while creating result")
  }
  return res.status(201).json(new ApiResponse(200, createdResult, "Result is create successfully"));
});
const getResult = asyncHandler(async (req, res) => {
  const { studentId } = req.query;
  if (!studentId) {
    throw new ApiError(400, "StudentId is required")
  }
  const exitResult = await Result.findOne({ student: studentId });
  if (!exitResult) {
    throw new ApiError(400, "Result is not found")
  }
  return res.status(201).json(new ApiResponse(200, exitResult, "Result is successfully get"));
});
export {
  createResult,
  getResult,
};
