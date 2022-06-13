import { Router } from "express";
import authRouter from "./authRouter/index.js";
import urlRouter from "./urlRouter/index.js";


const router = Router()

router.use(authRouter)
router.use(urlRouter)

export default router;