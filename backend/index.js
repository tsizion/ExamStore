import { MongoDBURL } from "./config.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import questionRoutes from "./routes/questionRoutes.js";
import { Question } from "./models/question.js";
import { body, validationResult } from "express-validator";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", questionRoutes);

const port = process.env.PORT || 5000;

mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("Connected to mongodb successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {});
