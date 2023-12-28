import mongoose from "mongoose"
const testSchema = mongoose.Schema({
    testname: {
        type: String,
        require: true,
    },
    testKey: {
        type: String,
        require: true
    },
    startOn: {
        type: String,
        require: true
    },
    timeDuration: {
        type: String,
    }
    ,
    solveIn: {
        type: String,
    },
    conductBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    },
    excess: {
        type: String,

        enum: ["PRIVATE", "PUBLIC"]
    },
    questionPaper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Paper"
    },
    status: {
        type: String,
        default: "notstart",
        enum: ["complete", "start", "notstart", "cancel"]
    },
    results: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Result"
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }]

}, { timestamps: true })
export const Test = mongoose.model("Test", testSchema)