import { ObjectId } from "mongodb";

export default interface Score {
  _id?: ObjectId;
  uid: string;
  date: string;
  time: number;
  avatar: string;
  username: string;
}
