import { model } from "mongoose";
import userSchema from "./schemas/user.schema.js";
import feedbackSchema from "./schemas/feedback.schema.js";
import examSchema from "./schemas/exam.schema.js";
import examMaterialSchema from './schemas/examMaterials.schema.js';
import examReportSchema from "./schemas/examReport.schema.js";

export const User = model("User", userSchema)
export const Feedback = model("Feedback", feedbackSchema);
export const Exam = model("Exam", examSchema)
export const ExamMaterial = model("ExamMaterial", examMaterialSchema)
export const ExamReport = model("ExamReport", examReportSchema);
