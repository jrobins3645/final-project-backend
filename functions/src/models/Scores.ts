import { ObjectId } from "mongodb";

export default interface Scores {
  _id?: ObjectId;
  uid: string;
  date: string;
  time: number;
  avatar: string;
  username: string;
}
