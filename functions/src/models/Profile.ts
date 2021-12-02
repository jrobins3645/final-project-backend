import { ObjectId } from "mongodb";

export default interface Profile {
  _id?: ObjectId;
  uid: string;
  avatar: string;
  username: string;
}
