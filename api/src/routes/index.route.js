import express from "express";
import examRoutes from "./exam.router.js";
import examMaterialRouter from "./examMaterials.router.js";
import examReportRouter from "./examReport.router.js";
import feedbackRouter from "./feedback.routes.js";
import userRoutes from "./user.routes.js";

const apiRoutes = express.Router()

apiRoutes.use("/users", userRoutes);
apiRoutes.use("/feedbacks", feedbackRouter)
apiRoutes.use("/exams", examRoutes)
apiRoutes.use("/exam-material", examMaterialRouter)
apiRoutes.use("/exam-reports", examReportRouter);

export default apiRoutes