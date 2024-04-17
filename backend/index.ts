import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import { initDB } from "./src/database/db";
import router from "./src/routes/router";
const morgan = require("morgan");

// Setup Express
dotenv.config();

const app: Express = express();

app.use(morgan("tiny"));

app.use(express.json());
app.use(cors());

// Connect to the Database
initDB();

// Define Router entry point
app.use("/api/v0/", router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
