import { ObjectId } from "mongodb";

export default interface Score {
  _id?: ObjectId;
  uid: string;
  avatar: string;
  username: string;
  score: number;
}
