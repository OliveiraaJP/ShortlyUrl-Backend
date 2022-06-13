import { Router } from "express";
import { postSignin, postSignup } from "../../Controllers/authController.js";
import validSignUp from "../../Middlewares/signUpMiddleware.js";



const authRouter = Router()

authRouter.post('/signup', validSignUp ,postSignup);
authRouter.post('/signin', postSignin);

export default authRouter;