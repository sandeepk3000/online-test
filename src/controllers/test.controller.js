import { Test } from "../models/test.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const createTest = asyncHandler(async (req, res) => {
  const {
    testname,
    startOn,
    timeDuration,
    testKey
  } = req.body
  console.log(req.body);
  if ([testname, startOn, timeDuration].some((field) => field.trim() === "")) {
    throw new ApiError(400, "all fields are required")
  }
  const exitTest = await Test.findOne({ testKey: testKey });
  if (exitTest) {
    throw new ApiError(400, "Test is already exit")
  }
  const { teacherId } = req.query
  const test = await Test.create({
    testname,
    testKey,
    startOn,
    timeDuration,
    conductBy: teacherId
  });
  const createdTest = await Test.findById(test._id).select("-testKey")
  if (!createdTest) {
    throw new ApiError(500, "Something went wrong while creating test")
  }
  return res.status(201).json(new ApiResponse(200, createdTest, "Test is create successfully"));
});
const getTest = asyncHandler(async (req, res) => {
  const { testId, studentId, teacherId } = req.query;
  const exitTest = await Test.findOne({
    $and: [{ _id: testId }, {
      $or: [
        {
          students: {
            $in: [studentId]
          }
        },
        {
          conductBy: {
            $eq: teacherId
          }
        }
      ]
    }]
  });
  if (!exitTest) {
    throw new ApiError(400, "Test is required")
  }
  return res.status(201).json(new ApiResponse(200, exitTest, "Test is successfully get"));

});
const updateTest = asyncHandler(async (req, res) => {
  const { action, testId } = req.query
  let updatedTest = null;
  switch (action) {
    case "excess":
      const { newexcess } = req.body;
      updatedTest = await Test.updateOne(
        { _id: testId },
        {
          $set: {
            excess: newexcess,
          },
        }
      );
      break;
    case "status":
      const { newstatus } = req.body;
      updatedTest = await Test.updateOne(
        { _id: testId },
        {
          $set: {
            status: newstatus,
          },
        }
      );
      break;
    case "startdate":
      const { newstartdate } = req.body;
      updatedTest = await Test.updateOne(
        { _id: testId },
        {
          $set: {
            startingDate: newstartdate,
          },
        }
      );
      break;
    case "join":
      const { studentId } = req.body;
      const isJoin = await Test.find({
        students: {
          $in: [studentId]
        }
      })
      console.log(isJoin);
      if (isJoin.length !== 0) {
        throw new ApiError(400, "You already join in this test")
      }
      updatedTest = await Test.updateOne(
        {
          $and: [
            {
              _id: testId
            },
            {
              status: { $ne: "complete" }
            }
          ]
        },
        {
          $push: {
            students: studentId,
          },
        }
      );
      break;
  }
  console.log(updatedTest);
  if (updatedTest.modifiedCount !== 1) {
    throw new ApiError(500, "something went wrong while updating test")
  }
  res.status(201).json(new ApiResponse(200, updatedTest, "test successfully updated"));
});
export {
  createTest,
  getTest,
  updateTest
};
