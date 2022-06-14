import { Router } from "express";
import authRouter from "./authRouter/index.js";
import urlRouter from "./urlRouter/index.js";
import userRouter from "./userRouter/index.js";


const router = Router()

router.use(authRouter);
router.use(urlRouter);
router.use(userRouter);

export default router;