import { Document } from "mongoose";

export interface IPage extends Document {
  uri: string;
  owner: string;
  displayName: string;
  location: string;
  bio: string;
  bgType: string;
  bgColor: string;
  bgImage: string;
}
