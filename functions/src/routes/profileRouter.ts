import express from "express";
import { getClient } from "../db";
import Profile from "../models/Profile";
const profileRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

profileRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<Profile>("profiles")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

profileRouter.get("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const results = await client
      .db()
      .collection<Profile>("profiles")
      .find({ uid: id })
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

profileRouter.post("/", async (req, res) => {
  try {
    const newUser: Profile = req.body;
    const client = await getClient();
    await client.db().collection<Profile>("profiles").insertOne(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    errorResponse(error, res);
  }
});

export default profileRouter;
