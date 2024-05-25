import { Router } from "express";
import { userController } from "../controllers/index.js";


const userRoutes = Router();

userRoutes
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .patch()
    .delete()

userRoutes
    .route("/change-password")
    .get()
    .post()
    .patch(userController.changePassword)
    .delete()

userRoutes
    .route("/login")
    .get()
    .post(userController.userLogin)
    .patch()
    .delete()

userRoutes
    .route("/:email")
    .get()
    .post()
    .patch(userController.updateUser)
    .delete(userController.deleteUser)


export default userRoutes;