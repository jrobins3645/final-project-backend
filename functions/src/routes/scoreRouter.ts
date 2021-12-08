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
    res.status(201).json(results);
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

scoreRouter.get("/:uid", async (req, res) => {
  try {
    const uid: string = req.params.uid;
    const client = await getClient();
    const results = await client
      .db()
      .collection<Score>("scores")
      .find({ uid: uid })
      .sort({ score: -1 })
      .limit(1)
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

scoreRouter.delete("/:uid", async (req, res) => {
  try {
    const uid: string = req.params.uid;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Score>("scores")
      .deleteMany({ uid: uid });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

export default scoreRouter;
