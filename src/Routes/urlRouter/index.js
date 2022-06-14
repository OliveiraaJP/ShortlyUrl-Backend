import { Router } from "express";
import {
  deleteUrl,
  getOpenUrl,
  getUrl,
  postUrl,
} from "../../Controllers/urlController.js";
import { validUrl } from "../../Middlewares/urlMiddleware.js";
import { validToken } from "../../Middlewares/validateToken.js";

const urlRouter = Router();

urlRouter.get("/urls/:id", getUrl);
urlRouter.get("urls/open/:shortURL", getOpenUrl);
urlRouter.post("/urls/shorten", validUrl, validToken, postUrl);
urlRouter.delete("urls/:id", validToken ,deleteUrl);

export default urlRouter;
