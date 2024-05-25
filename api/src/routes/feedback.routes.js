import { Router } from "express";
import { feedbackController } from "../controllers/index.js";

const feedbackRouter = Router();

feedbackRouter
    .route('/')
    .get(feedbackController.getAllFeedback)
    .post(feedbackController.createFeedback)
    .patch()
    .delete(feedbackController.deleteFeedback)


feedbackRouter
    .route('/:feedbackID')
    .get()
    .post()
    .patch()
    .delete(feedbackController.deleteFeedback)

export default feedbackRouter;