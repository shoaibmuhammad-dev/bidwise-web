import { ObjectId } from "mongodb";

export interface FeedbackDocument {
  _id?: ObjectId;
  name: string;
  email: string;
  feedback: string;
  createdAt: Date;
}
