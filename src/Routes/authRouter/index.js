import { Router } from "express";
import { postSignin, postSignup } from "../../Controllers/authController.js";
import validSignIn from "../../Middlewares/signInMiddleware.js";
import validSignUp from "../../Middlewares/signUpMiddleware.js";



const authRouter = Router()

authRouter.post('/signup', validSignUp ,postSignup);
authRouter.post('/signin', validSignIn ,postSignin);

export default authRouter;