import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
export const api = functions.https.onRequest(app);
