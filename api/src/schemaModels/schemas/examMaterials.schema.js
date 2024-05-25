import mongoose from "mongoose";

const examMaterialSchema = mongoose.Schema({
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam"
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    links: [String],
    files: [
        {
            originalFileName: String,
            path: String
        }
    ],
})

export default examMaterialSchema;