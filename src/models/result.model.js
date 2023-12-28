import mongoose from "mongoose"
const resultSchema = mongoose.Schema({
    resultOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test"
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    obtainedMark: {
        type: Number,
        required: true
    },
    noInPercentage: {
        type: Number,
    },
    maxMark: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        enum: ["A", "B", "C", 'D', "E"],
    },
    status: {
        type: String,
        enum: ["PASSED", "FAIL"],
    }
}, { timestamps: true })
export const Result = mongoose.model("Result", resultSchema)