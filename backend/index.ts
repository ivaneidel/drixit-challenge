import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
const morgan = require("morgan");

dotenv.config();

const app: Express = express();

app.use(morgan("tiny"));

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World From the Typescript Server!!!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
