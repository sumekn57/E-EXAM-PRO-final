import mongoose, { Schema } from "mongoose";

// Create a schema for the questions
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [String],
    correctAns: { type: String },
});

const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, // Exam title
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }, // Exam date
    duration: {
        type: Number,
        required: true
    }, // Exam duration in minutes
    questions: [questionSchema],

    examStatus: {
        type: String,
        default: "not started"
    }
}, { timestamps: true })


export default examSchema;

