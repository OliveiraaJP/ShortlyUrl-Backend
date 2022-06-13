import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import router from "./Routes/index.js";

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(router);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  
    console.log(chalk.cyan.underline((`Server is running on: http://localhost:${port}`)))
  
);
