import { Document } from "mongoose";

export interface IPage extends Document {
  uri: string;
  owner: string;
}
