import { Router } from "express";
import { examController } from "../controllers/index.js";

const examRoutes = Router();

examRoutes
    .route("/")
    .post(examController.createExam)
    .get(examController.getAllExams)
    .patch()
    .delete()

examRoutes
    .route("/:examID")
    .post()
    .get(examController.getExamById)
    .patch(examController.updateExamDetails)
    .delete(examController.deleteExam)

examRoutes
    .route("/:examID/questions")
    .post(examController.addQuestionToExam)
    .get()
    .patch(examController.updateQuestionDetails)
    .delete(examController.deleteQuestionFromExam)

export default examRoutes;