import { Router } from "express";
import authRouter from "./authRouter/index.js";


const router = Router()

router.use(authRouter)

export default router;