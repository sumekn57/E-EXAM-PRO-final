import { Router } from "express";
import upload from "../middlewares/uploadFile.js";
import { examMaterialController } from "../controllers/index.js";

const examMaterialRouter = Router();

examMaterialRouter
    .route("/")
    .post(upload.array("files"), examMaterialController.addExamMaterials)
    .get(examMaterialController.getAllExamMaterials)

examMaterialRouter
    .route("/:examID")
    .post()
    .get(examMaterialController.getAllExamMaterialByExamID)


export default examMaterialRouter;