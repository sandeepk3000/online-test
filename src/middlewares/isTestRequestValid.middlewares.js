import { Test } from "../models/test.model.js"
import { ApiError } from "../utils/apiError.js"

const isTestRequestValid = async (req, res, next) => {
    console.log(req.query);
    try {
        const requesterId = req.query?.teacherId || req.query?.studentId
        if (!requesterId) {
            throw new ApiError(400, "Requester id is required")
        }
        const test = await Test.findOne({
            $or: [
                {
                    students: {
                        $in: [requesterId]
                    }
                },
                {
                    conductBy: requesterId
                }
            ]
        })
        if (!test) {
            throw new ApiError(400, "Test is not exit")
        }
        req.test = test
        next()
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something esle Error during ecess test")
    }
}
export {
    isTestRequestValid
}