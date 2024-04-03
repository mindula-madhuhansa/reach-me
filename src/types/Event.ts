import { Document } from "mongoose";

export interface IEvent extends Document {
  type: "click" | "view";
  page: string;
  uri: string;
}
