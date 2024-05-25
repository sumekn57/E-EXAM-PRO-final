import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true })


export default feedbackSchema;