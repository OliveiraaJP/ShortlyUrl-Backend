import { Router } from "express";
import { getRanking, getUsersId } from "../../Controllers/userController.js";
import { validToken } from "../../Middlewares/validateToken.js";

const userRouter = Router()

userRouter.get("/users/:id", validToken, getUsersId);
userRouter.get("/ranking", getRanking);

export default userRouter;