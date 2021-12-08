import express from "express";
import { getClient } from "../db";
import Score from "../models/Score";
const scoreRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

scoreRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<Score>("scores")
      .find()
      .sort({ score: -1 })
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

scoreRouter.post("/", async (req, res) => {
  try {
    const newScore: Score = req.body;
    const client = await getClient();
    await client.db().collection<Score>("scores").insertOne(newScore);
    res.status(201).json(newScore);
  } catch (error) {
    errorResponse(error, res);
  }
});

export default scoreRouter;
