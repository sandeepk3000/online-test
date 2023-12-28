import mongoose, { model } from "mongoose"
const questionSchema = mongoose.Schema({
    question: {
        type: String,
        require: true
    },
    options: [
        {
            type: String,
            require: true
        }
    ],
    correctOption: {
        type: Number,
        require: true
    },
    marks: {
        type: Number,
        require: true
    }
})
const questionPaperSchema = mongoose.Schema(
    {
        subject: {
            type: String,
            require: true,
        },
        questionLength: {
            type: Number,
            default: 0
        },
        questions: [questionSchema],
        composeBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher"
        }
    }
)
export const QuestionPaper = mongoose.model("Paper", questionPaperSchema)