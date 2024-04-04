import { Date, ObjectId } from "mongoose";

export interface IEvent {
  _id: ObjectId;
  type: string;
  page: string;
  uri: string;
  createdAt: Date;
  updatedAt: Date;
}
