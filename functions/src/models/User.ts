import { ObjectId } from "mongodb";

export default interface User {
  _id?: ObjectId;
  uid: string;
  avatar: string;
  username: string;
}
