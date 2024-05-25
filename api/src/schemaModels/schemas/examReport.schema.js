import mongoose from "mongoose";

const examReportSchema = new mongoose.Schema({
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    answers: [
        {
            question: String,
            selectedAns: String,
            correctAns: String
        }
    ],
    percentageScored: Number
}, { timestamps: true });

export default examReportSchema;