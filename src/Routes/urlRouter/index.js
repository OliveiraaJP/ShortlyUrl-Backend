import { Router } from "express";
import {
  deleteUrl,
  getOpenUrl,
  getUrl,
  postUrl,
} from "../../Controllers/urlController.js";
import { validUrl } from "../../Middlewares/urlMiddleware.js";
import { validToken } from "../../Middlewares/validateToken";

const urlRouter = Router();

urlRouter.get("/urls/:id", getUrl);
urlRouter.get("urls/open/:shortUrl", getOpenUrl);
urlRouter.post("/urls/shorten", validUrl, validToken, postUrl);
urlRouter.delete("urls/:id", deleteUrl);

export default urlRouter;
